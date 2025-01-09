import { getAuthSession } from "@/lib/auth";  // Fungsi yang sudah ada

// Fungsi untuk mendapatkan session dari klien (tanpa async/await)
export const getSessionClient = async (email: string) => {
  try {
    const user = await getAuthSession(email);  // Mengambil session berdasarkan email
    return user;
  } catch (error) {
    console.error("Failed to get session on client side", error);
    return null;  // Jika terjadi error, kembalikan null
  }
};
