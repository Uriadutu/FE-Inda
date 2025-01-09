import { NextApiRequest, NextApiResponse } from "next";
import { getAuthSession } from "@/lib/auth";  // Mengimpor fungsi getAuthSession

// Handler API route untuk mendapatkan session berdasarkan email
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const { email } = req.query;  // Misalnya email dikirim melalui query string

    if (typeof email !== 'string') {
      return res.status(400).json({ error: 'Invalid email parameter' });
    }

    try {
      const user = await getAuthSession(email);  // Mendapatkan session berdasarkan email

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      return res.status(200).json({ user });  // Mengirimkan data user yang valid
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  return res.status(405).json({ message: 'Method not allowed' });
}
