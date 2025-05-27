import React, { useState } from "react";
import axios from "axios";
import Config from "@/lib/config";
import { useParams } from "next/navigation";

const AddSampleModal = ({
  setIsOpenModalAdd,
  getLaporan,
  id,
  sampleIDFrom,
  sampleIDTo,
  fromFrom,
  fromTo,
  toFrom,
  toTo,
  namaPembuat,
}) => {
  const [ns, setNs] = useState(false);
  const handleNS = (e) => {
    setNs(e.target.checked); // Mengatur nilai ns sesuai status checkbox
  };
  const { tgl, namalubang } = useParams();


  const initialFormRow = {
    holeId: id,
    createdBy : namaPembuat,
    lokasiLubang : namalubang,
    sampleID: "",
    tanggal: tgl,
    from: "",
    to: "",
    colour1: "",
    colour2: "",
    colour3: "",
    primary: "",
    secondary: "",
    alterationType: "",
    alterationIntensity: "",
    quartzType: "",
    intensity: "",
    dry: false,
    moist: false,
    wet: false,
    actualKg: "",
    planKg: "19.04",
    sulphideType: "",
    sulphidePercent: "",
    oxideWeak: false,
    oxideMedium: false,
    oxideStrong: false,
    comments: "",
  };

  const [formRows, setFormRows] = useState(() => {
    const count = sampleIDTo - sampleIDFrom + 1;
    const rows = [];

    for (let i = 0; i < count; i++) {
      rows.push({
        ...initialFormRow,
        sampleID: Number(sampleIDFrom) + i, // pastikan ini number
        from: Number(sampleIDFrom - sampleIDFrom) + i,
        to: Number(sampleIDFrom - sampleIDFrom + 1) + i,
      });
    }

    return rows;
  });

  // Fungsi untuk menangani perubahan input
  const handleChange = (index, e) => {
    const { name, value, type, checked } = e.target;
    const updatedRows = [...formRows];
    updatedRows[index][name] = type === "checkbox" ? checked : value;
    setFormRows(updatedRows);
  };

  // Fungsi untuk submit data
  const handleSubmit = async (e) => {
    e.preventDefault();

    const finalData = formRows.map((row) => {
      if (ns) {
        return {
          ...row,
          colour1: "-",
          colour2: "-",
          colour3: "-",
          primary: "-",
          secondary: "-",
          alterationType: "-",
          alterationIntensity: "-",
          quartzType: "-",
          intensity: "-",
          dry: false,
          moist: false,
          wet: false,
          actualKg: "-",
          planKg: "-",
          sulphideType: "-",
          sulphidePercent: "-",
          oxideWeak: false,
          oxideMedium: false,
          oxideStrong: false,
          comments: "-",
        };
      }
      return row;
    });

    try {
      await Promise.all(
        finalData.map((data) => axios.post(`${Config.ipPUBLIC}/samples`, data))
      );
      alert("Berhasil menyimpan semua data");
      getLaporan(id);
      setIsOpenModalAdd(false);
    } catch (error) {
      console.error("Gagal mengirim data:", error);
    }
  };

  return (
    <div
      id="default-modal"
      tabIndex="-1"
      aria-hidden="true"
      className="fixed inset-0 flex items-center justify-center bg-gray-500 z-50 bg-opacity-30"
    >
      <form
        onSubmit={handleSubmit}
        className="relative w-full max-w-2xl bg-white p-4 overflow-y-auto  rounded-lg shadow-lg"
      >
        <div className="">
          <div className=" w-full sticky top-0 flex  bg-white  items-center justify-between p-4 border-b">
            <h3 className="text-xl font-semibold text-gray-900">
              Tambah Sample
            </h3>
            <button
              onClick={() => setIsOpenModalAdd(false)}
              type="button"
              className="inline-flex items-center justify-center w-8 h-8 text-gray-400 bg-transparent rounded-lg hover:bg-gray-200"
            >
              <svg
                className="w-3 h-3"
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
            </button>
          </div>

          <div className="flex px-5">
            <div className="p-4 space-y-4 overflow-x-auto overflow-y-auto max-h-[400px] border">
              <table className="min-w-full bg-white border  border-gray-200 rounded-lg shadow-lg">
                <thead>
                  <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                    <th colSpan={3}>general info</th>
                    {/* <th
                      rowSpan={2}
                      className={`py-3 px-6 text-center border border-gray-300`}
                    >
                      NS
                    </th> */}
                    <th
                      rowSpan={1}
                      colSpan={3}
                      className={`py-3 px-6 text-center border border-gray-300 ${
                        ns ? "hidden" : ""
                      }`}
                    >
                      Colour
                    </th>
                    <th
                      colSpan={2}
                      className={`py-3 px-6 text-center border border-gray-300 ${
                        ns ? "hidden" : ""
                      }`}
                    >
                      Lithology Type
                    </th>
                    <th
                      colSpan={2}
                      className={`py-3 px-6 text-center border border-gray-300 ${
                        ns ? "hidden" : ""
                      }`}
                    >
                      Alteration
                    </th>
                    <th
                      colSpan={2}
                      className={`py-3 px-6 text-center border border-gray-300 ${
                        ns ? "hidden" : ""
                      }`}
                    >
                      Quartz
                    </th>
                    <th
                      colSpan={3}
                      className={`py-3 px-6 text-center border border-gray-300 ${
                        ns ? "hidden" : ""
                      }`}
                    >
                      Condition
                    </th>
                    <th
                      colSpan={2}
                      className={`py-3 px-6 text-center border border-gray-300 ${
                        ns ? "hidden" : ""
                      }`}
                    >
                      Weight
                    </th>
                    <th
                      colSpan={2}
                      className={`py-3 px-6 text-center border border-gray-300 ${
                        ns ? "hidden" : ""
                      }`}
                    >
                      Sulphide
                    </th>
                    <th
                      colSpan={3}
                      className={`py-3 px-6 text-center border border-gray-300 ${
                        ns ? "hidden" : ""
                      }`}
                    >
                      Oxide
                    </th>
                    <th
                      colSpan={3}
                      rowSpan={2}
                      className={`py-3 px-6 text-center border border-gray-300 ${
                        ns ? "hidden" : ""
                      }`}
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
                    <th
                      className={`py-3 px-6 text-center border border-gray-300 bg-gray-200 ${
                        ns ? "hidden" : ""
                      }`}
                    >
                      1
                    </th>
                    <th
                      className={`py-3 px-6 text-center border border-gray-300 bg-gray-200 ${
                        ns ? "hidden" : ""
                      }`}
                    >
                      2
                    </th>
                    <th
                      className={`py-3 px-6 text-center border border-gray-300 bg-gray-200 ${
                        ns ? "hidden" : ""
                      }`}
                    >
                      3
                    </th>
                    <th
                      className={`py-3 px-6 text-center border border-gray-300 bg-gray-200 ${
                        ns ? "hidden" : ""
                      }`}
                    >
                      Primary
                    </th>
                    <th
                      className={`py-3 px-6 text-center border border-gray-300 bg-gray-200 ${
                        ns ? "hidden" : ""
                      }`}
                    >
                      Secondary
                    </th>
                    <th
                      className={`py-3 px-6 text-center border border-gray-300 bg-gray-200 ${
                        ns ? "hidden" : ""
                      }`}
                    >
                      Type
                    </th>
                    <th
                      className={`py-3 px-6 text-center border border-gray-300 bg-gray-200 ${
                        ns ? "hidden" : ""
                      }`}
                    >
                      Intensity
                    </th>
                    <th
                      className={`py-3 px-6 text-center border border-gray-300 bg-gray-200 ${
                        ns ? "hidden" : ""
                      }`}
                    >
                      Type
                    </th>
                    <th
                      className={`py-3 px-6 text-center border border-gray-300 bg-gray-200 ${
                        ns ? "hidden" : ""
                      }`}
                    >
                      %
                    </th>
                    <th
                      className={`py-3 px-6 text-center border border-gray-300 bg-gray-200 ${
                        ns ? "hidden" : ""
                      }`}
                    >
                      Dry
                    </th>
                    <th
                      className={`py-3 px-6 text-center border border-gray-300 bg-gray-200 ${
                        ns ? "hidden" : ""
                      }`}
                    >
                      Moist
                    </th>
                    <th
                      className={`py-3 px-6 text-center border border-gray-300 bg-gray-200 ${
                        ns ? "hidden" : ""
                      }`}
                    >
                      Wet
                    </th>
                    <th
                      className={`py-3 px-6 text-center border border-gray-300 bg-gray-200 ${
                        ns ? "hidden" : ""
                      }`}
                    >
                      Actual (kg)
                    </th>
                    <th
                      className={`py-3 px-6 text-center border border-gray-300 bg-gray-200 ${
                        ns ? "hidden" : ""
                      }`}
                    >
                      Plan (kg)
                    </th>
                    <th
                      className={`py-3 px-6 text-center border border-gray-300 bg-gray-200 ${
                        ns ? "hidden" : ""
                      }`}
                    >
                      Type
                    </th>
                    <th
                      className={`py-3 px-6 text-center border border-gray-300 bg-gray-200 ${
                        ns ? "hidden" : ""
                      }`}
                    >
                      %
                    </th>
                    <th
                      className={`py-3 px-6 text-center border border-gray-300 bg-gray-200 ${
                        ns ? "hidden" : ""
                      }`}
                    >
                      Weak
                    </th>
                    <th
                      className={`py-3 px-6 text-center border border-gray-300 bg-gray-200 ${
                        ns ? "hidden" : ""
                      }`}
                    >
                      Medium
                    </th>
                    <th
                      className={`py-3 px-6 text-center border border-gray-300 bg-gray-200 ${
                        ns ? "hidden" : ""
                      }`}
                    >
                      Strong
                    </th>
                  </tr>
                </thead>
                  {formRows.map((row, index) => (
                    <tbody className=" ">
                      <tr>
                        <td>
                          <input
                            name="sampleID"
                            type="number"
                            value={row.sampleID}
                            onChange={(e) => handleChange(index, e)}
                            className="input"
                            min={sampleIDFrom}
                            max={sampleIDTo}
                            disabled
                          />
                        </td>
                        <td>
                          <input
                            name="from"
                            type="number"
                            value={row.from}
                            onChange={(e) => handleChange(index, e)}
                            className="input"
                            min={fromFrom}
                            max={fromTo}
                            disabled
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            name="to"
                            value={row.to}
                            onChange={(e) => handleChange(index, e)}
                            className="input"
                            min={toFrom}
                            max={toTo}
                            disabled
                          />
                        </td>
                        {/* <td>
                        <input
                          name="ns"
                          onChange={handleNS}
                          type="checkbox"
                          checked={ns} // Sinkronisasi dengan state
                          className="input text-center justify-center flex w-full"
                        />
                      </td> */}
                        <td className={` ${ns ? "hidden" : ""}`}>
                          <select
                            name="colour1"
                            onChange={(e) => handleChange(index, e)}
                            className="input"
                            value={row.colour1}
                          >
                            <option value=""></option>
                            <option value="GN">GN (Green)</option>
                            <option value="BW">BW (Brown)</option>
                            <option value="GY">GY (Grey)</option>
                            <option value="WH">WH (White)</option>
                            <option value="BK">BK (Black)</option>
                            <option value="YW">YW (Yellow)</option>
                            <option value="RD">RD (Red)</option>
                          </select>
                        </td>
                        <td className={` ${ns ? "hidden" : ""}`}>
                          <select
                            name="colour2"
                            onChange={(e) => handleChange(index, e)}
                            className="input"
                            value={row.colour2}
                          >
                            <option value=""></option>
                            <option value="GN">GN (Green)</option>
                            <option value="BW">BW (Brown)</option>
                            <option value="GY">GY (Grey)</option>
                            <option value="WH">WH (White)</option>
                            <option value="BK">BK (Black)</option>
                            <option value="YW">YW (Yellow)</option>
                            <option value="RD">RD (Red)</option>
                          </select>
                        </td>
                        <td className={` ${ns ? "hidden" : ""}`}>
                          <select
                            name="colour3"
                            onChange={(e) => handleChange(index, e)}
                            className="input"
                            value={row.colour3}
                          >
                            <option value=""></option>
                            <option value="GN">GN (Green)</option>
                            <option value="BW">BW (Brown)</option>
                            <option value="GY">GY (Grey)</option>
                            <option value="WH">WH (White)</option>
                            <option value="BK">BK (Black)</option>
                            <option value="YW">YW (Yellow)</option>
                            <option value="RD">RD (Red)</option>
                          </select>
                        </td>
                        <td className={` ${ns ? "hidden" : ""}`}>
                          <input
                            name="primary"
                            value={row.primary}
                            onChange={(e) => handleChange(index, e)}
                            className="input"
                          />
                        </td>
                        <td className={` ${ns ? "hidden" : ""}`}>
                          <input
                            name="secondary"
                            value={row.secondary}
                            onChange={(e) => handleChange(index, e)}
                            className="input"
                          />
                        </td>
                        <td className={` ${ns ? "hidden" : ""}`}>
                          <input
                            name="alterationType"
                            value={row.alterationType}
                            onChange={(e) => handleChange(index, e)}
                            className="input"
                          />
                        </td>
                        <td className={` ${ns ? "hidden" : ""}`}>
                          <input
                            name="alterationIntensity"
                            value={row.alterationIntensity}
                            onChange={(e) => handleChange(index, e)}
                            className="input"
                          />
                        </td>
                        <td className={` ${ns ? "hidden" : ""}`}>
                          <input
                            name="quartzType"
                            value={row.quartzType}
                            onChange={(e) => handleChange(index, e)}
                            className="input"
                          />
                        </td>
                        <td className={` ${ns ? "hidden" : ""}`}>
                          <input
                            name="intensity"
                            value={row.intensity}
                            onChange={(e) => handleChange(index, e)}
                            className="input"
                          />
                        </td>
                        <td className={` ${ns ? "hidden" : ""}`}>
                          <input
                            className="flex justify-center text-center w-full"
                            type="checkbox"
                            name="dry"
                            checked={row.dry}
                            onChange={(e) => handleChange(index, e)}
                          />
                        </td>
                        <td className={` ${ns ? "hidden" : ""}`}>
                          <input
                            className="flex justify-center text-center w-full"
                            type="checkbox"
                            name="moist"
                            checked={row.moist}
                            onChange={(e) => handleChange(index, e)}
                          />
                        </td>
                        <td className={` ${ns ? "hidden" : ""}`}>
                          <input
                            className="flex justify-center text-center w-full"
                            type="checkbox"
                            name="wet"
                            checked={row.wet}
                            onChange={(e) => handleChange(index, e)}
                          />
                        </td>
                        <td className={` ${ns ? "hidden" : ""}`}>
                          <input
                            name="actualKg"
                            value={row.actualKg}
                            onChange={(e) => handleChange(index, e)}
                            className="input"
                          />
                        </td>
                        <td className={` ${ns ? "hidden" : ""}`}>
                          <input
                            name="planKg"
                            value={row.planKg}
                            onChange={(e) => handleChange(index, e)}
                            className=" cursor-no-drop bg-white flex text-center rounded-none text-gray-500"
                            disabled
                          />
                        </td>
                        <td className={` ${ns ? "hidden" : ""}`}>
                          <input
                            name="sulphideType"
                            value={row.sulphideType}
                            onChange={(e) => handleChange(index, e)}
                            className="input"
                          />
                        </td>
                        <td className={` ${ns ? "hidden" : ""}`}>
                          <input
                            name="sulphidePercent"
                            value={row.sulphidePercent}
                            onChange={(e) => handleChange(index, e)}
                            className="input"
                          />
                        </td>
                        <td className={` ${ns ? "hidden" : ""}`}>
                          <input
                            className="flex justify-center text-center w-full"
                            type="checkbox"
                            name="oxideWeak"
                            checked={row.oxideWeak}
                            onChange={(e) => handleChange(index, e)}
                          />
                        </td>
                        <td className={` ${ns ? "hidden" : ""}`}>
                          <input
                            className="flex justify-center text-center w-full"
                            type="checkbox"
                            name="oxideMedium"
                            checked={row.oxideMedium}
                            onChange={(e) => handleChange(index, e)}
                          />
                        </td>
                        <td className={` ${ns ? "hidden" : ""}`}>
                          <input
                            className="flex justify-center text-center w-full"
                            type="checkbox"
                            name="oxideStrong"
                            checked={row.oxideStrong}
                            onChange={(e) => handleChange(index, e)}
                          />
                        </td>
                        <td className={` ${ns ? "hidden" : ""}`}>
                          <input
                            className="input"
                            type="text"
                            name="comments"
                            value={row.comments}
                            onChange={(e) => handleChange(index, e)}
                          />
                        </td>
                      </tr>
                    </tbody>
                  ))}
              </table>
            </div>
          </div>

          <div className="sticky flex gap-3 bottom-0 bg-white w-full justify-end p-4 border-t">
            <button type="submit" className="btn btn-simpan">
              Simpan
            </button>
            <button
              type="button"
              onClick={() => setIsOpenModalAdd(false)}
              className="btn btn-batal"
            >
              Batal
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddSampleModal;
