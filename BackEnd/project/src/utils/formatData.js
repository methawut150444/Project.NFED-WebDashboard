function format_AED_inDay_chart(rawData){
    const timeSlots = [];

    for (let h = 0; h < 24; h++) {
        for (let m = 0; m < 60; m += 30) {
            const time = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
            timeSlots.push({ time, value: 0 });
        }
    }
    
    rawData.forEach(entry => {
        const date = new Date(entry.time);
        
        // ✅ แปลงเป็นเวลา Bangkok (UTC+7)
        const localTime = date.toLocaleString("en-US", { timeZone: "Asia/Bangkok" });
        const localDate = new Date(localTime);
        
        const hours = localDate.getHours();  // ใช้เวลาในโซน Bangkok
        const minutes = localDate.getMinutes();
        const roundedMinutes = minutes < 30 ? "00" : "30";
        const timeKey = `${String(hours).padStart(2, '0')}:${roundedMinutes}`;

        const target = timeSlots.find(slot => slot.time === timeKey);
        if (target) {
            target.value = entry.value ?? 0;
        }
    });
    return timeSlots;
};


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