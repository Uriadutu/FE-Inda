import Link from "next/link";
import React, { useState } from "react";

const LokasiLubang = ({ session }) => {
 const lokasi = [
  {
    lokasi: "Tokatindung",
    href: "/validasi-laporan/tokatindung",
  },
  {
    lokasi: "Kopra",
    href: "/validasi-laporan/kopra",
  },
  {
    lokasi: "Alaskar",
    href: "/validasi-laporan/alaskar",
  },
  {
    lokasi: "Araren",
    href: "/validasi-laporan/araren",
  },
  {
    lokasi: "Padjajaran",
    href: "/validasi-laporan/padjajaran",
  },
  {
    lokasi: "Blambangan",
    href: "/validasi-laporan/blambangan",
  },
  {
    lokasi: "Marawuwung",
    href: "/validasi-laporan/marawuwung",
  },
];


  return (
    <div className="page">
      <h1 className="text-lg font-bold mb-2">Pilih Lokasi Pengeboran</h1>
      <table className="w-1/2 border border-black text-left bg-white">
        <thead className="bg-gray-100">
          <tr className="text-gray-700 font-semibold">
            <th className="border px-4 py-2">Lokasi</th>
            <th className="border px-4 py-2">Aksi</th>
          </tr>
        </thead>
        <tbody className="">
          {lokasi.map((item) => (
            <tr className="border text-left text-gray-700">
              <td className="border px-4 py-3">{item.lokasi}</td>
              <td className="border px-4 py-3">
                {session.user.role === "geologi junior" && (
                  <Link
                    href={item.href}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 duration-300"
                  >
                    Tambah
                  </Link>
                )}
                {session.user.role !== "geologi junior" && (
                  <Link
                    href={item.href}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 duration-300"
                  >
                    Lihat
                  </Link>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LokasiLubang;
