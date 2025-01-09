// lib/session.ts

import { prisma } from "@/lib/prisma";  // Pastikan prisma sudah terhubung dengan database

// Fungsi untuk mendapatkan session berdasarkan session yang sudah tersedia di server
export const getSession = async () => {
  try {
    // Ambil session global atau session yang disimpan di server
    const session = await getServerSession();  // Misalnya menggunakan Next.js atau session global lainnya

    if (!session) {
      throw new Error("Session not found");
    }

    // Ambil data user dari database berdasarkan session yang ada
    const user = await prisma.user.findUnique({
      where: { id: session.userId },  // Anggap session memiliki field userId
    });

    if (!user) {
      throw new Error("User not found");
    }

    // Kembalikan data sesi
    return {
      id: user.id,
      email: user.email,
      role: user.role,
    };
  } catch (error) {
    console.error("Error fetching session:", error);
    throw new Error("Failed to retrieve session");
  }
};

// Fungsi untuk mendapatkan session server (misalnya di Next.js menggunakan session API)
const getServerSession = async () => {
  // Ini hanya contoh, Anda bisa sesuaikan dengan cara Anda mengakses session pada server
  return { userId: "someUserId" };  // Simulasikan session dengan userId yang sudah ada
};
