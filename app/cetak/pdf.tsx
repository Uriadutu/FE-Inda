import React from "react";
const Print = React.forwardRef(({ laporanData }, ref) => {

  return (
    <div ref={ref} className="p-10 w-full relative h-[100vh]">
      <div className="flex-items-center">
        <div className="flex justify-between p-2 border border-black gap-4">
          {laporanData && (
            <>
              <div className="mr-10">
                <ul className="text-justify">
                  <li>Prop.Hole ID: {laporanData.propHoleID}</li>
                  <li>PROJECT: {laporanData.project}</li>
                  <li>PROSPECT: {laporanData.prospect}</li>
                  <li>HOLE_ID: {laporanData.holeID}</li>
                  <li>Time Start: {laporanData.timeStart}</li>
                  <li>Time Finish: {laporanData.timeFinish}</li>
                </ul>
              </div>
              <div className="mr-10">
                <ul className="text-justify">
                  <li>NORTHING Prop: {laporanData.northingProp}</li>
                  <li>EASTHING Prop: {laporanData.eastingProp}</li>
                  <li>CoW: {laporanData.cow}</li>
                  <li>Rig. No: {laporanData.rigNo}</li>
                  <li>Date Start: {laporanData.dateStart}</li>
                  <li>Date Finish: {laporanData.dateFinish}</li>
                </ul>
              </div>
              <div className="mr-10">
                <ul className="text-justify">
                  <li>COLLAR AZIMUTH: {laporanData.collarAzimuth}</li>
                  <li>COLLAR DIP: {laporanData.collarDip}</li>
                  <li>RL: {laporanData.rl}</li>
                  <li>NORTHING Hole.ID: {laporanData.northingHoleID}</li>
                  <li>EASTHING Hole.ID: {laporanData.eastingHoleID}</li>
                </ul>
              </div>
              <div className="mr-10">
                <ul className="text-justify">
                  <li>LOGGED BY: {laporanData.loggedBy}</li>
                  <li>DATE: {laporanData.dateLogged}</li>
                  <li>CHECKED BY: {laporanData.checkedBy}</li>
                  <li>DATE CHECKED: {laporanData.dateChecked}</li>
                  <li>PAGE: {laporanData.page}</li>
                </ul>
              </div>
            </>
          )}
        </div>
        <div className="overflow-x-auto w-full mt-6">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th colSpan={3}>General Info</th>
                <th
                  rowSpan={2}
                  className="py-3 px-6 text-center bg-gray-200 border border-gray-300"
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
              <tr className="border border-gray-300">
                <td className="py-3 px-6 text-center border border-gray-300">
                  {laporanData.sampleID}
                </td>
                <td className="py-3 px-6 text-center border border-gray-300">
                  {laporanData.from}
                </td>
                <td className="py-3 px-6 text-center border border-gray-300">
                  {laporanData.to}
                </td>
                <td className="py-3 px-6 text-center border border-gray-300">
                  {laporanData.color}
                </td>
                <td className="py-3 px-6 text-center border border-gray-300">
                  {laporanData.primary}
                </td>
                <td className="py-3 px-6 text-center border border-gray-300">
                  {laporanData.secondary}
                </td>
                <td className="py-3 px-6 text-center border border-gray-300">
                  {laporanData.quartzType}
                </td>
                <td className="py-3 px-6 text-center border border-gray-300">
                  {laporanData.intensity}
                </td>
                <td className="py-3 px-6 text-center border border-gray-300">
                  {laporanData.dry ? "✓" : "-"}
                </td>
                <td className="py-3 px-6 text-center border border-gray-300">
                  {laporanData.moist ?  "✓" : "-"}
                </td>
                <td className="py-3 px-6 text-center border border-gray-300">
                  {laporanData.wet ?  "✓" : "-"}
                </td>
                <td className="py-3 px-6 text-center border border-gray-300">
                  {laporanData.actualKg}
                </td>
                <td className="py-3 px-6 text-center border border-gray-300">
                  {laporanData.planKg}
                </td>
                <td className="py-3 px-6 text-center border border-gray-300">
                  {laporanData.sulphideType}
                </td>
                <td className="py-3 px-6 text-center border border-gray-300">
                  {laporanData.sulphidePercent}
                </td>
                <td className="py-3 px-6 text-center border border-gray-300">
                  {laporanData.oxideWeak ?  "✓" : "-"}
                </td>
                <td className="py-3 px-6 text-center border border-gray-300">
                  {laporanData.oxideMedium ?  "✓" : "-"}
                </td>
                <td className="py-3 px-6 text-center border border-gray-300">
                  {laporanData.oxideStrong ?  "✓" : "-"}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
});

export default Print;
