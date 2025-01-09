import DetailLaporan from '@/components/DetailLaporan'
import React from 'react'

const page = () => {
  return (
    <div className='pt-20 w-full'>
      <DetailLaporan/>
      <div className="flex items-center">
          <div className="w-full items-center">
            <div className="w-full">
              <div className="flex-items-center">

                <div className="flex justify-between p-2 border border-black gap-4">
                  <div className="mr-10">
                    <ul className="text-justify">
                      <li>Prop.Hole ID : asjdbjasjbd</li>
                      <li>PROJECT :</li>
                      <li>PROSPECT :</li>
                      <li>HOLE_ID :</li>
                      <li>Time Start :</li>
                      <li>Time Finish :</li>
                    </ul>
                  </div>
                  <div className="mr-10">
                    <ul className="text-justify">
                      <li>NORTHING Prop : dafsdfsdf</li>
                      <li>EASTHING Prop :</li>
                      <li>CoW :</li>
                      <li>Rig. No :</li>
                      <li>Date Start :</li>
                      <li>Date Finish :</li>
                    </ul>
                  </div>
                  <div className="mr-10">
                    <ul className="text-justify">
                      <li>COLLAR AZIMUTH : sdfsdfsd</li>
                      <li>COLLAR DIP</li>
                      <li>RL :</li>
                      <li>NORTHING Hole.ID :</li>
                      <li>EASTHING Hole.ID :</li>
                    </ul>
                  </div>
                  <div className="mr-10">
                    <ul className="text-justify">
                      <li>LOGGED BY : sdfsdfsd</li>
                      <li>DATE :</li>
                      <li>CHECKED BY :</li>
                      <li>DATE :</li>
                      <li>PAGE :</li>
                    </ul>
                  </div>
                </div>
                <div className="overflow-x-auto w-full mt-6">
                  <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
                    <thead>
                      <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                        <th colSpan={3}>
                        general info
                        </th>
                        <th rowSpan={2} className="py-3 px-6 text-center border border-gray-300">Color</th>
                        <th colSpan={2} className="py-3 px-6 text-center border border-gray-300">Lithology Type</th>
                        <th colSpan={2} className="py-3 px-6 text-center border border-gray-300">Quartz</th>
                        <th colSpan={3} className="py-3 px-6 text-center border border-gray-300">Sample Condition</th>
                        <th colSpan={2} className="py-3 px-6 text-center border border-gray-300">Sample Weight</th>
                        <th colSpan={2} className="py-3 px-6 text-center border border-gray-300">Sulphide</th>
                        <th colSpan={3} className="py-3 px-6 text-center border border-gray-300">Oxida</th>
                      </tr>
                      <tr>
                        <th className="py-3 px-6 text-center border border-gray-300 bg-gray-200" >Sample ID</th>
                        <th className="py-3 px-6 text-center border border-gray-300 bg-gray-200" >From</th>
                        <th className="py-3 px-6 text-center border border-gray-300 bg-gray-200" >To</th>
                        <th className="py-3 px-6 text-center border border-gray-300 bg-gray-200" >Primary</th>
                        <th className="py-3 px-6 text-center border border-gray-300 bg-gray-200" >Secondary</th>
                        <th className="py-3 px-6 text-center border border-gray-300 bg-gray-200" >Type</th>
                        <th className="py-3 px-6 text-center border border-gray-300 bg-gray-200" >Intensity</th>
                        <th className="py-3 px-6 text-center border border-gray-300 bg-gray-200" >Dry</th>
                        <th className="py-3 px-6 text-center border border-gray-300 bg-gray-200" >Moist</th>
                        <th className="py-3 px-6 text-center border border-gray-300 bg-gray-200" >Wet</th>
                        <th className="py-3 px-6 text-center border border-gray-300 bg-gray-200" >Actual (kg)</th>
                        <th className="py-3 px-6 text-center border border-gray-300 bg-gray-200" >Plan (kg)</th>
                        <th className="py-3 px-6 text-center border border-gray-300 bg-gray-200" >Type</th>
                        <th className="py-3 px-6 text-center border border-gray-300 bg-gray-200" >%</th>
                        <th className="py-3 px-6 text-center border border-gray-300 bg-gray-200" >Weak</th>
                        <th className="py-3 px-6 text-center border border-gray-300 bg-gray-200" >Medium</th>
                        <th className="py-3 px-6 text-center border border-gray-300 bg-gray-200" >Strong</th>
                      </tr>
                    </thead>
                  </table>
                </div>
              </div>
            </div>
            <button type="submit" className="btn btn-outline btn-accent">
              PDF
            </button>
            <div className="flex justify-center mt-4 mb-10 rounded-sm"></div>
          </div>
        </div>
    </div>
  )
}

export default page
