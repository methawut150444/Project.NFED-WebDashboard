const { Router } = require('express');
const router = Router();

// component
const controller = require('../controllers/weatherStation_controller.js'); // ✅ Explicitly add .js

//* ------------------------------------------------< Routes >------------------------------------------------ * //
router.get('/', (req, res) => {
    res.send("NFED WebService/ weatherStation/");
});

router.get("/test_getRawData", controller.Test_getRawData)  //* test_getRawData --> http://localhost:9999/api/weatherStation/test_getRawData


module.exports = router;

