"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";
import Config from "@/lib/config";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Print from "@/app/cetak/pdf";
import * as XLSX from "xlsx";
import Excel from "@/app/cetak/excel";
import InfoHoleModal from "@/components/modals/InfoHoleModal";
import { tanggalFormat } from "@/utils/helper";
import AddLaporanModal from "@/components/modals/AddLaporanModal";
import AddSampleModal from "@/components/modals/AddSampleModal";
import { it } from "node:test";

const Samples = ({ auth }) => {
  const router = useRouter();
  const { id } = useParams();
  const [laporanData, setLaporanData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isPrinting, setIsPrinting] = useState(false);
  const [openModalAdd, setIsOpenModalAdd] = useState(false);
  const [openModalRange, setOpenModalRange] = useState(false);
  const [openModalInfo, setOpenModalInfo] = useState(false);
  const [samples, setSamples] = useState([]);
  const [sampleIDFrom, setSampleIDFrom] = useState("");
  const [sampleIDTo, setSampleIDTo] = useState("");
  const [fromFrom, setFromFrom] = useState("");
  const [fromTo, setFromTo] = useState("");
  const [toFrom, setToFrom] = useState("");
  const [toTo, setToTo] = useState("");

  const pdfRef = useRef(null); // Ref untuk elemen yang ingin diexport sebagai PDF

  const fetchLaporanData = async (idLaporan) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${Config.ipPUBLIC}/sumary/${idLaporan}`
      );
      setLaporanData(response.data);
    } catch (error) {
      console.error("Error fetching laporan data:", error);
    } finally {
      setLoading(false);
    }
  };
  const getSamples = async (idHole) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${Config.ipPUBLIC}/samples/status/terima/${idHole}`
      );
      setSamples(response.data);
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
        setIsPrinting(false);
      }
    }, 100);
  };

  useEffect(() => {
    if (id) {
      fetchLaporanData(id);
      getSamples(id);
    }
  }, [id]);

  const getSampleCondition = (item) => {
    const conditions = [];
    if (item.dry) conditions.push("Dry");
    if (item.moist) conditions.push("Moist");
    if (item.wet) conditions.push("Wet");

    return conditions.length > 0 ? conditions.join(", ") : "-";
  };

  if (loading) return <p>Loading...</p>;
  if (!laporanData) return <p>Data tidak tersedia</p>;

  const exportToExcel = () => {
    // Buat array dari data tabel
    const data = samples.map((item) => ({
      "Hole ID": id,
      "Sample ID": item.sampleID,
      From: item.from,
      To: item.to,
      WheightCaligo: item.actualKg,
      "Sample Condition": getSampleCondition(item), // Panggil fungsi di sini
      Colour1: item.colour1,
      Colour2: item.colour2,
      Colour3: item.colour3,
      Litho1: item.primary,
      Litho2: item.secondary,
      AltTy: item.alterationType,
    }));

    // Buat worksheet dan workbook
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Samples");

    // Simpan file Excel
    XLSX.writeFile(workbook, "DrillingData.xlsx");
  };

  const handleNext = () => {
    if (
      sampleIDFrom !== "" &&
      sampleIDTo !== "" &&
      fromFrom !== "" &&
      fromTo !== "" &&
      toFrom !== "" &&
      toTo !== ""
    ) {
      setOpenModalRange(false);
      setIsOpenModalAdd(true);
    }
  };

  const handleDelete = async (iddata) => {
    try {
      await axios.delete(`${Config.ipPUBLIC}/samples/${iddata}`);
      getSamples(id);
    } catch (error) {
      console.error("Error deleting sample:", error);
    }
  };

  return (
    <div className="page">
      <h1 className="text-lg font-bold mb-2">RCGC Drill Log Sheet</h1>
      <div className="flex gap-3">
        <button onClick={() => router.back()} className="btn-back">
          Kembali
        </button>
        {auth.user.role === "geologi junior" ? (
          <button onClick={() => setOpenModalInfo(true)} className="btn-add">
            Tambah Data Ket.Drilling
          </button>
        ) : null}
        <button onClick={() => exportToExcel()} className="btn-excel">
          Download Excel
        </button>
        <button onClick={() => handleSavePDF()} className="btn-pdf">
          Cetak PDF
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
          {openModalInfo && (
            <InfoHoleModal
              getHoleInfo={fetchLaporanData}
              setIsOpenModalInfo={setOpenModalInfo}
              holeId={laporanData}
            />
          )}
          {openModalAdd && (
            <AddSampleModal
              setIsOpenModalAdd={setIsOpenModalAdd}
              getLaporan={getSamples}
              id={id}
              sampleIDFrom={sampleIDFrom}
              sampleIDTo={sampleIDTo}
              fromFrom={fromFrom}
              fromTo={fromTo}
              toFrom={toFrom}
              toTo={toTo}
            />
          )}
          {openModalRange && (
            <div className="">
              <div
                id="default-modal"
                tabIndex="-1"
                aria-hidden="true"
                className="fixed inset-0 flex items-center justify-center bg-gray-500 z-top bg-opacity-30"
              >
                <form>
                  <div className="w-full max-w-xl bg-white rounded-lg shadow-lg">
                    <div className="flex items-center justify-between p-4 border-b rounded-t">
                      <h3 className="text-xl font-semibold text-gray-900">
                        GENERAL INFO
                      </h3>
                      <button
                        onClick={() => setOpenModalRange(false)}
                        type="button"
                        className="inline-flex items-center justify-center w-8 h-8 text-sm text-gray-400 bg-transparent rounded-lg hover:bg-gray-200 hover:text-gray-900 ms-auto"
                        data-modal-hide="default-modal"
                      >
                        <svg
                          className="w-3 h-3"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 14 14"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                          />
                        </svg>
                        <span className="sr-only">Close modal</span>
                      </button>
                    </div>
                    <div className="p-4 space-y-4">
                      <div className="mb-6">
                        <div className="grid grid-cols-5 w-full gap-2 whitespace-nowrap mt-2">
                          <label htmlFor="tanggal" className="label-input">
                            Sample ID
                          </label>
                          <p>:</p>
                          <input
                            value={sampleIDFrom}
                            onChange={(e) => setSampleIDFrom(e.target.value)}
                            type="number"
                            required
                            className="w-full input"
                          />
                          <p>To</p>
                          <input
                            value={sampleIDTo}
                            onChange={(e) => setSampleIDTo(e.target.value)}
                            type="number"
                            required
                            className="w-full input"
                          />
                        </div>
                        <div className="grid grid-cols-5 w-full gap-2 whitespace-nowrap mt-2">
                          <label htmlFor="tanggal" className="label-input">
                            From
                          </label>
                          <p>:</p>
                          <input
                            value={fromFrom}
                            onChange={(e) => setFromFrom(e.target.value)}
                            type="number"
                            required
                            className="w-full input"
                          />
                          <p>To</p>
                          <input
                            value={fromTo}
                            onChange={(e) => setFromTo(e.target.value)}
                            type="number"
                            required
                            className="w-full input"
                          />
                        </div>
                        <div className="grid grid-cols-5 w-full gap-2 whitespace-nowrap mt-2">
                          <label htmlFor="tanggal" className="label-input">
                            To
                          </label>
                          <p>:</p>
                          <input
                            value={toFrom}
                            onChange={(e) => setToFrom(e.target.value)}
                            type="number"
                            required
                            className="w-full input"
                          />
                          <p>To</p>
                          <input
                            value={toTo}
                            onChange={(e) => setToTo(e.target.value)}
                            type="number"
                            required
                            className="w-full input"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-end p-4 space-x-3 border-t border-gray-200 rounded-b">
                      <button
                        className="btn btn-simpan"
                        onClick={() => handleNext()}
                      >
                        Berikutnya
                      </button>
                      <button
                        onClick={() => setOpenModalRange(false)}
                        type="button"
                        className="btn-batal"
                      >
                        Batal
                      </button>
                    </div>
                  </div>
                </form>
              </div>
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
            <div className="">
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
                        <li>
                          Date Start: {tanggalFormat(laporanData.dateStart)}
                        </li>
                        <li>
                          Date Finish: {tanggalFormat(laporanData.dateFinish)}
                        </li>
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
                        <li>DATE: {laporanData.tanggal}</li>
                        <li>CHECKED BY: {laporanData.checkBy}</li>
                        <li>DATE CHECKED: {laporanData.tglCheck}</li>
                        <li>PAGE: {laporanData.page}</li>
                      </ul>
                    </div>
                  </>
                )}
              </div>
              <div className="mt-4 mb-0">
                {auth.user.role === "geologi junior" ? (
                  <button
                    // onClick={() => setIsOpenModalAdd(true)}
                    onClick={() => setOpenModalRange(true)}
                    className="btn-add"
                  >
                    Tambah Sample
                  </button>
                ) : null}
              </div>
              <div className="overflow-x-auto w-full ">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
                  <thead>
                    <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                      <th colSpan={3}>General Info</th>
                      <th
                        rowSpan={1}
                        colSpan={3}
                        className="py-3 px-6 text-center border border-gray-300"
                      >
                        Colour
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
                        Alteration
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
                      <th
                        rowSpan={3}
                        className="py-3 px-6 text-center border border-gray-300"
                      >
                        Comments
                      </th>
                      {auth.user.role === "geologi senior" ? (
                        <th
                          rowSpan={3}
                          className="py-3 px-6 text-center border border-gray-300"
                        >
                          Aksi
                        </th>
                      ) : null}
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
                        1
                      </th>
                      <th className="py-3 px-6 text-center border border-gray-300 bg-gray-200">
                        2
                      </th>
                      <th className="py-3 px-6 text-center border border-gray-300 bg-gray-200">
                        3
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
                        Type
                      </th>
                      <th className="py-3 px-6 text-center border border-gray-300 bg-gray-200">
                        %
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
                    {samples.map((item, index) => (
                      <tr key={index} className="border border-gray-300">
                        <td className="py-3 px-6 text-center border border-gray-300">
                          {item.sampleID}
                        </td>
                        <td className="py-3 px-6 text-center border border-gray-300">
                          {item.from}
                        </td>
                        <td className="py-3 px-6 text-center border border-gray-300">
                          {item.to}
                        </td>
                        <td className="py-3 px-6 text-center border border-gray-300">
                          {item.colour1}
                        </td>
                        <td className="py-3 px-6 text-center border border-gray-300">
                          {item.colour2}
                        </td>
                        <td className="py-3 px-6 text-center border border-gray-300">
                          {item.colour3}
                        </td>
                        <td className="py-3 px-6 text-center border border-gray-300">
                          {item.primary}
                        </td>
                        <td className="py-3 px-6 text-center border border-gray-300">
                          {item.secondary}
                        </td>
                        <td className="py-3 px-6 text-center border border-gray-300">
                          {item.alterationType}
                        </td>
                        <td className="py-3 px-6 text-center border border-gray-300">
                          {item.alterationIntensity}
                        </td>
                        <td className="py-3 px-6 text-center border border-gray-300">
                          {item.quartzType}
                        </td>
                        <td className="py-3 px-6 text-center border border-gray-300">
                          {item.intensity}
                        </td>
                        <td className="py-3 px-6 text-center border border-gray-300">
                          {item.dry ? "✓" : "-"}
                        </td>
                        <td className="py-3 px-6 text-center border border-gray-300">
                          {item.moist ? "✓" : "-"}
                        </td>
                        <td className="py-3 px-6 text-center border border-gray-300">
                          {item.wet ? "✓" : "-"}
                        </td>
                        <td className="py-3 px-6 text-center border border-gray-300">
                          {item.actualKg}
                        </td>
                        <td className="py-3 px-6 text-center border border-gray-300">
                          {item.planKg}
                        </td>
                        <td className="py-3 px-6 text-center border border-gray-300">
                          {item.sulphideType}
                        </td>
                        <td className="py-3 px-6 text-center border border-gray-300">
                          {item.sulphidePercent}
                        </td>
                        <td className="py-3 px-6 text-center border border-gray-300">
                          {item.oxideWeak ? "✓" : "-"}
                        </td>
                        <td className="py-3 px-6 text-center border border-gray-300">
                          {item.oxideMedium ? "✓" : "-"}
                        </td>
                        <td className="py-3 px-6 text-center border border-gray-300">
                          {item.oxideStrong ? "✓" : "-"}
                        </td>
                        <td className="py-3 px-6 text-center border border-gray-300">
                          {item.comments}
                        </td>
                        {auth.user.role === "geologi senior" ? (
                          <td className="py-3 px-6 text-center border border-gray-300">
                            <button
                              className="btn-hapus"
                              onClick={() => handleDelete(item.id)}
                            >
                              Hapus
                            </button>
                          </td>
                        ) : null}
                      </tr>
                    ))}
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

export default Samples;
