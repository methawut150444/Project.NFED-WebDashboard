const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 9999;

app.use(express.json());
app.use(bodyParser.json());
app.use(cors({ origin: '*' })); //! Allow requests from any local


//* ------------------------------------------------< Routes >------------------------------------------------ * //
app.get('/', (req, res) => {
    res.send("NFED WebService/");
});

// //* -----------------< Power Monitoring >----------------- * // http://localhost:9999/api/powerMonitoring
const router_powerMonitoring = require('./src/routes/powerMonitoring_route');
app.use('/api/powerMonitoring', router_powerMonitoring)

// //* -----------------< Weather Station >----------------- * // http://localhost:9999/api/weatherStation
// const router_weatherStation = require('./src/routes/weatherStation_route');
// app.use('/api/weatherStation', router_weatherStation)



// Todo: --------------------------------------------------------------------------------------------------------//
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

