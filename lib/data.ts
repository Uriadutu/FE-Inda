"use server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { hashSync } from "bcryptjs";
import { use } from "react";

interface AddUserParams {
  name?: string;
  email?: string;
  password?: string;
  role?: string;
}

// Ambil daftar pengguna yang bukan "user"
export const getUsers = async () => {
  const session = await auth();
  if (!session || !session.user || session.user.role !== "admin") {
    redirect("/dashboard");
  }

  try {
    const users = await prisma.user.findMany({
      where: {
        role: {
          // not : "user",
          notIn: ["admin", "user"],
        },
      },
    });
    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};


export const addUser = async ({ name, email, password, role = "user" }: { name: string; email: string; password: string; role?: string }) => {
  try {
    if (!email || !password) {
      throw new Error("Email dan password wajib diisi.");
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new Error("Email sudah terdaftar.");
    }

    const hashedPassword = hashSync(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
      },
    });

    return newUser;
  } catch (error: any) {
    console.error("Error adding user:", error.message);
    throw new Error(error.message || "Gagal menambah pengguna.");
  }
};
// Edit pengguna berdasarkan ID
export const updateUser = async (id, { name, email, role }) => {
  try {
    const updatedUser = await prisma.user.update({
      where: { id },
      data: { name, email, role },
    });
    return updatedUser;
  } catch (error) {
    console.error("Error updating user:", error);
    throw new Error("Gagal mengedit pengguna.");
  }
};

// Hapus pengguna berdasarkan ID
export const deleteUser = async (id) => {
  try {
    await prisma.user.delete({
      where: { id },
    });
    return { message: "Pengguna berhasil dihapus." };
  } catch (error) {
    console.error("Error deleting user:", error);
    throw new Error("Gagal menghapus pengguna.");
  }
};
