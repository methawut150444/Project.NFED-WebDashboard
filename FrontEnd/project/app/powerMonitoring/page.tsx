'use client'

// components
import ShowRealTime from '../../components/showTime';
import MultiSelectDropdown from '../../components/multiSelect'; // Import the dropdown
import DateRangePicker from '../../lib/dateRangePicker'

function Home() {
  const meter_option = ['Air Compress', 'Hall', '2 Floor'];
  const factor_option = ['Active', 'Using', 'Frequency'];

  return (
    <div className="p-4 sm:ml-64">
      <div className="my-4 justify-self-end">
        <ShowRealTime />
      </div>

      <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
        <div id="Main Section" className="grid sm:grid-cols-2 gap-5 grid-cols-1">
          
          {/* -------------------------- page - Power Monitoring -------------------------- */}
          <div
            id="power monitoring"
            className="h-auto rounded bg-gray-50 dark:bg-gray-800 shadow-lg rounded-lg border border-gray-100"
          >
            <div id="topic name">
              <h1
                className="
                  h-auto pl-5 p-2 rounded-t-lg bg-Blue_NFED_2
                  text-white text-lg font-poppins
                "
              >
                Power Monitoring
              </h1>
            </div>

            <div id="content" className="w-full justify-self-start rounded bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-300">
              <div id='header' className='flex w-full'>
                <div id="option select" className="h-40 w-1/3  rounded bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-300">
                  <div id='MultiSelect' className='px-2 py-2 space-y-2'>
                    <MultiSelectDropdown
                      options={meter_option}
                      placeholder="Select a Meter..."
                    />
                    <MultiSelectDropdown
                      options={factor_option}
                      placeholder="Select a Factor..."
                    />
                  </div>
                  <div id='CalendarSelect' className='flex justify-center mt-1'>
                      <DateRangePicker />
                  </div>

                </div>
                <div id="Show Data" className="h-40 w-2/3 rounded bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-300">

                </div>
              </div>

              <div id='bottom'>

              </div>

              <div id='graph' className='rounded bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-300'>
                <p className="text-2xl text-gray-400 dark:text-gray-500">TEXT</p>
              </div>

            </div>

          </div>

          {/* -------------------------- page - Weather Station -------------------------- */}
          <div
            id="weather station"
            className="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800 shadow-lg rounded-lg border border-gray-100"
          >
            <p className="text-2xl text-gray-400 dark:text-gray-500">+</p>
          </div>

          {/* -------------------------- page - NSTDA BEMs -------------------------- */}
          <div
            id="NSTDA BEMs"
            className="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800 shadow-lg rounded-lg border border-gray-100"
          >
            <p className="text-2xl text-gray-400 dark:text-gray-500">+</p>
          </div>

          {/* Add more content here if needed */}
        </div>
      </div>
    </div>
  );
}

export default Home;
