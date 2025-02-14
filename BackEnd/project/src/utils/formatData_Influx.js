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

module.exports = processData;