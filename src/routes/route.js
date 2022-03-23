const express = require('express');
const router = express.Router();
const collegecontroller= require("../controllers/CollegeController")
const interncontroller= require("../controllers/InternController")



router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})


router.post("/functionup/colleges", collegecontroller.createcollege)
router.post("/functionup/interns", interncontroller.createintern)
router.get("/functionup/collegeDetails", interncontroller.getcollegedetail)





module.exports = router;