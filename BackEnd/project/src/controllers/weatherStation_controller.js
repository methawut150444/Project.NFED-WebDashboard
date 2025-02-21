const { influx_NFED, DB_config_1 } = require('../config/db');
const queryApi = influx_NFED.getQueryApi(DB_config_1.org);

const queries = require('../models/weatherStation_queries');

// component
const datetimeUtils = require('../utils/datetimeUtils')

// * ----------------------------------------------------------------------------< for get JSON data in influxDB  >
const Test_getRawData = async (req, res) => {

    const meter = "Weather Station"
    const factor = "Environment_Temperature"
    const start = datetimeUtils.utc0000InDay()
    const stop = "now()"

    const query = queries.requestForm(meter, factor, start, stop);

    try {
        const data = await queryData(query);
        formattedResponse = data.length > 0 ? data[0]._value : null;
        console.log(formattedResponse)
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

    Test_getRawData,
    queryData,  //* Final Function
};