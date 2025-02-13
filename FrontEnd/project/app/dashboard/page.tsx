import "../globals.css"; // ✅ Import Tailwind styles

// components
import ShowRealTime from '../../components/showTime';

function page() {

  return (
    <div className="p-4 sm:ml-64">
      <div className="my-4 justify-self-end">
        <ShowRealTime />
      </div>

      <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
        <div id="Main Section" className="grid sm:grid-cols-2 gap-5 grid-cols-1">
          {/* -------------------------- page - Power Monitoring -------------------------- */}
          <div
            id="weather station"
            className="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800 shadow-lg rounded-lg border border-gray-100"
          >
            <p className="text-2xl text-gray-400 dark:text-gray-500">+</p>
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


