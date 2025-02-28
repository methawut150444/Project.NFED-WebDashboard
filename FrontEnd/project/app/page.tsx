"use client";
import { useState, useEffect } from "react";
import "./globals.css"; // ✅ Import Tailwind styles
import Image from "next/image";

// Import API function
import * as API_WeatherStation from "./api/weatherStation_route";
import * as API_PowerMonitoring from "./api/powerMonitoring_route";

// Components
import ShowRealTime from "../components/showTime";
import { Chart_AED_inDay } from "../components/chart";


function Page() {
  // ! useState for Power Monitoring
  const [AED_inMonth, setAED_inMonth] = useState<number | null>(null);
  const [AED_inDay, setAED_inDay] = useState<number | null>(null);
  const [AED_inYesterday, setAED_inYesterday] = useState<number | null>(null);
  const [chartPowerToday, setChartPowerToday] = useState<{ time: string; value: number }[]>([]);
  const [chartPowerYesterday, setChartPowerYesterday] = useState<{ time: string; value: number }[]>([]);

  // ! useState for Weather Station
  const [tempNow, setTempNow] = useState<number | null>(null);
  const [humiNow, setHumiNow] = useState<number | null>(null);
  const [pm25Now, setPM25Now] = useState<number | null>(null);
  const [pm10Now, setPM10Now] = useState<number | null>(null);
  const [windSpeedNow, setWindSpeedNow] = useState<number | null>(null);
  const [aqiData, setAqiData] = useState<{ value: number; image: string; description: string; colorClass: string } | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          month,
          today,
          yesterday,
          powerToday,
          powerYesterday,
          temp,
          humi,
          pm25,
          pm10,
          wind,
          aqi
        ] = await Promise.all([
          API_PowerMonitoring.Main_AED_inMonth(),
          API_PowerMonitoring.Main_AED_inDay(),
          API_PowerMonitoring.Main_AED_inYesterday(),
          API_PowerMonitoring.Main_Power_inDay(),
          API_PowerMonitoring.Main_Power_inYesterday(),
          API_WeatherStation.Temp_now(),
          API_WeatherStation.Humi_now(),
          API_WeatherStation.PM2_5_now(),
          API_WeatherStation.PM10_now(),
          API_WeatherStation.WindSpeed_now(),
          API_WeatherStation.getAQI(),
        ]);

        // todo: Set data to state
        setAED_inMonth(month);
        setAED_inDay(today);
        setAED_inYesterday(yesterday);
        setChartPowerToday(powerToday || []);
        setChartPowerYesterday(powerYesterday || []);
        setTempNow(temp);
        setHumiNow(humi);
        setPM25Now(pm25);
        setPM10Now(pm10);
        setWindSpeedNow(wind);
        setAqiData(aqi);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 60000);

    return () => clearInterval(interval);
  }, []);

  // todo: /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// < UI Interface > 
  return (
    <div className="p-4 sm:ml-64">
      <div className="my-4 justify-self-end">
        <ShowRealTime />
      </div>

      <div className="board">
        <div className="board-layout">
          {/* <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< note - Power Monitoring >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */}
          <div id="power monitoring" className="note">
            <h1 className="note-topicName"> NFED Building Energy Profile </h1>

            <div id="note-content">
              {/* ----------------------------------< Start >---------------------------------- */}

              <div id="TOP" className="flex">
                <div id="TOP L" className="w-1/4 mx-2 justify-items-center"
                >
                  <Image alt="NFED building" src="/img/NFED_building_crop.png" className="h-auto w-auto" width={500} height={500} priority />
                </div>

                <div id="TOP R" className="w-3/4 m-3">
                  <p
                    className="w-auto px-3 py-1 justify-self-start  bg-Blue_NFED_7 rounded rounded-lg text-lg">
                    Active Energy Delivered
                  </p>

                  <div className="flex mx-3 pt-5 pr-5 justify-between items-start">

                    <p className="text-2xl font-poppins">
                      • 1<span style={{ fontSize: "14px", verticalAlign: "super" }}>st</span> - Today
                    </p>

                    <div
                      id="show parameter"
                      className="flex items-baseline justify-end font-poppins gap-3"
                    >

                      <p className="text-8xl mainParameter">
                        {AED_inMonth !== null ? AED_inMonth.toLocaleString() : "Loading..."}
                      </p>
                      <p className="text-3xl"> kWh </p>

                    </div>

                  </div>
                </div>

              </div>

              {/* ////////////////////////////////////////////////////////////////////////// */}
              <div id="split line" className="w-11/12 mb-3 justify-self-center border-b border-1 border-CU_Gray"></div>
              {/* ////////////////////////////////////////////////////////////////////////// */}

              <div id="BOTTOM">
                <div id="BOTTOM T"
                  className="flex mt-5 mx-3 justify-between items-start"
                >
                  <p
                    id="Topic name"
                    className="w-auto px-3 py-1 justify-self-start bg-Blue_NFED_7 rounded rounded-lg text-lg "
                  >
                    Daily Energy Accumulation
                  </p>

                  <div className="w-auto pr-5 text-xl">
                    <div id="today parameter" className="flex gap-2">
                      <p className="text-P_Jumbo_color_0"> • </p>
                      <p> Today: </p>
                      <p className="text-P_Jumbo_color_0"> {AED_inDay !== null ? AED_inDay.toLocaleString() : "Loading..."} kWh</p>
                    </div>
                    <div id="yesterday parameter" className="flex gap-2">
                      <p className="text-CU_Gray"> • </p>
                      <p> Yesterday: </p>
                      <p className="text-CU_Gray"> {AED_inYesterday !== null ? AED_inYesterday.toLocaleString() : "Loading..."} kWh</p>
                    </div>
                  </div>
                </div>

                <div id="BOTTOM B">
                  <div id="graph" className="px-1">
                    <Chart_AED_inDay dataToday={chartPowerToday} dataYesterday={chartPowerYesterday} />
                  </div>

                </div>
              </div>

              {/* ----------------------------------< End >---------------------------------- */}
            </div>
          </div>

          {/* <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< note - Weather Station >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */}

          <div id="weather station" className="note">
            <h1 className="note-topicName"> Weather Station </h1>

            <div id="note-content" className="note-content">
              {/* ----------------------------------< Start >---------------------------------- */}
              <div id="TOP" className="">

                <div id="TOP 1" className="weatherStation-AQI_Block">
                  <div id="TOP 1 L" className="w-1/4 justify-items-center content-center ">
                    <Image
                      alt="AQI quality"
                      src={aqiData?.image || "/img/weatherStation_img/AQI_1.png"}
                      className="h-auto w-auto"
                      width={1000}
                      height={1000}
                      priority
                    />
                  </div>
                  <div id="TOP 1 R" className="w-3/4 flex justify-evenly items-center gap-x-8 py-8">
                    <div id="AQI Value" className="justify-items-center space-y-2 ">
                      <p className={`text-8xl ${aqiData?.colorClass || "text-gray-500"}`}>
                        {aqiData ? aqiData.value : "Loading..."}
                      </p>
                      <p className="text-3xl"> AQI </p>
                    </div>
                    <div id="AQI Description" className="justify-items-center space-y-2">
                      <p className="text-3xl"> AIR QUALITTY </p>
                      <p className={`text-5xl ${aqiData?.colorClass || "text-gray-500"}`}>
                        {aqiData ? aqiData.description : "Loading..."}
                      </p>
                    </div>
                  </div>
                </div>

                <div id="TOP 2" className="flex my-5 mx-4 justify-between items-stretch gap-8">
                  <div id="PM2.5 box" className="weatherStation-factorBlock_PM">
                    <div id="IMG" className="w-1/5 h-full justify-items-center">
                      <Image alt="=NFED Wind Speed" src="/img/weatherStation_img/Weather-05.png" className="h-auto w-auto" width={100} height={100} priority />
                    </div>
                    <div id="TEXT" className="w-4/5 h-full justify-items-center content-center space-y-1">
                      <div id="Topic" className="text-xl">
                        PM 2.5
                      </div>
                      <div id="value" className="flex gap-2 items-baseline">
                        <p className="text-4xl"> {pm25Now !== null ? pm25Now.toLocaleString() : "Loading..."} </p>
                        <p className="text-xl"> µg/m³ </p>
                      </div>
                    </div>
                  </div>
                  <div id="PM10 box" className="weatherStation-factorBlock_PM">
                    <div id="IMG" className="w-1/5 h-full justify-items-center">
                      <Image alt="=NFED Wind Speed" src="/img/weatherStation_img/Weather-01.png" className="h-auto w-auto" width={100} height={100} priority />
                    </div>
                    <div id="TEXT" className="w-4/5 h-full justify-items-center content-center space-y-1">
                      <div id="Topic" className="text-xl">
                        PM 10
                      </div>
                      <div id="value" className="flex gap-2 items-baseline">
                        <p className="text-4xl"> {pm10Now !== null ? pm10Now.toLocaleString() : "Loading..."} </p>
                        <p className="text-xl"> µg/m³ </p>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* ////////////////////////////////////////////////////////////////////////// */}
              <div id="split Section" className="my-7"></div>
              {/* ////////////////////////////////////////////////////////////////////////// */}

              <div id="Topic name" className="w-full py-1 my-3 justify-items-center bg-Blue_NFED_7 rounded rounded-lg shadow-inner">
                <p className="text-xl"> Real Time Weather Conditions </p>
              </div>

              <div id="BOTTOM" className="mx-2">

                <div id="BOTTOM 2" className="flex justify-between items-stretch gap-6">

                  <div id="temp box" className="weatherStation-factorBlock_Temp_Humi_WindSpeed">
                    <div id="IMG" className="w-2/5 h-full justify-items-center">
                      <Image alt="NFED temperature" src="/img/weatherStation_img/Weather-03.png" className="h-auto w-auto" width={100} height={100} priority />
                    </div>
                    <div id="TEXT" className="w-3/5 h-full justify-items-center content-center space-y-2">
                      <div id="Topic" className="w-full justify-items-center">
                        <p className="text-xl"> Temperature </p>
                      </div>
                      <div id="value" className="w-full flex justify-center items-baseline gap-2">
                        <p className="text-4xl"> {tempNow !== null ? tempNow.toLocaleString() : "Loading..."} </p>
                        <p className="text-xl">°C</p>
                      </div>
                    </div>
                  </div>

                  <div id="humi box" className="weatherStation-factorBlock_Temp_Humi_WindSpeed">
                    <div id="IMG" className="w-2/5 h-full justify-items-center">
                      <Image alt="NFED Humidity" src="/img/weatherStation_img/Weather-02.png" className="h-auto w-auto" width={100} height={100} priority />
                    </div>
                    <div id="TEXT" className="w-3/5 h-full justify-items-center content-center space-y-2">
                      <div id="Topic" className="w-full justify-items-center">
                        <p className="text-xl"> Humidity </p>
                      </div>
                      <div id="value" className="w-full flex justify-center items-baseline gap-2">
                        <p className="text-4xl"> {humiNow !== null ? humiNow.toLocaleString() : "Loading..."} </p>
                        <p className="text-xl">%</p>
                      </div>
                    </div>
                  </div>

                  <div id="windSpeed box" className="weatherStation-factorBlock_Temp_Humi_WindSpeed">
                    <div id="IMG" className="w-2/5 h-full justify-items-center">
                      <Image alt="NFED wind speed" src="/img/weatherStation_img/Weather-04.png" className="h-auto w-auto" width={100} height={100} priority />
                    </div>
                    <div id="TEXT" className="w-3/5 h-full justify-items-center content-center space-y-2">
                      <div id="Topic" className="w-full justify-items-center">
                        <p className="text-xl"> Wind Speed </p>
                      </div>
                      <div id="value" className="w-full flex justify-center items-baseline gap-2">
                        <p className="text-4xl"> {windSpeedNow !== null ? windSpeedNow.toLocaleString() : "Loading..."} </p>
                        <p className="text-xl">m/s</p>
                      </div>
                    </div>
                  </div>

                </div>

              </div>


              {/* ----------------------------------< End >---------------------------------- */}
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