import React, { useState } from "react";
import axios from "axios";
import Config from "@/lib/config";
const InfoHoleModal = ({ setIsOpenModalInfo, getHoleInfo, holeId}) => {
    const [loggedBy, setLoggedBy] = useState(holeId.loggedBy);
  const [tanggal, setTanggal] = useState(holeId.tanggal);
  const [checkBy, setCheckBy] = useState(holeId.checkBy);
  const [tglCheck, setTglCheck] = useState(holeId.tglCheck);
  const [page, setPage] = useState(holeId.page);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`${Config.ipPUBLIC}/sumary/${holeId.id}`, {
        loggedBy,
        tanggal,
        checkBy,
        tglCheck,
        page,
      });

      getHoleInfo();
      window.location.reload() 
      setIsOpenModalInfo(false);
    } catch (error) {
      console.error("Error updating hole information:", error);
    }
  };

  return (
    <div
      id="info-hole-modal"
      tabIndex="-1"
      aria-hidden="true"
      className="fixed inset-0 flex items-center justify-center bg-gray-500 z-top bg-opacity-30"
    >
      <form
        onSubmit={handleSubmit}
        className="relative  h-[80%] overflow-y-auto bg-white inline rounded-lg shadow-lg"
      >
        <div className="flex items-center justify-between p-4 border-b rounded-t">
          <h3 className="text-xl font-semibold text-gray-900">
            Tambah Informasi Aktivitas Lapangan Drilling
          </h3>
          <button
            onClick={() => setIsOpenModalInfo(false)}
            type="button"
            className="inline-flex items-center justify-center w-8 h-8 text-sm text-gray-400 bg-transparent rounded-lg hover:bg-gray-200 hover:text-gray-900"
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
            <label htmlFor="loggedBy" className="label-input">
              Prop. Hole ID
            </label>
            <input
              value={holeId.propHoleID}
              disabled
              type="text"
              id="loggedBy"
              className="w-full input cursor-no-drop text-gray-400 bg-gray-100"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="loggedBy" className="label-input">
              PROJECT
            </label>
            <input
              value={holeId.project}
              disabled
              type="text"
              id="loggedBy"
              className="w-full input cursor-no-drop text-gray-400 bg-gray-100"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="loggedBy" className="label-input">
              PROSPECT
            </label>
            <input
              value={holeId.prospect}
              disabled
              type="text"
              id="loggedBy"
              className="w-full input cursor-no-drop text-gray-400 bg-gray-100"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="loggedBy" className="label-input">
              HOLE ID
            </label>
            <input
              value={holeId.holeID}
              disabled
              type="text"
              id="loggedBy"
              className="w-full input cursor-no-drop text-gray-400 bg-gray-100"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="loggedBy" className="label-input">
              Time Start
            </label>
            <input
              value={holeId.timeStart}
              disabled
              type="text"
              id="loggedBy"
              className="w-full input cursor-no-drop text-gray-400 bg-gray-100"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="loggedBy" className="label-input">
              Time Finish
            </label>
            <input
              value={holeId.timeFinish}
              disabled
              type="text"
              id="loggedBy"
              className="w-full input cursor-no-drop text-gray-400 bg-gray-100"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="loggedBy" className="label-input">
              NORTHING Prop
            </label>
            <input
              value={holeId.northingProp}
              disabled
              type="text"
              id="loggedBy"
              className="w-full input cursor-no-drop text-gray-400 bg-gray-100"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="loggedBy" className="label-input">
              EASTING Prop
            </label>
            <input
              value={holeId.eastingProp}
              disabled
              type="text"
              id="loggedBy"
              className="w-full input cursor-no-drop text-gray-400 bg-gray-100"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="loggedBy" className="label-input">
              CoW
            </label>
            <input
              value={holeId.cow}
              disabled
              type="text"
              id="loggedBy"
              className="w-full input cursor-no-drop text-gray-400 bg-gray-100"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="loggedBy" className="label-input">
              Rig. No
            </label>
            <input
              value={holeId.rigNo}
              disabled
              type="text"
              id="loggedBy"
              className="w-full input cursor-no-drop text-gray-400 bg-gray-100"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="loggedBy" className="label-input">
              Date Start
            </label>
            <input
              value={holeId.dateStart}
              disabled
              type="text"
              id="loggedBy"
              className="w-full input cursor-no-drop text-gray-400 bg-gray-100"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="loggedBy" className="label-input">
              Date Finish
            </label>
            <input
              value={holeId.dateFinish}
              disabled
              type="text"
              id="loggedBy"
              className="w-full input cursor-no-drop text-gray-400 bg-gray-100"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="loggedBy" className="label-input">
              COLLAR AZIMUTH
            </label>
            <input
              value={holeId.collarAzimuth}
              disabled
              type="text"
              id="loggedBy"
              className="w-full input cursor-no-drop text-gray-400 bg-gray-100"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="loggedBy" className="label-input">
              RL
            </label>
            <input
              value={holeId.rl}
              disabled
              type="text"
              id="loggedBy"
              className="w-full input cursor-no-drop text-gray-400 bg-gray-100"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="loggedBy" className="label-input">
              NORTHING Hole ID
            </label>
            <input
              value={holeId.northingHoleID}
              disabled
              type="text"
              id="loggedBy"
              className="w-full input cursor-no-drop text-gray-400 bg-gray-100"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="loggedBy" className="label-input">
              EASTING Hole ID
            </label>
            <input
              value={holeId.eastingHoleID}
              disabled
              type="text"
              id="loggedBy"
              className="w-full input cursor-no-drop text-gray-400 bg-gray-100"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="loggedBy" className="label-input">
              Logged By
            </label>
            <input
              value={loggedBy}
              onChange={(e) => setLoggedBy(e.target.value)}
              type="text"
              id="loggedBy"
              className="w-full input"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="tanggal" className="label-input">
              Tanggal
            </label>
            <input
              value={tanggal}
              onChange={(e) => setTanggal(e.target.value)}
              type="date"
              id="tanggal"
              className="w-full input"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="checkBy" className="label-input">
              Checked By
            </label>
            <input
              value={checkBy}
              onChange={(e) => setCheckBy(e.target.value)}
              type="text"
              id="checkBy"
              className="w-full input"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="tglCheck" className="label-input">
              Tanggal Checked
            </label>
            <input
              value={tglCheck}
              onChange={(e) => setTglCheck(e.target.value)}
              type="date"
              id="tglCheck"
              className="w-full input"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="page" className="label-input">
              Page
            </label>
            <input
              value={page}
              onChange={(e) => setPage(e.target.value)}
              type="text"
              id="page"
              className="w-full input"
            />
          </div>
        </div>
        <div className="flex items-center justify-end p-4 space-x-3 border-t border-gray-200 rounded-b">
          <button type="submit" className="btn btn-simpan">
            Simpan
          </button>
          <button
            onClick={() => setIsOpenModalInfo(false)}
            type="button"
            className="btn-batal"
          >
            Batal
          </button>
        </div>
      </form>
    </div>
  );
};

export default InfoHoleModal;
