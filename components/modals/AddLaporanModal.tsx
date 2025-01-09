import React, { useState } from "react";
import axios from "axios";
import Config from "@/lib/config";

const AddLaporanModal = ({ setIsOpenModalAdd, getLaporan }) => {
  const [formData, setFormData] = useState({
    propHoleID: "",
    project: "",
    prospect: "",
    holeID: "",
    timeStart: "",
    timeFinish: "",
    northingProp: "",
    eastingProp: "",
    cow: "",
    rigNo: "",
    dateStart: "",
    dateFinish: "",
    collarAzimuth: "",
    collarDip: "",
    rl: "",
    northingHoleID: "",
    eastingHoleID: "",
    loggedBy: "",
    dateLogged: "",
    checkedBy: "",
    dateChecked: "",
    page: "",
    sampleID: "",
    from: "",
    to: "",
    color: "",
    primary: "",
    secondary: "",
    quartzType: "",
    intensity: "",
    dry: false,
    moist: false,
    wet: false,
    actualKg: "",
    planKg: "",
    sulphideType: "",
    sulphidePercent: "",
    oxideWeak: false,
    oxideMedium: false,
    oxideStrong: false,
    // Tambahkan field lain di sini jika diperlukan
  });

  // Fungsi untuk menangani perubahan input
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Fungsi untuk submit data
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${Config.ipPUBLIC}/laporan`, formData);
      setIsOpenModalAdd(false);
      getLaporan(); // Memperbarui daftar laporan setelah menambah
    } catch (error) {
      console.error(error);
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
        className="relarive w-full max-w-2xl bg-white overflow-y-auto rounded-lg shadow-lg"
      >
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
          <div className="p-4 space-y-4 overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
              <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                  <th colSpan={3}>general info</th>
                  <th
                    rowSpan={2}
                    className="py-3 px-6 text-center border border-gray-300"
                  >
                    NS
                  </th>
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
                    Sample Condition
                  </th>
                  <th
                    colSpan={2}
                    className="py-3 px-6 text-center border border-gray-300"
                  >
                    Sample Weight
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
                    Oxida
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
                <tr>
                  <td>
                    <input
                      name="sampleID"
                      value={formData.sampleID}
                      onChange={handleChange}
                      className="input"
                    />
                  </td>
                  <td>
                    <input
                      name="from"
                      value={formData.from}
                      onChange={handleChange}
                      className="input"
                    />
                  </td>
                  <td>
                    <input
                      name="to"
                      value={formData.to}
                      onChange={handleChange}
                      className="input"
                    />
                  </td>
                  <td>
                    <input
                      name="color"
                      value={formData.color}
                      onChange={handleChange}
                      className="input"
                    />
                  </td>
                  <td>
                    <input
                      name="primary"
                      value={formData.primary}
                      onChange={handleChange}
                      className="input"
                    />
                  </td>
                  <td>
                    <input
                      name="secondary"
                      value={formData.secondary}
                      onChange={handleChange}
                      className="input"
                    />
                  </td>
                  <td>
                    <input
                      name="quartzType"
                      value={formData.quartzType}
                      onChange={handleChange}
                      className="input"
                    />
                  </td>
                  <td>
                    <input
                      name="intensity"
                      value={formData.intensity}
                      onChange={handleChange}
                      className="input"
                    />
                  </td>
                  <td>
                    <input
                      className="flex justify-center text-center w-full"
                      type="checkbox"
                      name="dry"
                      checked={formData.dry}
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <input
                      className="flex justify-center text-center w-full"
                      type="checkbox"
                      name="moist"
                      checked={formData.moist}
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <input
                      className="flex justify-center text-center w-full"
                      type="checkbox"
                      name="wet"
                      checked={formData.wet}
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <input
                      name="actualKg"
                      value={formData.actualKg}
                      onChange={handleChange}
                      className="input"
                    />
                  </td>
                  <td>
                    <input
                      name="planKg"
                      value={formData.planKg}
                      onChange={handleChange}
                      className="input"
                    />
                  </td>
                  <td>
                    <input
                      name="sulphideType"
                      value={formData.sulphideType}
                      onChange={handleChange}
                      className="input"
                    />
                  </td>
                  <td>
                    <input
                      name="sulphidePercent"
                      value={formData.sulphidePercent}
                      onChange={handleChange}
                      className="input"
                    />
                  </td>
                  <td>
                    <input
                      className="flex justify-center text-center w-full"
                      type="checkbox"
                      name="oxideWeak"
                      checked={formData.oxideWeak}
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <input
                      className="flex justify-center text-center w-full"
                      type="checkbox"
                      name="oxideMedium"
                      checked={formData.oxideMedium}
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <input
                      className="flex justify-center text-center w-full"
                      type="checkbox"
                      name="oxideStrong"
                      checked={formData.oxideStrong}
                      onChange={handleChange}
                    />
                  </td>
                </tr>
              </tbody>
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
      </form>
    </div>
  );
};

export default AddLaporanModal;
