
import Link from "next/link";
import React, { useState } from "react";

const Shift = () => {

  const shift = [
    {
      shift: "Pagi",
      href : "/shift/pagi"
    },
    {
        shift: "Siang",
        href : "/shift/siang"
    },
    {
        shift: "Malam",
        href : "/shift/malam"
    },
  ];

  return (
    <div className="page">
      <h1 className="text-lg font-bold mb-2">Pilih Shift</h1>
      <table className="w-1/2 border border-black text-left bg-white">
        <thead className="bg-gray-100">
          <tr className="text-gray-700 font-semibold">
            <th className="border px-4 py-2">Shift</th>
            <th className="border px-4 py-2">Aksi</th>
          </tr>
        </thead>
        <tbody className="">
          {shift.map((item) => (
            <tr className="border text-left text-gray-700">
              <td className="border px-4 py-3">{item.shift}</td>
              <td className="border px-4 py-3">
                <Link href={item.href} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 duration-300">
                  Tambah
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Shift;
