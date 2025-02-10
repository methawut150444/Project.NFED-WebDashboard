const { InfluxDB } = require('@influxdata/influxdb-client');

// Configuration details
const config = {
  url: 'https://influx.nfed.app.meca.in.th',
  token: '9PIyiNcJF0zWsXluHdaEBa6eEI8adVI9kriAI9O41IkF_pCbH97-DtcCv7uo7yL-rRtyc_Fhyqkt9N3oLfKOuA==',
  org: 'National Science and Technology Development Agency',
};

// Create InfluxDB client instance
const influxDB = new InfluxDB({ url: config.url, token: config.token });

// Export the client and config
module.exports = { influxDB, config };