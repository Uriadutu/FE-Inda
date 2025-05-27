"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";
import Config from "@/lib/config";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Print from "@/app/cetak/pdf";
import * as XLSX from 'xlsx';
import Excel from "@/app/cetak/excel";
import Link from "next/link";

const Page = () => {
  const router = useRouter();
  const { id } = useParams();
  const [laporanData, setLaporanData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isPrinting, setIsPrinting] = useState(false);

  const pdfRef = useRef(null); // Ref untuk elemen yang ingin diexport sebagai PDF

  const fetchLaporanData = async (idLaporan) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${Config.ipPUBLIC}/laporan/${idLaporan}`
      );
      setLaporanData(response.data);
    } catch (error) {
      console.error("Error fetching laporan data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSavePDF = async () => {
    setIsPrinting(true); // Aktifkan elemen cetak
  
    setTimeout(async () => {
      const element = pdfRef.current; // Elemen untuk PDF
      if (!element) return;
  
      try {
        const canvas = await html2canvas(element, { scale: 2 });
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");
  
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
  
        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save("laporan.pdf");
      } catch (error) {
        console.error("Gagal menghasilkan PDF:", error);
      } finally {
        setIsPrinting(false); // Nonaktifkan elemen cetak
      }
    }, 100); // Timeout untuk memastikan render selesai
  };
  

  useEffect(() => {
    if (id) {
      fetchLaporanData(id);
    }
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!laporanData) return <p>Data tidak tersedia</p>;

  const exportToExcel = (data: any[]) => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, 'Data');
    XLSX.writeFile(wb, 'exported-data.xlsx');
  };

  return (
    <div className="page">
      <h1 className="text-lg font-bold mb-2">Detail</h1>
      <div className="flex gap-3">
        <Link onClick={() => router.back()} className="btn-back">
          Kembali
        </Link>
        <button onClick={handleSavePDF} className="btn-pdf">
          Ekspor PDF
        </button>
        {/* <Excel onExport={exportToExcel} dataGet={laporanData}/> */}
      </div>
      <div className="flex items-center">
        <div>
          {isPrinting && (
            <div ref={pdfRef} className="absolute right-[10000px]">
              <Print laporanData={laporanData} />
            </div>
          )}

          {!isPrinting && (
            <div className="hidden-print" style={{ display: "none" }}>
              <Print laporanData={laporanData} />
            </div>
          )}
        </div>

        <div className="w-full items-center">
          <div className="w-full">
            <div className="flex-items-center">
              <div className="flex justify-between p-2 border border-black gap-4">
                {laporanData && (
                  <>
                    <div className="mr-10">
                      <ul className="text-justify">
                        <li>Prop.Hole ID: {laporanData.propHoleID}</li>
                        <li>PROJECT: {laporanData.project}</li>
                        <li>PROSPECT: {laporanData.prospect}</li>
                        <li>HOLE_ID: {laporanData.holeID}</li>
                        <li>Time Start: {laporanData.timeStart}</li>
                        <li>Time Finish: {laporanData.timeFinish}</li>
                      </ul>
                    </div>
                    <div className="mr-10">
                      <ul className="text-justify">
                        <li>NORTHING Prop: {laporanData.northingProp}</li>
                        <li>EASTHING Prop: {laporanData.eastingProp}</li>
                        <li>CoW: {laporanData.cow}</li>
                        <li>Rig. No: {laporanData.rigNo}</li>
                        <li>Date Start: {laporanData.dateStart}</li>
                        <li>Date Finish: {laporanData.dateFinish}</li>
                      </ul>
                    </div>
                    <div className="mr-10">
                      <ul className="text-justify">
                        <li>COLLAR AZIMUTH: {laporanData.collarAzimuth}</li>
                        <li>COLLAR DIP: {laporanData.collarDip}</li>
                        <li>RL: {laporanData.rl}</li>
                        <li>NORTHING Hole.ID: {laporanData.northingHoleID}</li>
                        <li>EASTHING Hole.ID: {laporanData.eastingHoleID}</li>
                      </ul>
                    </div>
                    <div className="mr-10">
                      <ul className="text-justify">
                        <li>LOGGED BY: {laporanData.loggedBy}</li>
                        <li>DATE: {laporanData.dateLogged}</li>
                        <li>CHECKED BY: {laporanData.checkedBy}</li>
                        <li>DATE CHECKED: {laporanData.dateChecked}</li>
                        <li>PAGE: {laporanData.page}</li>
                      </ul>
                    </div>
                  </>
                )}
              </div>
              <div className="overflow-x-auto w-full mt-6">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
                  <thead>
                    <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                      <th colSpan={3}>General Info</th>
                      <th
                        rowSpan={2}
                        className="py-3 px-6 text-center border border-gray-300"
                      >
                        Color
                      </th>
                      <th
                        colSpan={2}
                        className="py-3 px-6 text-center border border-gray-300"
                      >
                        Lithology Type
                      </th>
                      <th
                        colSpan={2}
                        className="py-3 px-6 text-center border border-gray-300"
                      >
                        Quartz
                      </th>
                      <th
                        colSpan={3}
                        className="py-3 px-6 text-center border border-gray-300"
                      >
                        Condition
                      </th>
                      <th
                        colSpan={2}
                        className="py-3 px-6 text-center border border-gray-300"
                      >
                        Weight
                      </th>
                      <th
                        colSpan={2}
                        className="py-3 px-6 text-center border border-gray-300"
                      >
                        Sulphide
                      </th>
                      <th
                        colSpan={3}
                        className="py-3 px-6 text-center border border-gray-300"
                      >
                        Oxide
                      </th>
                    </tr>
                    <tr>
                      <th className="py-3 px-6 text-center border border-gray-300 bg-gray-200">
                        Sample ID
                      </th>
                      <th className="py-3 px-6 text-center border border-gray-300 bg-gray-200">
                        From
                      </th>
                      <th className="py-3 px-6 text-center border border-gray-300 bg-gray-200">
                        To
                      </th>
                      <th className="py-3 px-6 text-center border border-gray-300 bg-gray-200">
                        Primary
                      </th>
                      <th className="py-3 px-6 text-center border border-gray-300 bg-gray-200">
                        Secondary
                      </th>
                      <th className="py-3 px-6 text-center border border-gray-300 bg-gray-200">
                        Type
                      </th>
                      <th className="py-3 px-6 text-center border border-gray-300 bg-gray-200">
                        Intensity
                      </th>
                      <th className="py-3 px-6 text-center border border-gray-300 bg-gray-200">
                        Dry
                      </th>
                      <th className="py-3 px-6 text-center border border-gray-300 bg-gray-200">
                        Moist
                      </th>
                      <th className="py-3 px-6 text-center border border-gray-300 bg-gray-200">
                        Wet
                      </th>
                      <th className="py-3 px-6 text-center border border-gray-300 bg-gray-200">
                        Actual (kg)
                      </th>
                      <th className="py-3 px-6 text-center border border-gray-300 bg-gray-200">
                        Plan (kg)
                      </th>
                      <th className="py-3 px-6 text-center border border-gray-300 bg-gray-200">
                        Type
                      </th>
                      <th className="py-3 px-6 text-center border border-gray-300 bg-gray-200">
                        %
                      </th>
                      <th className="py-3 px-6 text-center border border-gray-300 bg-gray-200">
                        Weak
                      </th>
                      <th className="py-3 px-6 text-center border border-gray-300 bg-gray-200">
                        Medium
                      </th>
                      <th className="py-3 px-6 text-center border border-gray-300 bg-gray-200">
                        Strong
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border border-gray-300">
                      <td className="py-3 px-6 text-center border border-gray-300">
                        {laporanData.sampleID}
                      </td>
                      <td className="py-3 px-6 text-center border border-gray-300">
                        {laporanData.from}
                      </td>
                      <td className="py-3 px-6 text-center border border-gray-300">
                        {laporanData.to}
                      </td>
                      <td className="py-3 px-6 text-center border border-gray-300">
                        {laporanData.color}
                      </td>
                      <td className="py-3 px-6 text-center border border-gray-300">
                        {laporanData.primary}
                      </td>
                      <td className="py-3 px-6 text-center border border-gray-300">
                        {laporanData.secondary}
                      </td>
                      <td className="py-3 px-6 text-center border border-gray-300">
                        {laporanData.quartzType}
                      </td>
                      <td className="py-3 px-6 text-center border border-gray-300">
                        {laporanData.intensity}
                      </td>
                      <td className="py-3 px-6 text-center border border-gray-300">
                        {laporanData.dry ?  "✓" : "-"}
                      </td>
                      <td className="py-3 px-6 text-center border border-gray-300">
                        {laporanData.moist ?  "✓" : "-"}
                      </td>
                      <td className="py-3 px-6 text-center border border-gray-300">
                        {laporanData.wet ?  "✓" : "-"}
                      </td>
                      <td className="py-3 px-6 text-center border border-gray-300">
                        {laporanData.actualKg}
                      </td>
                      <td className="py-3 px-6 text-center border border-gray-300">
                        {laporanData.planKg}
                      </td>
                      <td className="py-3 px-6 text-center border border-gray-300">
                        {laporanData.sulphideType}
                      </td>
                      <td className="py-3 px-6 text-center border border-gray-300">
                        {laporanData.sulphidePercent}
                      </td>
                      <td className="py-3 px-6 text-center border border-gray-300">
                        {laporanData.oxideWeak ?  "✓" : "-"}
                      </td>
                      <td className="py-3 px-6 text-center border border-gray-300">
                        {laporanData.oxideMedium ?  "✓" : "-"}
                      </td>
                      <td className="py-3 px-6 text-center border border-gray-300">
                        {laporanData.oxideStrong ?  "✓" : "-"}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
