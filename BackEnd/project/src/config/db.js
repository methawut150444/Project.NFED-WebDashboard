const { InfluxDB } = require('@influxdata/influxdb-client');

// Configuration details
const DB_config_1 = {
  url: 'https://influx.nfed.app.meca.in.th',
  token: '9PIyiNcJF0zWsXluHdaEBa6eEI8adVI9kriAI9O41IkF_pCbH97-DtcCv7uo7yL-rRtyc_Fhyqkt9N3oLfKOuA==',
  org: 'National Science and Technology Development Agency',
};

// Create InfluxDB client instance
const influx_NFED = new InfluxDB({ url: DB_config_1.url, token: DB_config_1.token });

// Export the client and config
module.exports = {
  influx_NFED, 
  DB_config_1 
};