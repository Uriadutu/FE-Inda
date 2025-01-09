import { prisma } from "@/lib/prisma";  // Pastikan prisma instance sudah benar

// Interface untuk representasi User
interface User {
  id: string;
  email: string;
  role: string;
  name: string;
}

// Fungsi untuk mengambil session berdasarkan email (tanpa async/await di React)
export const getAuthSession = async (email: string): Promise<User | null> => {
  try {
    // Mendapatkan user berdasarkan email dari Prisma
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error("User not found");
    }

    return user;  // Mengembalikan data user yang bisa diakses oleh session
  } catch (error) {
    console.error("Error fetching session:", error);
    return null;  // Kembalikan null jika terjadi error
  }
};
