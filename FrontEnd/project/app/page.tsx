"use client";
import { useState, useEffect } from "react";
import "./globals.css"; // ✅ Import Tailwind styles
import Image from "next/image";

// Import API function
import { Main_AED_inMonth, Main_Power_inDay, Main_Power_inYesterday } from "./api/powerMonitoring_route";

// Components
import ShowRealTime from "../components/showTime";
import { Chart_AED_inDay } from "../components/chart";

function Page() {
  const [AED_inMonth, setAED_inMonth] = useState<number | null>(null);
  const [chartPowerToday, setChartPowerToday] = useState<{ time: string; value: number }[]>([]);
  const [chartPowerYesterday, setChartPowerYesterday] = useState<{ time: string; value: number }[]>([]);

  useEffect(() => {
    const getData = async () => {
      const powerData = await Main_AED_inMonth();
      setAED_inMonth(powerData);

      const todayData = await Main_Power_inDay();
      const yesterdayData = await Main_Power_inYesterday();

      if (todayData) setChartPowerToday(todayData);
      if (yesterdayData) setChartPowerYesterday(yesterdayData);
    };

    getData();
    const interval = setInterval(getData, 60000);

    return () => clearInterval(interval);
  }, []);


  return (
    <div className="p-4 sm:ml-64">
      <div className="my-4 justify-self-end">
        <ShowRealTime />
      </div>

      <div className="board">
        <div className="board-layout">
          {/* -------------------------- page - Power Monitoring -------------------------- */}
          <div id="power monitoring" className="note">
            <h1 className="note-topicName"> NFEC Building Energy Profile </h1>

            <div id="note-content">
              {/* -------------< Start >------------- */}

              <div id="TOP">
                <div
                  id="Topic name"
                  className="w-auto m-3 px-3 py-1 justify-self-start bg-Blue_NFED_7 rounded rounded-lg text-lg"
                >
                  Active Energy Delivered
                </div>

                <p className="w-auto m-2 mt-3 px-3 py-1 justify-self-start text-2xl font-poppins">
                  1st-today
                </p>

                <div
                  id="show parameter"
                  className="flex w-full pr-7 justify-end items-baseline gap-3 font-poppins"
                >
                  <p className="text-8xl mainParameter">
                    {AED_inMonth !== null ? AED_inMonth.toLocaleString() : "Loading..."}
                  </p>
                  <p className="text-3xl"> kWh </p>
                </div>
              </div>

              <div id="split line" className="w-11/12 my-3 justify-self-center border-b border-1 border-CU_Gray"></div>

              <div id="BOTTOM">
                <div
                  id="Topic name"
                  className="w-auto mt-5 m-3 px-3 py-1 justify-self-start bg-Blue_NFED_7 rounded rounded-lg text-lg"
                >
                  Daily Energy Accumulation
                </div>
                <div id="graph" className="px-1">
                  <Chart_AED_inDay dataToday={chartPowerToday} dataYesterday={chartPowerYesterday} />
                </div>
              </div>

              {/* -------------< End >------------- */}
            </div>
          </div>

          {/* -------------------------- page - Weather Station -------------------------- */}

          <div id="power monitoring" className="note">
            <h1 className="note-topicName"> NFEC Building Energy Profile </h1>

            <div id="note-content">
              {/* -------------< Start >------------- */}

              <div id="TOP">
                <div
                  id="Topic name"
                  className="w-auto m-3 px-3 py-1 justify-self-start bg-Blue_NFED_7 rounded rounded-lg text-lg"
                >
                  Active Energy Delivered
                </div>

                <p className="w-auto m-2 mt-3 px-3 py-1 justify-self-start text-2xl font-poppins">
                  1st-today
                </p>

                <div
                  id="show parameter"
                  className="flex w-full pr-7 justify-end items-baseline gap-3 font-poppins"
                >

                  <div>
                    <Image alt="NFED Logo" src="/Weather-03.png" className="h-40 w-auto " width={5000} height={5000} priority />
                  </div>
                  
                  <p className="text-8xl mainParameter">
                    test
                  </p>

                  <p className="text-3xl"> C </p>

                </div>

                
              </div>


              

              {/* -------------< End >------------- */}
            </div>
          </div>


          <div
            id="weather station"
            className="note"
          >
            <p className="text-2xl text-gray-400 dark:text-gray-500">+</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;