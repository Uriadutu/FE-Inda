import React, { useState } from "react";
import axios from "axios";
import Config from "@/lib/config";
import { useParams } from "next/navigation";

const AddSumaryModal = ({ setIsOpenModalAdd, getSumary }) => {
  const [holeID, setHoleID] = useState("");
  const [proposedID, setProposedID] = useState("");
  const [depth, setDepth] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [totalMeter, setTotalMeter] = useState("");
  const [sampleNS, setSampleNS] = useState("");
  const [dip, setDip] = useState("");
  const [azimuth, setAzimuth] = useState("");
  const [sampleIdFrom, setSampleIdFrom] = useState("");
  const [sampleIdTo, setSampleIdTo] = useState("");
  const [comment, setComment] = useState("");
  const [propHoleID, setPropHoleID] = useState("");
  const [project, setProject] = useState("");
  const [prospect, setProspect] = useState("");
  const [timeStart, setTimeStart] = useState("");
  const [timeFinish, setTimeFinish] = useState("");
  const [northingProp, setNorthingProp] = useState("");
  const [eastingProp, setEastingProp] = useState("");
  const [cow, setCow] = useState("");
  const [rigNo, setRigNo] = useState("");
  const [dateStart, setDateStart] = useState("");
  const [dateFinish, setDateFinish] = useState("");
  const [collarAzimuth, setCollarAzimuth] = useState("");
  const [collarDip, setCollarDip] = useState("");
  const [rl, setRl] = useState("");
  const [northingHoleID, setNorthingHoleID] = useState("");
  const [eastingHoleID, setEastingHoleID] = useState("");
  const {tgl, namalubang} = useParams();


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${Config.ipPUBLIC}/sumary`, {
        holeID,
        by_tgl : tgl,
        proposedID,
        depth,
        namalubang,
        from,
        to,
        total_meter: totalMeter,
        sample_ns: sampleNS,
        dip,
        azimuth,
        sampleid_from: sampleIdFrom,
        sampleid_to: sampleIdTo,
        comment,
        propHoleID,
        project,
        prospect,
        timeStart,
        timeFinish,
        northingProp,
        eastingProp,
        cow,
        rigNo,
        dateStart,
        dateFinish,
        collarAzimuth,
        collarDip,
        rl,
        northingHoleID,
        eastingHoleID,
      });

      setIsOpenModalAdd(false);
      getSumary(); // Refresh data setelah menambahkan
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      id="default-modal"
      tabIndex="-1"
      aria-hidden="true"
      className="fixed inset-0 flex items-center justify-center bg-gray-500 z-top bg-opacity-30"
    >
      <form
        onSubmit={handleSubmit}
        className="relative bg-white h-[80%] overflow-y-auto rounded-lg shadow-lg"
      >
        <div className="w-full max-w-lg bg-white rounded-lg shadow-lg">
          <div className="flex items-center justify-between p-4 border-b rounded-t">
            <h3 className="text-xl font-semibold text-gray-900">
              Tambah Data Sumary
            </h3>
            <button
              onClick={() => setIsOpenModalAdd(false)}
              type="button"
              className="inline-flex items-center justify-center w-8 h-8 text-sm text-gray-400 bg-transparent rounded-lg hover:bg-gray-200 hover:text-gray-900 ms-auto"
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
            {[
              { label: "Hole ID", value: holeID, setter: setHoleID, type : "text" },
              { label: "Proposed ID", value: proposedID, setter: setProposedID, type : "text" },
              { label: "Depth", value: depth, setter: setDepth, type : "text" },
              { label: "From", value: from, setter: setFrom, type : "text" },
              { label: "To", value: to, setter: setTo, type : "text" },
              { label: "Total Meter", value: totalMeter, setter: setTotalMeter, type : "text" },
              { label: "Sample NS", value: sampleNS, setter: setSampleNS, type : "text" },
              { label: "Dip", value: dip, setter: setDip, type : "text" },
              { label: "Azimuth", value: azimuth, setter: setAzimuth, type : "text" },
              { label: "Sample ID From", value: sampleIdFrom, setter: setSampleIdFrom , type : "text"},
              { label: "Sample ID To", value: sampleIdTo, setter: setSampleIdTo , type : "text"},
              { label: "Comment", value: comment, setter: setComment, type : "text" },
              { label: "Prop Hole ID", value: propHoleID, setter: setPropHoleID, type : "text" },
              { label: "Project", value: project, setter: setProject, type : "text" },
              { label: "Prospect", value: prospect, setter: setProspect, type : "text" },
              { label: "Time Start", value: timeStart, setter: setTimeStart, type : "time" },
              { label: "Time Finish", value: timeFinish, setter: setTimeFinish, type : "time" },
              { label: "Northing Prop", value: northingProp, setter: setNorthingProp, type : "text" },
              { label: "Easting Prop", value: eastingProp, setter: setEastingProp, type : "text" },
              { label: "CoW", value: cow, setter: setCow, type : "text" },
              { label: "Rig No", value: rigNo, setter: setRigNo, type : "text" },
              { label: "Date Start", value: dateStart, setter: setDateStart, type : "date" },
              { label: "Date Finish", value: dateFinish, setter: setDateFinish, type : "date" },
              { label: "Collar Azimuth", value: collarAzimuth, setter: setCollarAzimuth, type : "text" },
              { label: "Collar Dip", value: collarDip, setter: setCollarDip, type : "text" },
              { label: "RL", value: rl, setter: setRl, type : "text" },
              { label: "Northing Hole ID", value: northingHoleID, setter: setNorthingHoleID, type : "text" },
              { label: "Easting Hole ID", value: eastingHoleID, setter: setEastingHoleID , type : "text"},
            ].map(({ label, value, setter, type }, idx) => (
              <div key={idx}>
                <label htmlFor={label} className="label-input">
                  {label}
                </label>
                <input
                  value={value}
                  onChange={(e) => setter(e.target.value)}
                  type={type}
                  id={label}
                  className="w-full input"
                />
              </div>
            ))}
          </div>
          <div className="flex items-center justify-end p-4 space-x-3 border-t border-gray-200 rounded-b">
            <button type="submit" className="btn btn-simpan">
              Simpan
            </button>
            <button
              onClick={() => setIsOpenModalAdd(false)}
              type="button"
              className="btn-batal"
            >
              Batal
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddSumaryModal;
