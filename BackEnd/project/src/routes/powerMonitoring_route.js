const { Router } = require('express');
const router = Router();

// component
const controller = require('../controllers/powerMonitoring_controller.js'); // ✅ Explicitly add .js

//* ------------------------------------------------< Routes >------------------------------------------------ * //
router.get('/', (req, res) => {
    res.send("NFED WebService/ powerMonitoring/");
});

//* lastest_AED --> http://localhost:9999/api/powerMonitoring/lastest_AED
router.get("/lastest_AED", controller.lastest_AED)



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

