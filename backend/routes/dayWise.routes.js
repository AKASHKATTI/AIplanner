const { getDayById } = require('../controller/dayWise.controller');



const express = require('express');
const router = express.Router();

// router.post('/add', getDayById.addDayPlan);
router.get('/:id', getDayById);

module.exports = router;