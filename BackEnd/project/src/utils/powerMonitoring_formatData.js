const moment = require('moment-timezone');

function format_AED_inDay_chart(rawData) {
    const TIMEZONE = "Asia/Bangkok";

    // สร้างอาร์เรย์ช่วงเวลา 00:00 - 23:30 ทุกๆ 30 นาที
    const timeSlots = [];
    for (let h = 0; h < 24; h++) {
        for (let m of ["00", "30"]) {
            timeSlots.push(`${String(h).padStart(2, "0")}:${m}`);
        }
    }

    // แปลง rawData เป็น { "HH:mm": value }
    const transformedData = {};
    rawData.forEach(({ time, value }) => {
        const localTime = moment.utc(time).tz(TIMEZONE).format("HH:mm");
        transformedData[localTime] = value;
    });

    // เวลาปัจจุบันในโซนไทย
    const currentTime = moment().tz(TIMEZONE);
    const currentHour = currentTime.hour();
    const currentMinute = currentTime.minute();

    // ปัดเวลาปัจจุบันเป็น 00 หรือ 30 นาที
    const roundedCurrentTime = `${String(currentHour).padStart(2, "0")}:${currentMinute < 30 ? "00" : "30"}`;

    // สร้าง array ของผลลัพธ์
    const result = timeSlots.map(slot => ({
        time: slot,
        value: transformedData.hasOwnProperty(slot) ? transformedData[slot] : null
    }));

    // ตรวจสอบว่ามีข้อมูลล่าสุดที่ "กำลังเก็บอยู่" หรือไม่
    const lastRecord = rawData[rawData.length - 2]; // ข้อมูลตัวสุดท้าย ที่ไม่รวมข้อมูล realtime
    const lastRecordTime = moment.utc(lastRecord.time).tz(TIMEZONE);
    const lastRecordLocalTime = lastRecordTime.format("HH:mm");

    // หา slot ใกล้ที่สุดจาก timeSlots
    let nearestSlot = timeSlots.find(slot => slot >= lastRecordLocalTime);

    // ถ้าข้อมูลล่าสุดอยู่ในช่วงเวลา 30 นาทีของรอบปัจจุบัน ให้ใช้ค่าอัปเดต
    if (nearestSlot && transformedData[nearestSlot] === undefined) {
        for (let i = 0; i < result.length; i++) {
            if (result[i].time === nearestSlot && result[i].value === null) {
                result[i].value = lastRecord.value;
                break;
            }
        }
    }

    return result;
}

function processData(data) {
    let result = [];

    data.forEach((item, index) => {
        // Convert UTC time to Bangkok time
        const utcDate = new Date(item._time);
        const bangkokDate = new Date(utcDate.getTime());
        const timeString = bangkokDate.toTimeString().split(" ")[0];

        let val = 0;
        const prev = data[index - 1];
        const curr = data[index];
        const next = data[index + 1];

        // Handle first index
        if (index === 0) {
            val = 0;
            result.push({ time: timeString, value: val });
        }
        // Handle last index
        else if (index === data.length - 1) {
            if (!(curr._value === prev._value && curr._value !== data[index - 2]?.["_value"])) {
                val =
                    curr._value !== prev._value
                        ? curr._value - prev._value // Difference from previous
                        : result[result.length - 1].value; // Use last value in result
                result.push({ time: timeString, value: val });
            }
        }
        // Handle other indices
        else {
            if (!(curr._value === prev._value && curr._value !== next._value)) {
                val =
                    curr._value !== prev._value && curr._value === next._value
                        ? curr._value - prev._value // Difference from previous
                        : result[result.length - 1].value; // Use last value in result
                result.push({ time: timeString, value: val });
            }
        }
    });

    return result;
}




module.exports = {
    format_AED_inDay_chart,
    processData

}