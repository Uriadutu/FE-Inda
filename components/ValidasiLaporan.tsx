"use client";
import Config from "@/lib/config";
import axios from "axios";
import React, { useEffect, useState } from "react";

const ValidasiLaporan = (auth) => {
  const [samples, setSamples] = useState([]);
  const getSamples = async () => {
    try {
      const response = await axios.get(
        `${Config.ipPUBLIC}/samples/status/pending`
      );
      setSamples(response.data);
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

  const handleTolak = async (id) => {
    try {
      await axios.delete(`${Config.ipPUBLIC}/samples/${id}`);
      alert("Laporan Ditolak");
      getSamples();
    } catch (error) {}
  }
  return (
    <div className="page">
      <h1 className="text-lg font-bold mb-2">Validasi Laporan</h1>
      <div className="">
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
                      <button className="btn-add" onClick={() => handleTolak(item.id)}>Tolak</button>
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
