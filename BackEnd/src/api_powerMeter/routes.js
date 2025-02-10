const { Router } = require('express');
const controller = require('./controllers');

const router = Router();

router.get('/', (req, res) => {
    res.send("< NFED Database API service >> Power Meter >");
});


router.get("/selectData", controller.selectData)
/*
    Todo : JSON body form
        *Format: 
            data = {    
                "meter":    
                "factor": 
                "time_format": 
            }

        *Example:
            data = {    
                "meter": "airCompresspor"
                "factor": "AED"
                "time_format": "H"  (H, D, W, M, Y)
            }
*/

router.get("/selectTime", controller.selectTime)
/*
    Todo : JSON body form
        *Format: 
            data = {    
                "meter":    
                "factor": 
                "start_date": "2024-03-27",
                "end_date": "2024-05-19",
            }

        *Example:
            data = {    
                "meter": "airCompresspor"
                "factor": "AED"
                "start_date": "2024-03-27",
                "end_date": "2024-05-19",
            }
*/

module.exports = router;

