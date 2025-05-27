import React, { useEffect, useState } from "react";
import axios from "axios";
import Config from "@/lib/config";
import { useParams } from "next/navigation";

const EditSampleModal = ({
  setIsOpenModalEdit,
  data,
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
  const [samples, setSamples] = useState([]);
  const [holeID, setHoleID] = useState("");
  const [sampleID, setSampleID] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [colour1, setColour1] = useState("");
  const [colour2, setColour2] = useState("");
  const [colour3, setColour3] = useState("");
  const [primary, setPrimary] = useState("");
  const [secondary, setSecondary] = useState("");
  const [alterationType, setAlterationType] = useState("");
  const [alterationIntensity, setAlterationIntensity] = useState("");
  const [quartzType, setQuartzType] = useState("");
  const [intensity, setIntensity] = useState("");
  const [dry, setDry] = useState("");
  const [moist, setMoist] = useState("");
  const [wet, setWet] = useState("");
  const [actualKg, setActualKg] = useState("");
  const [planKg, setPlanKg] = useState("");
  const [sulphideType, setSulphideType] = useState("");
  const [sulphidePercent, setSulphidePercent] = useState("");
  const [oxideWeak, setOxideWeak] = useState("");
  const [oxideMedium, setOxideMedium] = useState("");
  const [oxideStrong, setOxideStrong] = useState("");
  const [comments, setComments] = useState("");

  const { tgl, namalubang } = useParams();


  useEffect(() => {
    const getSampleById = async () => {
      try {
        const response = await axios.get(`${Config.ipPUBLIC}/samples/${data}`);
        const sample = response.data;

        setSampleID(sample.sampleID);
        setFrom(sample.from);
        setTo(sample.to);
        setColour1(sample.colour1);
        setColour2(sample.colour2);
        setColour3(sample.colour3);
        setPrimary(sample.primary);
        setSecondary(sample.secondary);
        setAlterationType(sample.alterationType);
        setAlterationIntensity(sample.alterationIntensity);
        setQuartzType(sample.quartzType);
        setIntensity(sample.intensity);
        setDry(sample.dry);
        setMoist(sample.moist);
        setWet(sample.wet);
        setActualKg(sample.actualKg);
        setPlanKg(sample.planKg);
        setSulphideType(sample.sulphideType);
        setSulphidePercent(sample.sulphidePercent);
        setOxideWeak(sample.oxideWeak);
        setOxideMedium(sample.oxideMedium);
        setOxideStrong(sample.oxideStrong);
        setComments(sample.comments);
      } catch (error) {
        console.error("Error fetching sample data:", error);
      }
    };

    if (data) getSampleById();
  }, [data]);

  const [formRows, setFormRows] = useState(() => {
    const count = sampleIDTo - sampleIDFrom + 1;
    const rows = [];

    for (let i = 0; i < count; i++) {
      rows.push({
        ...initialFormRow,
        sampleID: sampleIDFrom + i,
        from: fromFrom + i,
        to: toFrom + i,
      });
    }

    return rows;
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.patch(`${Config.ipPUBLIC}/samples/${data}`, {
        sampleID,
        from,
        to,
        colour1,
        colour2,
        colour3,
        primary,
        secondary,
        alterationType,
        alterationIntensity,
        quartzType,
        intensity,
        dry,
        moist,
        wet,
        actualKg,
        planKg,
        sulphideType,
        sulphidePercent,
        oxideWeak,
        oxideMedium,
        oxideStrong,
        comments,
        status : "pending"
      });

      alert("Berhasil mengedit data");
      getLaporan();
      setIsOpenModalEdit(false);
    } catch (error) {
      console.error("Gagal mengirim data:", error);
      alert("Terjadi kesalahan saat mengedit data.");
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
              onClick={() => setIsOpenModalEdit(false)}
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
                <tbody className=" ">
                  <tr>
                    <td>
                      <input
                        name="sampleID"
                        type="number"
                        value={sampleID}
                        onChange={(e) => setSampleID(e.target.value)}
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
                        value={from}
                        onChange={(e) => setFrom(e.target.value)}
                        className="input"
                        min={fromFrom}
                        max={fromTo}
                        disabled
                      />
                    </td>
                    <td>
                      <input
                        name="to"
                        type="number"
                        value={to}
                        onChange={(e) => setTo(e.target.value)}
                        className="input"
                        min={toFrom}
                        max={toTo}
                        disabled
                      />
                    </td>
                    <td className={`${ns ? "hidden" : ""}`}>
                      <select
                        name="colour1"
                        value={colour1}
                        onChange={(e) => setColour1(e.target.value)}
                        className="input"
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
                    <td className={`${ns ? "hidden" : ""}`}>
                      <select
                        name="colour2"
                        value={colour2}
                        onChange={(e) => setColour2(e.target.value)}
                        className="input"
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
                    <td className={`${ns ? "hidden" : ""}`}>
                      <select
                        name="colour3"
                        value={colour3}
                        onChange={(e) => setColour3(e.target.value)}
                        className="input"
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
                    <td className={`${ns ? "hidden" : ""}`}>
                      <input
                        name="primary"
                        value={primary}
                        onChange={(e) => setPrimary(e.target.value)}
                        className="input"
                      />
                    </td>
                    <td className={`${ns ? "hidden" : ""}`}>
                      <input
                        name="secondary"
                        value={secondary}
                        onChange={(e) => setSecondary(e.target.value)}
                        className="input"
                      />
                    </td>
                    <td className={`${ns ? "hidden" : ""}`}>
                      <input
                        name="alterationType"
                        value={alterationType}
                        onChange={(e) => setAlterationType(e.target.value)}
                        className="input"
                      />
                    </td>
                    <td className={`${ns ? "hidden" : ""}`}>
                      <input
                        name="alterationIntensity"
                        value={alterationIntensity}
                        onChange={(e) => setAlterationIntensity(e.target.value)}
                        className="input"
                      />
                    </td>
                    <td className={`${ns ? "hidden" : ""}`}>
                      <input
                        name="quartzType"
                        value={quartzType}
                        onChange={(e) => setQuartzType(e.target.value)}
                        className="input"
                      />
                    </td>
                    <td className={`${ns ? "hidden" : ""}`}>
                      <input
                        name="intensity"
                        value={intensity}
                        onChange={(e) => setIntensity(e.target.value)}
                        className="input"
                      />
                    </td>
                    <td className={`${ns ? "hidden" : ""}`}>
                      <input
                        type="checkbox"
                        name="dry"
                        checked={dry}
                        onChange={(e) => setDry(e.target.checked)}
                        className="flex justify-center text-center w-full"
                      />
                    </td>
                    <td className={`${ns ? "hidden" : ""}`}>
                      <input
                        type="checkbox"
                        name="moist"
                        checked={moist}
                        onChange={(e) => setMoist(e.target.checked)}
                        className="flex justify-center text-center w-full"
                      />
                    </td>
                    <td className={`${ns ? "hidden" : ""}`}>
                      <input
                        type="checkbox"
                        name="wet"
                        checked={wet}
                        onChange={(e) => setWet(e.target.checked)}
                        className="flex justify-center text-center w-full"
                      />
                    </td>
                    <td className={`${ns ? "hidden" : ""}`}>
                      <input
                        name="actualKg"
                        value={actualKg}
                        onChange={(e) => setActualKg(e.target.value)}
                        className="input"
                      />
                    </td>
                    <td className={`${ns ? "hidden" : ""}`}>
                      <input
                        name="planKg"
                        value={planKg}
                        onChange={(e) => setPlanKg(e.target.value)}
                        className=" cursor-no-drop bg-white flex text-center rounded-none text-gray-500"
                        disabled
                      />
                    </td>
                    <td className={`${ns ? "hidden" : ""}`}>
                      <input
                        name="sulphideType"
                        value={sulphideType}
                        onChange={(e) => setSulphideType(e.target.value)}
                        className="input"
                      />
                    </td>
                    <td className={`${ns ? "hidden" : ""}`}>
                      <input
                        name="sulphidePercent"
                        value={sulphidePercent}
                        onChange={(e) => setSulphidePercent(e.target.value)}
                        className="input"
                      />
                    </td>
                    <td className={`${ns ? "hidden" : ""}`}>
                      <input
                        type="checkbox"
                        name="oxideWeak"
                        checked={oxideWeak}
                        onChange={(e) => setOxideWeak(e.target.checked)}
                        className="flex justify-center text-center w-full"
                      />
                    </td>
                    <td className={`${ns ? "hidden" : ""}`}>
                      <input
                        type="checkbox"
                        name="oxideMedium"
                        checked={oxideMedium}
                        onChange={(e) => setOxideMedium(e.target.checked)}
                        className="flex justify-center text-center w-full"
                      />
                    </td>
                    <td className={`${ns ? "hidden" : ""}`}>
                      <input
                        type="checkbox"
                        name="oxideStrong"
                        checked={oxideStrong}
                        onChange={(e) => setOxideStrong(e.target.checked)}
                        className="flex justify-center text-center w-full"
                      />
                    </td>
                    <td className={`${ns ? "hidden" : ""}`}>
                      <input
                        name="comments"
                        value={comments}
                        onChange={(e) => setComments(e.target.value)}
                        className="input"
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
              onClick={() => setIsOpenModalEdit(false)}
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

export default EditSampleModal;
