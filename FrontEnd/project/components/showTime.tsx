"use client";
import { useState, useEffect } from "react";
import { Get_currentTime, Get_currentDate_2, Get_currentLongDay } from "../lib/realTimeFormat";

function ShowRealTime() {
    const [currentTime, set_currentTime] = useState<string>(Get_currentTime());
    const [currentDate, set_currentDate] = useState<string>(Get_currentDate_2());
    const [currentLongDay, set_currentLongDay] = useState<string>(Get_currentLongDay());

    useEffect(() => {
        // Update the time every second
        const interval = setInterval(() => {
            set_currentTime(Get_currentTime());
            set_currentDate(Get_currentDate_2());
            set_currentLongDay(Get_currentLongDay());
        }, 1000);

        // Cleanup the interval on component unmount
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex-col items-center px-7 border-l-2 border-gray-300 space-y-1">
            <div id="top" className="flex items-baseline gap-x-2">
                <p className="font-poppins text-5xl text-Blue_NFED_2">{currentTime}</p>
                <p className="font-poppins text-xl text-Blue_NFED_2">{currentLongDay}</p>
            </div>
            <div id="bottom" className="pl-1">
                <p className="font-poppins text-xl text-CU_Gray">{currentDate}</p>
            </div>
        </div>
    );
}

export default ShowRealTime;