import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
import { hashSync } from "bcryptjs";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const { name, email, password, role = "user" } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email dan password wajib diisi." });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      return res.status(400).json({ message: "Email sudah terdaftar." });
    }

    const hashedPassword = hashSync(password, 10);

    const newUser = await prisma.user.create({
      data: { name, email, password: hashedPassword, role },
    });

    return res.status(201).json(newUser);
  } catch (error) {
    console.error("Error di API addUser:", error);
    return res.status(500).json({ message: "Gagal menambah pengguna." });
  }
}
