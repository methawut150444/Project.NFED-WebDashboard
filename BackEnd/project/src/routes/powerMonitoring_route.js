const { Router } = require('express');
const router = Router();

// component
const controller = require('../controllers/powerMonitoring_controller.js'); // ✅ Explicitly add .js

//* ------------------------------------------------< Routes >------------------------------------------------ * //
router.get('/', (req, res) => {
    res.send("NFED WebService/ powerMonitoring/");
});


router.get("/AED_inMonth", controller.AED_inMonth)  //* --> http://localhost:9999/api/powerMonitoring/AED_inMonth
router.get("/AED_inDay", controller.AED_inDay)      //* --> http://localhost:9999/api/powerMonitoring/AED_inDay

router.get("/test_getRawData", controller.Test_getRawData)  //* test_getRawData --> http://localhost:9999/api/powerMonitoring/test_getRawData






// router.get("/selectData", controller.selectData)
// /*
//     Todo : JSON body form
//         *Format: 
//             data = {    
//                 "meter":    
//                 "factor": 
//                 "time_format": 
//             }

//         *Example:
//             data = {    
//                 "meter": "airCompresspor"
//                 "factor": "AED"
//                 "time_format": "H"  (H, D, W, M, Y)
//             }
// */

// router.get("/selectTime", controller.selectTime)
// /*
//     Todo : JSON body form
//         *Format: 
//             data = {    
//                 "meter":    
//                 "factor": 
//                 "start_date": "2024-03-27",
//                 "end_date": "2024-05-19",
//             }

//         *Example:
//             data = {    
//                 "meter": "airCompresspor"
//                 "factor": "AED"
//                 "start_date": "2024-03-27",
//                 "end_date": "2024-05-19",
//             }
// */

module.exports = router;

