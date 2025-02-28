function convertPM25ToAQI(data) {
    const breakpoints = [
        { pmLow: 0.0, pmHigh: 12.0, aqiLow: 0, aqiHigh: 50 },
        { pmLow: 12.1, pmHigh: 35.4, aqiLow: 51, aqiHigh: 100 },
        { pmLow: 35.5, pmHigh: 55.4, aqiLow: 101, aqiHigh: 150 },
        { pmLow: 55.5, pmHigh: 150.4, aqiLow: 151, aqiHigh: 200 },
        { pmLow: 150.5, pmHigh: 250.4, aqiLow: 201, aqiHigh: 300 },
        { pmLow: 250.5, pmHigh: 500.4, aqiLow: 301, aqiHigh: 500 },
    ];

    for (const bp of breakpoints) {
        if (data >= bp.pmLow && data <= bp.pmHigh) {
            return Math.round(
                ((bp.aqiHigh - bp.aqiLow) / (bp.pmHigh - bp.pmLow)) * (data - bp.pmLow) + bp.aqiLow
            );
        }
    }
    return 500; // ถ้า PM2.5 สูงเกิน 500 µg/m³ ให้ใช้ AQI สูงสุด
}


module.exports = {
    convertPM25ToAQI,
}