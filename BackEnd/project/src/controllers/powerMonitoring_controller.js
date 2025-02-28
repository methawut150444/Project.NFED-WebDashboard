const { influx_NFED, DB_config_1 } = require('../config/db');
const queryApi = influx_NFED.getQueryApi(DB_config_1.org);

const queries = require('../models/powerMonitoring_queries');

// component
const datetimeUtils = require('../utils/datetimeUtils')
const powerMonitoring_formatData = require('../utils/powerMonitoring_formatData')

// Todo: // ---------------------------------------< Main_AED_inMonth >--------------------------------------- //
const Main_AED_inMonth = async (req, res) => {
    // todo: -----> step: get request params or initial data
    const meter = "Powermeter_Main"
    const factor = "Total_Active_Energy"
    const startTime = datetimeUtils.utc1stMonth()
    const stopTime = "now()"

    // todo: -----> step: query data
    const query = queries.diffPeriod(meter, factor, startTime, stopTime);
    // console.log(datetimeUtils.utc1stMonth())

    // todo: -----> step: check data
    try {
        const rawData = await queryData(query);

        // todo: -----> step: Convert data format !!!
        // console.log(rawData)
        const data = rawData[0]._diff

        // todo: -----> step: send response
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
// Todo: // ---------------------------------------< Main_AED_inDay >--------------------------------------- //
const Main_AED_inDay = async (req, res) => {
    // todo: -----> step: get request params or initial data
    const meter = "Powermeter_Main"
    const factor = "Total_Active_Energy"
    const startTime = datetimeUtils.utc0000InDay()
    const stopTime = "now()"

    // todo: -----> step: query data
    const query = queries.diffPeriod(meter, factor, startTime, stopTime);

    // todo: -----> step: check data
    try {
        const rawData = await queryData(query);

        // todo: -----> step: Convert data format !!!
        // console.log(rawData)
        const data = rawData[0]._diff

        // todo: -----> step: send response
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
// Todo: // ---------------------------------------< Main_AED_inYesterday >--------------------------------------- //
const Main_AED_inYesterday = async (req, res) => {
    // todo: -----> step: get request params or initial data
    const meter = "Powermeter_Main"
    const factor = "Total_Active_Energy"
    const startTime = datetimeUtils.utc0000InYesterday()
    const stopTime = datetimeUtils.utc0000InDay()

    // todo: -----> step: query data
    const query = queries.diffPeriod(meter, factor, startTime, stopTime);

    // todo: -----> step: check data
    try {
        const rawData = await queryData(query);

        // todo: -----> step: Convert data format !!!
        // console.log(rawData)
        const data = rawData[0]._diff

        // todo: -----> step: send response
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Todo: // ---------------------------------------< Main_Power_inDay >--------------------------------------- //
const Main_Power_inDay = async (req, res) => {
    // todo: -----> step: get request params or initial data
    const meter = "Powermeter_Main"
    const factor = "Total_Active_Energy"
    const startTime = datetimeUtils.utc0000InDay()
    const stopTime = "now()"

    // todo: -----> step: query data
    const query = queries.inDayFormat(meter, factor, startTime, stopTime);

    // todo: -----> step: check data
    try {
        const rawData = await queryData(query);
        // console.log(rawData)

        // todo: -----> step: Convert data format !!!
        const formattedData = powerMonitoring_formatData.format_AED_inDay_chart(rawData);
        // console.log(formattedData)

        // todo: -----> step: send response
        res.status(200).json(formattedData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Todo: // ---------------------------------------< Main_Power_inYesterday >--------------------------------------- //
const Main_Power_inYesterday = async (req, res) => {
    // todo: -----> step: get request params or initial data
    const meter = "Powermeter_Main"
    const factor = "Total_Active_Energy"
    const startTime = datetimeUtils.utc0000InYesterday()
    const stopTime = datetimeUtils.utc0000InDay()

    // todo: -----> step: query data
    const query = queries.inDayFormat(meter, factor, startTime, stopTime);

    // todo: -----> step: check data
    try {
        const rawData = await queryData(query);
        // console.log(data)

        // todo: -----> step: Convert data format !!!
        const formattedData = powerMonitoring_formatData.format_AED_inDay_chart(rawData);

        // todo: -----> step: send response
        res.status(200).json(formattedData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// // * ----------------------------------------------------------------------------< Select Time Format (H, D, W, M, Y)  >
// const selectData = async (req, res) => {
//     // console.log(req.body)
//     const { 
//         meter,
//         factor,
//         time_format
//     } = req.query;

//     console.log(req.query)

//     // For defense error when request with not JSON body together
//     if (!Object.keys(req.query).length) {
//         return res.status(400).send('JSON body is required!! 😡😡');
//     }

//     // Todo: ---------------------------------------------------< change timestamp format for request data from InfluxDB >
//     let start_timestamp = "";
//     let end_timestamp = "";

//     /*  
//         * create time format unit
//             * year: 2025    
//             * month: 01     , next month: 02
//             * day: 01       , next day: 02
//             * hour: 00      , next hour: 01
//     */

//     const currentHour = String(new Date().getHours()).padStart(2, '0')
//     const nextHour = String(((new Date().getHours()) + 1) % 24).padStart(2, '0')
//     const currentDay = String(new Date().getDate()).padStart(2, '0')
//     const nextDay = String(new Date().getDate() + 1).padStart(2, '0');
//     const currentMonth = String(new Date().getMonth() + 1).padStart(2, '0')
//     const nextMonth = String((new Date().getMonth() + 1) % 12 + 1).padStart(2, '0');
//     const currentYear = String(new Date().getFullYear());
//     const nextYear = String(new Date().getFullYear() + 1)

//     if(time_format == 'H'){
//         start_timestamp = `${currentYear}-${currentMonth}-${currentDay}T${currentHour}:00:00`;
//         end_timestamp = `${currentYear}-${currentMonth}-${currentDay}T${nextHour}:00:00`;

//         if(nextHour == '00'){
//             end_timestamp = `${currentYear}-${currentMonth}-${nextDay}T${nextHour}:00:00`;

//             if(nextDay == '01'){
//                 end_timestamp = `${currentYear}-${nextMonth}-${nextDay}T${nextHour}:00:00`;

//                 if(nextMonth == '01'){
//                     end_timestamp = `${nextYear}-${nextMonth}-${nextDay}T${nextHour}:00:00`
//                 }
//             }
//         }
//     }
//     else if(time_format == 'D'){
//         start_timestamp = `${currentYear}-${currentMonth}-${currentDay}T00:00:00`;
//         end_timestamp = `${currentYear}-${currentMonth}-${nextDay}T00:00:00`;

//         if(nextDay == '01'){
//             end_timestamp = `${currentYear}-${nextMonth}-${nextDay}T00:00:00`;

//             if(nextMonth == '01'){
//                 end_timestamp = `${nextYear}-${nextMonth}-${nextDay}T00:00:00`
//             }
//         }
//     }
//     else if(time_format == 'M'){
//         start_timestamp = `${currentYear}-${currentMonth}-01T00:00:00`;
//         end_timestamp = `${currentYear}-${nextMonth}-01T00:00:00`;

//         if(nextMonth == '01'){
//             end_timestamp = `${nextYear}-${nextMonth}-01T00:00:00`;
//         }
//     }


//     const startTime_change = new Date(start_timestamp)
//     const endTime_change = new Date(end_timestamp)

//     startTime_change.setHours(startTime_change.getHours());
//     endTime_change.setHours(endTime_change.getHours());

//     const utc_startTime = startTime_change.toISOString()
//     const utc_endTime = endTime_change.toISOString()

//     // console.log(utc_startTime)  //* sent to InfluxDB
//     // console.log(utc_endTime)    //* sent to InfluxDB

//     // Todo: ----------------------------------------------------------------------

//     const query = queries.requestForm(meter, factor, utc_startTime, utc_endTime);

//     try {
//         const data = await queryData(query);

//         // res.status(200).json(data);
//         res.status(200).json(processData(data));
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// * ----------------------------------------------------------------------------< for get JSON data in influxDB  >
const Test_getRawData = async (req, res) => {

    const meter = "Aircompressor_Power_Meter_1"
    const factor = "ACTIVE_ENERGY_DELIVERED"
    const start = datetimeUtils.utc0000InDay()
    const stop = "now()"

    const query = queries.requestForm(meter, factor, start, stop);

    try {
        const data = await queryData(query);
        console.log(data)
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// * =========================< Query function to fetch data to InfluxDB >========================= * //
const queryData = async (QUERY_COMMAND) => {
    return new Promise((resolve, reject) => {
        const results = [];

        queryApi.queryRows(QUERY_COMMAND, {
            next(row, tableMeta) {
                results.push(tableMeta.toObject(row));
            },
            error(error) {
                // console.error(`Error querying InfluxDB: ${error.message}`);
                reject(error);
            },
            complete() {
                // console.log('Query complete.');
                resolve(results);
            },
        });
    });
};

module.exports = {
    Main_AED_inMonth,
    Main_AED_inDay,
    Main_AED_inYesterday,
    Main_Power_inDay,
    Main_Power_inYesterday,


    Test_getRawData,
    queryData,  //* Final Function
};