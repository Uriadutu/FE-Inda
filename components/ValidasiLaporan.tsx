"use client";
import Config from "@/lib/config";
import { formatDate } from "@/lib/utils";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const ValidasiLaporan = (auth) => {
  const { namalubang } = useParams();
  const [samples, setSamples] = useState([]);
  const [openModalTolak, setIsOpenModalTolak] = useState(false);
  const [komentar, setKomentar] = useState("");
  const [selectedSampleId, setSelectedSampleId] = useState(null);

  const getSamples = async () => {
    try {
      const response = await axios.get(
        `${Config.ipPUBLIC}/samples/status/pending/lubang/${namalubang}`
      );
      const data = response.data;
      setSamples(data);
    } catch (error) {
      console.error("Error fetching laporan data:", error);
    }
  };

  useEffect(() => {
    getSamples();
  }, []);

  const handleTerima = async (id) => {
    try {
      await axios.patch(`${Config.ipPUBLIC}/terima-samples/${id}`);
      alert("Laporan Disetujui");
      getSamples();
    } catch (error) {}
  };

  const handleTolak = async () => {
    try {
      await axios.patch(`${Config.ipPUBLIC}/samples/${selectedSampleId}`, {
        status: "Ditolak",
        komentarTolak: komentar,
      });
      alert("Laporan Ditolak");
      setIsOpenModalTolak(false);
      setKomentar("");
      setSelectedSampleId(null);
      getSamples();
    } catch (error) {
      console.error("Error rejecting sample:", error);
    }
  };

  const handleClickTolak = (id) => {
    setSelectedSampleId(id);
    setIsOpenModalTolak(true);
  };

  return (
    <div className="page">
      {openModalTolak && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-md w-full max-w-md p-6">
            <h2 className="text-xl font-semibold mb-4">Tolak Sample</h2>

            <label
              htmlFor="komentar"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Komentar
            </label>
            <textarea
              id="komentar"
              rows="4"
              value={komentar}
              onChange={(e) => setKomentar(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Masukkan komentar penolakan..."
            />

            <div className="mt-6 flex justify-end gap-2">
              <button
                onClick={() => setIsOpenModalTolak(false)}
                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
              >
                Batal
              </button>
              <button
                onClick={handleTolak}
                className="px-4 py-2 bg-red-600 text-white hover:bg-red-700 rounded"
              >
                Tolak
              </button>
            </div>
          </div>
        </div>
      )}

      <h1 className="text-lg font-bold mb-2">Validasi Laporan</h1>
      <div className="">
        <div className="overflow-x-auto w-full ">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th
                  rowSpan={2}
                  className="py-3 px-6 text-center border border-gray-300"
                >
                  Nama Penginput
                </th>
                <th
                  rowSpan={2}
                  className="py-3 px-6 text-center border border-gray-300"
                >
                  Tanggal Penginputan
                </th>
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
                <th
                  rowSpan={3}
                  className="py-3 px-6 text-center border border-gray-300"
                >
                  Status
                </th>
                <th
                  rowSpan={3}
                  className="py-3 px-6 text-center border border-gray-300"
                >
                  Aksi
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
              {[...samples]
                .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)) // urutkan dari yang paling lama
                .map((item, index) => (
                  <tr key={index} className="border border-gray-300">
                    <td className="py-3 px-6 text-center text-nowrap border border-gray-300">
                      {item.createdBy}
                    </td>
                    <td className="py-3 px-6 text-center text-nowrap border border-gray-300">
                      {formatDate(item.createdAt)}
                    </td>
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
                    <td className="py-3 px-6 text-center border border-gray-300">
                      {item.status}
                    </td>
                    <td className="py-3 px-6 text-center border border-gray-300">
                      <div className="flex">
                        <button
                          className="btn-add"
                          onClick={() => handleTerima(item.id)}
                        >
                          Terima
                        </button>
                        <button
                          className="btn-add"
                          onClick={() => handleClickTolak(item.id)}
                        >
                          Tolak
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ValidasiLaporan;
