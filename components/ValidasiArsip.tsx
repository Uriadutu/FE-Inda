"use client";

import AddArsipModal from "@/components/modals/AddArsipModal";
import Config from "@/lib/config";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const ValidasiArsip = ({ session }) => {
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [arsip, setArsip] = useState([]);
  const [filteredArsip, setFilteredArsip] = useState([]); // Data yang difilter
  const [selectedMonth, setSelectedMonth] = useState(""); // Bulan yang dipilih
  const [searchTerm, setSearchTerm] = useState(""); // Kata kunci pencarian
  const [selectedReportType, setSelectedReportType] = useState(""); // Jenis laporan yang dipilih

  const getArsip = async () => {
    try {
      const response = await axios.get(`${Config.ipPUBLIC}/arsip/status/pending`);
      setArsip(response.data);
      setFilteredArsip(response.data); // Default: tampilkan semua data
    } catch (error) {
      console.log(error);
    }
  };

  const hapusData = async (id) => {
    try {
      await axios.delete(`${Config.ipPUBLIC}/arsip/${id}`);
      alert("Data Ditolak");
      getArsip();
    } catch (error) {
      console.log(error);
    }
  };

  const handleMonthChange = (e) => {
    const selected = e.target.value; // Nilai bulan yang dipilih
    setSelectedMonth(selected);
    filterData(selected, searchTerm, selectedReportType);
  };

  const handleSearchChange = (e) => {
    const search = e.target.value; // Kata kunci pencarian
    setSearchTerm(search);
    filterData(selectedMonth, search, selectedReportType);
  };

  const handleReportTypeChange = (e) => {
    const reportType = e.target.value; // Jenis laporan yang dipilih
    setSelectedReportType(reportType);
    filterData(selectedMonth, searchTerm, reportType);
  };

  const filterData = (month, search, reportType) => {
    let filtered = arsip;

    if (month) {
      filtered = filtered.filter((item) => {
        const itemMonth = item.tanggal.slice(0, 7); // Ambil "YYYY-MM" dari tanggal
        return itemMonth === month;
      });
    }

    if (search) {
      filtered = filtered.filter((item) =>
        item.drilling.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (reportType === "Drilling Report") {
      filtered = filtered.filter((item) => item.drilling.endsWith(".pdf"));
    } else if (reportType === "Sample Report") {
      filtered = filtered.filter((item) => item.drilling.endsWith(".xlsx"));
    }

    setFilteredArsip(filtered);
  };

  const unduhData = (url) => {
    // Mengambil nama file dari URL (pastikan URL memiliki ekstensi)
    const fileName = url.substring(url.lastIndexOf("/") + 1); // Mengambil nama file dari URL

    // Fungsi untuk mengunduh file
    axios({
      url: url, // URL file yang akan diunduh
      method: "GET",
      responseType: "blob", // Menangani file sebagai blob
    })
      .then((response) => {
        const blob = new Blob([response.data]);
        const link = document.createElement("a");
        const objectUrl = window.URL.createObjectURL(blob);

        // Set atribut href dan download
        link.href = objectUrl;
        link.setAttribute("download", fileName); // Menggunakan nama file dari URL
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch((error) => {
        console.error("Error downloading the file:", error);
      });
  };

  const terimaData = async (id) => {
    try {
      await axios.patch(`${Config.ipPUBLIC}/arsip/terima/${id}`);
      alert("Data Diterima");
      getArsip();
    } catch (error) {
      console.error("Error terima data:", error);
    }
  };

  useEffect(() => {
    getArsip();
  }, []);

  return (
    <section className="page">
      {openModalAdd && (
        <AddArsipModal
          setIsOpenModalAdd={setOpenModalAdd}
          getArsip={getArsip}
        />
      )}
      <div className="flex">
        <h1 className="text-2xl">Arsip Laporan Drilling</h1>
      </div>
      <div className="flex gap-3">
        {session.user.role === "geologi junior" && (
          <button className="btn-add" onClick={() => setOpenModalAdd(true)}>
            Tambah Data
          </button>
        )}
      </div>
      <div className="flex justify-between items-center">
        <div className="flex gap-4">
          <div className="">
            <p>Jenis Laporan</p>
            <select
              className="input"
              value={selectedReportType}
              onChange={handleReportTypeChange}
            >
              <option></option>
              <option>Drilling Report</option>
              <option>Sample Report</option>
            </select>
          </div>
          <div className="">
            <p>Tanggal</p>
            <input
              type="month"
              className="input"
              value={selectedMonth}
              onChange={handleMonthChange}
            />
          </div>
        </div>
        <div className="">
          <input
            type="text"
            className="input w-60 border-gray-900"
            placeholder="Cari Drilling"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
      </div>
      <table className="table-auto mt-3 w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2 whitespace-nowrap">
              No
            </th>
            <th className="border border-gray-300 px-4 py-2 whitespace-nowrap text-left">
              Nama Drilling Report
            </th>
            <th className="border border-gray-300 px-4 py-2 whitespace-nowrap text-left">
              Tanggal
            </th>
            <th className="border border-gray-300 px-4 py-2 whitespace-nowrap">
              Aksi
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredArsip.length === 0 ? (
            <tr>
              <td
                colSpan="4"
                className="border border-gray-300 px-4 py-2 text-center text-gray-500"
              >
                Tidak ada data tersedia
              </td>
            </tr>
          ) : (
            filteredArsip.map((item, index) => (
              <tr key={index}>
                <td className="border border-gray-300 px-4 py-2 whitespace-nowrap text-center">
                  {index + 1}
                </td>
                <td className="border border-gray-300 px-4 py-2 whitespace-nowrap text-left">
                  {item.drilling}
                </td>
                <td className="border border-gray-300 px-4 py-2 whitespace-nowrap text-left">
                  {item.tanggal}
                </td>
                <td className="border border-gray-300 px-4 py-2 whitespace-nowrap text-center">
                  <Link
                    href={`${item.urlDrilling}`}
                    target="_blank"
                    className="btn-add"
                  >
                    Lihat
                  </Link>
                  <button
                    className="btn-add"
                    onClick={() => unduhData(item.urlDrilling)} // Menambahkan fungsi unduh
                  >
                    Unduh
                  </button>
                  {session.user.role === "geologi junior" && (
                    <button
                      className="btn-hapus"
                      onClick={() => hapusData(item.id)}
                    >
                      Hapus
                    </button>
                  )}
                      {session.user.role === "geologi senior" && (
                        <button
                          className="btn-add"
                          onClick={() => terimaData(item.id)}
                        >
                          Terima
                        </button>
                      )}
                  {session.user.role === "geologi senior" && (
                    <button
                      className="btn-hapus"
                      onClick={() => hapusData(item.id)}
                    >
                      Tolak
                    </button>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </section>
  );
};

export default ValidasiArsip;
