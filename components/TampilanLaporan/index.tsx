"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Config from "@/lib/config";
import axios from "axios";

const TampilanLaporan = () => {
  return (
    <div className="flex flex-col items-center mx-auto mt-20 w-full max-w-5xl px-5">
      <h1 className="text-3xl font-bold text-center mb-4">LAPORAN RCGC DRILL LOG SHEET</h1>
      <hr className="w-full " />
      <div className="flex justify-between w-full py-3">
        <div className="flex gap-2">

        <button className="bg-blue-400 p-2 rounded border border-gray-300 text-white">Tambah Data</button>
        <button className="bg-red-400 p-2 rounded border border-gray-300 text-white">Export PDF</button>
        </div>
        <form className="">
          <div className="flex border border-gray-300 rounded-lg overflow-hidden">
            <input
              type="text"
              placeholder="Ketik nama peserta"
              className="input input-bordered w-72 max-w-xl px-4 py-2"
            />
            <button type="submit" className="btn btn-outline btn-accent px-6 py-2">
              Cari
            </button>
          </div>
        </form>
      </div>


      <div className="w-full overflow-x-auto">
        <table className="table-auto w-full border border-black text-left bg-white">
          <thead className="bg-gray-100">
            <tr className="text-gray-700 font-semibold">
              <th className="border px-4 py-2">No</th>
              <th className="border px-4 py-2">Tanggal Masuk</th>
              <th className="border px-4 py-2">Hole ID</th>
              <th className="border px-4 py-2">Project</th>
              <th className="border px-4 py-2">Prospect</th>
              <th className="border px-4 py-2 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border text-left text-gray-700">
              <td className="border px-4 py-3">1</td>
              <td className="border px-4 py-3">23 Maret 2024</td>
              <td className="border px-4 py-3">0887</td>
              <td className="border px-4 py-3">KOPRA</td>
              <td className="border px-4 py-3">TTU</td>
              <td className="border px-4 py-3 text-center">
                <Link href="/" className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-blue-600">
                  Details
                </Link>
                <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
                  Hapus
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="flex justify-center mt-10 mb-10">
        <nav role="navigation" aria-label="pagination">
          {/* Placeholder untuk pagination */}
        </nav>
      </div>
    </div>
  );
};

export default TampilanLaporan;
