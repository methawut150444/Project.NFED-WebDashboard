const { influx_NFED, DB_config_1 } = require('../config/db');
const queryApi = influx_NFED.getQueryApi(DB_config_1.org);

const queries = require('../models/weatherStation_queries');

// component
const datetimeUtils = require('../utils/datetimeUtils')
const weatherStation_formatData = require('../utils/weatherStation_formatData')


// Todo: // ---------------------------------------< AQI_now >--------------------------------------- //
const AQI_now = async (req, res) => {
    const meter = "Weather Station"
    const factor = "AirQuality_PM2_5"

    const query = queries.lastestValue(meter, factor);

    try {
        const rawData = await queryData(query);
        const data = rawData[0]._value
        const formattedData = weatherStation_formatData.convertPM25ToAQI(data);
        // console.log(formattedData)
        
        res.status(200).json(formattedData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
// Todo: // ---------------------------------------< Temp_now >--------------------------------------- //
const Temp_now = async (req, res) => {
    const meter = "Weather Station"
    const factor = "Environment_Temperature"

    const query = queries.lastestValue(meter, factor);

    try {
        const rawData = await queryData(query);
        const data = rawData[0]._value

        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
// Todo: // ---------------------------------------< Humi_now >--------------------------------------- //
const Humi_now = async (req, res) => {
    const meter = "Weather Station"
    const factor = "Environment_Humidity"

    const query = queries.lastestValue(meter, factor);

    try {
        const rawData = await queryData(query);
        const data = rawData[0]._value
        
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
// Todo: // ---------------------------------------< PM10_now >--------------------------------------- //
const PM10_now = async (req, res) => {
    const meter = "Weather Station"
    const factor = "AirQuality_PM10"

    const query = queries.lastestValue(meter, factor);

    try {
        const rawData = await queryData(query);
        const data = rawData[0]._value
        
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
// Todo: // ---------------------------------------< PM2_5_now >--------------------------------------- //
const PM2_5_now = async (req, res) => {
    const meter = "Weather Station"
    const factor = "AirQuality_PM2_5"

    const query = queries.lastestValue(meter, factor);

    try {
        const rawData = await queryData(query);
        const data = rawData[0]._value
        
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
// Todo: // ---------------------------------------< WindSpeed_now >--------------------------------------- //
const WindSpeed_now = async (req, res) => {
    const meter = "Weather Station"
    const factor = "Wind_Speed"

    const query = queries.lastestValue(meter, factor);

    try {
        const rawData = await queryData(query);
        const data = rawData[0]._value
        
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// * ----------------------------------------------------------------------------< for get JSON data in influxDB  >
const Test_getRawData = async (req, res) => {

    const meter = "Weather Station"
    const factor = "Environment_Temperature"
    const startTime = datetimeUtils.utc0000InDay()
    const stopTime = "now()"

    const query = queries.requestForm(meter, factor, startTime, stopTime);

    try {
        const data = await queryData(query);
        formattedResponse = data.length > 0 ? data[0]._value : null;
        res.status(200).json(formattedResponse);
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
    AQI_now,
    Temp_now,
    Humi_now,
    PM10_now,
    PM2_5_now,
    WindSpeed_now,

    Test_getRawData,
    queryData,  //* Final Function
};