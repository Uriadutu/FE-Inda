"use client";
import Config from "@/lib/config";
import { formatDate } from "@/lib/utils";
import axios from "axios";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";

const LaporanValid = (auth) => {
  const { namalubang } = useParams();
  const [samples, setSamples] = useState([]);
  console.log(samples, "samples");
  
  const getSamples = async () => {
    try {
      const response = await axios.get(
        `${Config.ipPUBLIC}/samples/terima/${namalubang}`
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

  const handleExportExcel = async () => {
    try {
      const response = await axios.get(
        `${Config.ipPUBLIC}/samples/terima/${namalubang}`
      );
      const data = response.data;

      const formattedData = data.map((item) => ({
        HoleId: item?.sumary?.holeId,
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
      <h1 className="text-lg font-bold mb-2">Laporan Valid</h1>
      <div className="flex gap-3">
        <Link href={`/laporan-valid/${namalubang}`} className="btn-back">
          Kembali
        </Link>
         {/* <button className="btn-excel" onClick={handleExportExcel}>
          Export Excel
        </button> */}
      </div>
      <div className="">
        <div className="overflow-x-auto w-full ">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th
                  rowSpan={2}
                //   colSpan={3}
                  className="py-3 px-6 text-center border border-gray-300"
                >
                  Hole ID
                </th>
                <th colSpan={3}  className="py-3 px-6 text-center border border-gray-300">General Info</th>
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
                    <td className="py-3 px-6 text-center border border-gray-300">
                      {item?.sumary?.holeID}
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
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LaporanValid;
