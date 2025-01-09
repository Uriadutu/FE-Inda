"use client";
import AddTanggalModal from "@/components/modals/AddTanggalModal";
import Config from "@/lib/config";
import axios from "axios";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const Tanggal = ({ auth }) => {
  const [dataGet, setDataGet] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const { shift } = useParams();

  const getTanggal = async () => {
    try {
      const response = await axios.get(
        `${Config.ipPUBLIC}/tanggal/shift/${shift}`
      );
      setDataGet(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(auth);

  useEffect(() => {
    getTanggal();
  }, [shift]);

  const hapusData = async (id) => {
    try {
      await axios.delete(`${Config.ipPUBLIC}/tanggal/${id}`);
      getTanggal();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="page">
      {openModal && (
        <AddTanggalModal
          setIsOpenModalAdd={setOpenModal}
          getTanggal={getTanggal}
        />
      )}
      <h1 className="text-lg font-bold mb-2">Shift {shift}</h1>
      <div className="flex gap-3">
        <Link href={"/shift"} className=" btn-back">
          Kembali
        </Link>
        {auth.user.role === "geologi junior" ? (
          <button className="btn-add" onClick={() => setOpenModal(true)}>
            Tambah Tanggal
          </button>
        ) : null}
      </div>
      <table className="w-full border border-black text-left bg-white">
        <thead className="bg-gray-100">
          <tr className="text-gray-700 font-semibold">
            <th className="border px-4 py-2">No</th>
            <th className="border px-4 py-2">Tanggal</th>
            <th className="border px-4 py-2">Drilling Contractor</th>
            <th className="border px-4 py-2">RIG-ID</th>
            <th className="border px-4 py-2 text-center">Aksi</th>
          </tr>
        </thead>
        <tbody className="">
          {dataGet.map((item, index) => (
            <tr key={index} className="border text-left text-gray-700">
              <td className="border px-4 py-3">{index + 1}</td>
              <td className="border px-4 py-3">{item?.tanggal}</td>
              <td className="border px-4 py-3">{item?.drillingContractor}</td>
              <td className="border px-4 py-3">{item?.rigId}</td>
              <td className="flex gap-3 py-3 justify-center">
                <Link
                  href={`/shift/${shift}/${item?.tanggal}`}
                  className="btn-tambah"
                >
                  Tambah
                </Link>
                {auth.user.role === "geologi junior" ? (
                  <button
                    className="btn-hapus"
                    onClick={() => hapusData(item.id)}
                  >
                    Hapus
                  </button>
                ) : null}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Tanggal;