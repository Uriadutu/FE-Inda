"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Config from "@/lib/config";
import axios from "axios";
import AddSumaryModal from "@/components/modals/AddSumaryModal";
import * as XLSX from "xlsx";

const Sumary = ({ session }) => {
  const [openModalSumary, setOpenModalSumary] = useState(false);
  const { tgl, namalubang, shift } = useParams();
  const [laporanData, setLaporanData] = useState([]);

  // Ambil data summary
  const getDataSumary = async () => {
    try {
      const response = await axios.get(`${Config.ipPUBLIC}/sumary/tgl/${tgl}/${namalubang}`);
      setLaporanData(response.data);
    } catch (error) {
      console.error("Error fetching sumary data:", error);
    }
  };

  useEffect(() => {
    getDataSumary();
  }, []);

  // Hapus data
  const hapusData = async (id: number) => {
    try {
      await axios.delete(`${Config.ipPUBLIC}/sumary/${id}`);
      getDataSumary();
    } catch (error) {
      console.log(error);
    }
  };

  // Export Excel dari /samples/tanggal/${tgl}
  const handleExportExcel = async () => {
    try {
      const response = await axios.get(`${Config.ipPUBLIC}/samples/tanggal/${tgl}`);
      const data = response.data;

      const formattedData = data.map((item) => ({
        HoleId : item?.sumary?.holeID,
        SampleID: item.sampleID,
        From: item.from,
        To: item.to,
        Colour1: item.colour1,
        Colour2: item.colour2,
        Colour3: item.colour3,
        Primary: item.primary,
        Secondary: item.secondary,
        AlterationType: item.alterationType,
        AlterationIntensity: item.alterationIntensity,
        QuartzType: item.quartzType,
        QuartzIntensity: item.intensity,
        Dry: item.dry ? "Yes" : "No",
        Moist: item.moist ? "Yes" : "No",
        Wet: item.wet ? "Yes" : "No",
        ActualKg: item.actualKg,
        PlanKg: item.planKg,
        SulphideType: item.sulphideType,
        SulphidePercent: item.sulphidePercent,
        OxideWeak: item.oxideWeak ? "Yes" : "No",
        OxideMedium: item.oxideMedium ? "Yes" : "No",
        OxideStrong: item.oxideStrong ? "Yes" : "No",
        Comments: item.comments,
      }));

      const worksheet = XLSX.utils.json_to_sheet(formattedData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Samples");

      XLSX.writeFile(workbook, `Drilling_Sample_${tgl}.xlsx`);
    } catch (error) {
      console.error("Failed to export Excel:", error);
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
        <Link href={`/lokasi-lubang/${namalubang}/shift/${shift}`} className="btn-back">
          Kembali
        </Link>
        {session.user.role === "geologi junior" && (
          <button className="btn-add" onClick={() => setOpenModalSumary(true)}>
            Tambah Sumary
          </button>
        )}
        <button className="btn-excel" onClick={handleExportExcel}>
          Export Excel
        </button>
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
                      href={`/laporan/${namalubang}/sumary/${laporan.id}/${tgl}`}
                      className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                    >
                      Lihat
                    </Link>
                    {session.user.role === "geologi junior" && (
                      <button
                        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                        onClick={() => hapusData(laporan.id)}
                      >
                        Hapus
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="14" className="text-center py-4">
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
