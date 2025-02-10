const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 9999;

app.use(express.json());
app.use(bodyParser.json());
app.use(cors({ origin: '*' })); //! Allow requests from any local

//* --------------------------< Routes >-------------------------- * //
app.get('/', (req, res) => {
    res.send("< NFED Database API service >");
});

const router_powerMeter = require('./src/api_powerMeter/routes');
// const router_weatherStation = require('./src/api_weatherStation/routes');

app.use('/api/powerMeter', router_powerMeter)
// app.use('/api/weatherStation', router_weatherStation)

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


// http://localhost:9999/api/powerMeter/selectData