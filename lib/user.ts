import { getSession as nextAuthGetSession } from "next-auth";
import { prisma } from "@/lib/prisma";

// Fungsi untuk mendapatkan sesi pengguna, langsung tanpa async/await di halaman app
export const getSession = (context: any) => {
  // Memanggil getSession dari next-auth untuk mengambil sesi dari request
  return nextAuthGetSession(context);
};

// Fungsi untuk mengambil pengguna berdasarkan sesi
export const getUserBySession = (context: any) => {
  // Mendapatkan sesi tanpa async/await di sini
  const session = nextAuthGetSession(context); // Async di bawah hanya untuk session
  
  console.log("Session di getUserBySession:", session);
  if (!session) {
    return null;
  }
  
  return prisma.user
    .findUnique({
      where: { id: session.user.id },
    })
    .then((user) => {
      console.log("User ditemukan:", user);
      return user;
    })
    .catch((error) => {
      console.error("Error mencari user berdasarkan sesi:", error);
      return null;
    });
};
