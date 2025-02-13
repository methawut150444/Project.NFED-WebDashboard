'use client'

// components
import "./globals.css";
import ShowRealTime from '../components/showTime';

function page() {

  return (
    <div className="p-4 sm:ml-64">
      <div className="my-4 justify-self-end">
        <ShowRealTime />
      </div>

      <div className="board">
        <div className="board-layout">

          {/* -------------------------- page - Power Monitoring -------------------------- */}
          <div id="power monitoring" className="note">
            <h1 className="note-topicName"> NFEC Building Energy profile </h1>

            <div id="note-content">
              {/* -------------< Start >------------- */}

              <div id="TOP">
                <div id="Topic name" className="w-auto m-3 px-3 py-1 justify-self-start bg-Blue_NFED_7 rounded rounded-lg text-lg" >
                  Active Energy Delivered
                </div>

                <p className="w-auto m-2 mt-3 px-3 py-1 justify-self-start text-2xl font-poppins">
                  1st-today
                </p>

                <div id="show parameter" className="flex w-full pr-7 justify-end items-baseline gap-3 font-poppins">
                  <p className="text-8xl mainParameter"> 99,999.9 </p>
                  <p className="text-3xl"> kWh </p>
                </div>

              </div>

              <div id="split line" className="w-11/12 my-3 justify-self-center border-b border-2 border-Blue_NFED_5">
              </div>

              <div id="BOTTOM" >
                <div id="Topic name" className="w-auto mt-5 m-3 px-3 py-1 justify-self-start bg-Blue_NFED_7 rounded rounded-lg text-lg" >
                  Daily Energy Accumulation
                </div>
                <div id="graph">
                  [graph]
                </div>
              </div>

              {/* -------------< End >------------- */}
            </div>


          </div>

          {/* -------------------------- page - Weather Station -------------------------- */}
          <div
            id="weather station"
            className="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800 shadow-lg rounded-lg border border-gray-100"
          >
            <p className="text-2xl text-gray-400 dark:text-gray-500">+</p>
          </div>

          {/* -------------------------- page - NSTDA BEMs --------------------------
          <div
            id="NSTDA BEMs"
            className="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800 shadow-lg rounded-lg border border-gray-100"
          >
            <p className="text-2xl text-gray-400 dark:text-gray-500">+</p>
          </div> */}

          {/* Add more content here if needed */}
        </div>
      </div>
    </div>
  );
}

export default page;


