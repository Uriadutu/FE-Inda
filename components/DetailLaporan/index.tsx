"use client";
import { motion } from "framer-motion";
import React, { useState } from "react";
import Config from "@/lib/config";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import ReactPaginate from "react-paginate";

const DetailLaporan = () => {
  return (
    <>
      <div className="flex-col p-4 md:p-8">
        {/* <!-- Navbar --> */}
        {/* <!-- Navbar End --> */}

        {/* <!-- Content --> */}
        <div className="flex flex-col items-center">
          <div className="w-full max-w-6xl flex flex-col items-center">
            <div className="w-full">
              <div className="flex flex-col items-center">
                <div className="px-5 pt-5 pb-2 mb-1">
                  <div className="headerprint w-full flex  items-center p-3 border-b-2 border-black">
                    <div className="text-center">
                      <h1 className="text-lg font-bold">
                        TOKA TINDUNG PROJECT
                      </h1>
                    </div>
                  </div>
                  <div className="flex justify-center mt-5 mb-10">
                    <h1 className="font-bold text-xl text-center">
                      RCGC DRILL LOG SHEET
                    </h1>
                  </div>
                </div>

                <div className="flex flex-wrap justify-center border-2 border-black p-2 gap-4">
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
    </>
  );
};

export default DetailLaporan;
