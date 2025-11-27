const generateStudyPlan = require('../controller/ai.controller').generateStudyPlan;


const express = require('express');
const router = express.Router();

router.post('/generate-plan', generateStudyPlan);

module.exports = router;