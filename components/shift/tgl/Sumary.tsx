"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Config from "@/lib/config";
import axios from "axios";
import AddSumaryModal from "@/components/modals/AddSumaryModal";
import { useParams } from "next/navigation";

const Sumary = ({ session }) => {
  const [openModalSumary, setOpenModalSumary] = useState(false);
  const router = useRouter();
  const { tgl } = useParams();
  const [laporanData, setLaporanData] = useState([]);
  

  // Fungsi untuk mengambil data dari API
  const getDataSumary = async () => {
    try {
      const response = await axios.get(`${Config.ipPUBLIC}/sumary/tgl/${tgl}`);
      setLaporanData(response.data); // simpan data di state
    } catch (error) {
      console.error("Error fetching sumary data:", error);
    }
  };

  // Jalankan fetch ketika komponen pertama kali dimuat
  useEffect(() => {
    getDataSumary();
  }, []);

  const hapusData = async (id: number) => {
    try {
      await axios.delete(`${Config.ipPUBLIC}/sumary/${id}`);
      getDataSumary();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="page">
      {openModalSumary && (
        <AddSumaryModal
          setIsOpenModalAdd={setOpenModalSumary}
          getSumary={getDataSumary}
        />
      )}
      <h1 className="text-lg font-bold mb-2">Data Drilling Summary Report</h1>
      <div className="flex gap-3">
        <button onClick={() => router.back()} className="btn-back">
          Kembali
        </button>
        {session.user.role === "geologi junior" ? (
          <button className="btn-add" onClick={() => setOpenModalSumary(true)}>
            Tambah Sumary
          </button>
        ) : null}
      </div>
      <div className="w-full overflow-x-auto">
        <table className="table-auto w-full border border-black text-left bg-white">
          <thead className="bg-gray-100">
            <tr className="text-gray-700 font-semibold">
              <th className="border px-4 py-2">No</th>
              <th className="border px-4 py-2">HOLE ID</th>
              <th className="border px-4 py-2">PROPOSED ID</th>
              <th className="border px-4 py-2">DEPTH</th>
              <th className="border px-4 py-2">FROM</th>
              <th className="border px-4 py-2">TO</th>
              <th className="border px-4 py-2">TOTAL METER</th>
              <th className="border px-4 py-2">SAMPLE NS</th>
              <th className="border px-4 py-2">DIP</th>
              <th className="border px-4 py-2">AZIMUTH</th>
              <th className="border px-4 py-2">SAMPLEID FROM</th>
              <th className="border px-4 py-2">SAMPLEID TO</th>
              <th className="border px-4 py-2">COMMENTS</th>
              <th className="border px-4 py-2 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {laporanData.length > 0 ? (
              laporanData.map((laporan, index) => (
                <tr key={laporan.id} className="border text-left text-gray-700">
                  <td className="border px-4 py-3">{index + 1}</td>
                  <td className="border px-4 py-3">{laporan.holeID}</td>
                  <td className="border px-4 py-3">{laporan.proposedID}</td>
                  <td className="border px-4 py-3">{laporan.depth}</td>
                  <td className="border px-4 py-3">{laporan.from}</td>
                  <td className="border px-4 py-3">{laporan.to}</td>
                  <td className="border px-4 py-3">
                    {Number(laporan.to) - Number(laporan.total_meter)}
                  </td>
                  <td className="border px-4 py-3">{laporan.sample_ns}</td>
                  <td className="border px-4 py-3">{laporan.dip}</td>
                  <td className="border px-4 py-3">{laporan.azimuth}</td>
                  <td className="border px-4 py-3">{laporan.sampleid_from}</td>
                  <td className="border px-4 py-3">{laporan.sampleid_to}</td>
                  <td className="border px-4 py-3">{laporan.comment}</td>
                  <td className="px-4 py-3 text-center flex gap-2 justify-center">
                    <Link
                      href={`/laporan/sumary/${laporan.id}`}
                      className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                    >
                      Lihat
                    </Link>
                    {session.user.role === "geologi junior" ? (
                      <button
                        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                        onClick={() => hapusData(laporan.id)}
                      >
                        Hapus
                      </button>
                    ) : null}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="12" className="text-center py-4">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Sumary;
