const { Router } = require('express');
const router = Router();

// component
const controller = require('../controllers/weatherStation_controller.js'); // ✅ Explicitly add .js

//* ------------------------------------------------< Routes >------------------------------------------------ * //
router.get('/', (req, res) => {
    res.send("NFED WebService/ weatherStation/");
});

router.get("/AQI_now", controller.AQI_now)  //* --> http://localhost:9999/api/weatherStation/AQI_now
router.get("/Temp_now", controller.Temp_now)  //* --> http://localhost:9999/api/weatherStation/Temp_now
router.get("/Humi_now", controller.Humi_now)  //* --> http://localhost:9999/api/weatherStation/Humi_now
router.get("/PM10_now", controller.PM10_now)  //* --> http://localhost:9999/api/weatherStation/PM10_now
router.get("/PM2_5_now", controller.PM2_5_now)  //* --> http://localhost:9999/api/weatherStation/PM2_5_now
router.get("/WindSpeed_now", controller.WindSpeed_now)  //* --> http://localhost:9999/api/weatherStation/WindSpeed_now


router.get("/test_getRawData", controller.Test_getRawData)  //* test_getRawData --> http://localhost:9999/api/weatherStation/test_getRawData


module.exports = router;

