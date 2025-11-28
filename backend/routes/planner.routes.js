const  { createPlan , getPlans , getPlanById , deletePlan } = require('../controller/planner.controller');
const express = require('express');
const router = express.Router();
const { authenticateUser } = require('../middleware/user.middleware');


router.post('/create-plan', authenticateUser,createPlan);
router.get('/plans',authenticateUser , getPlans);
router.get('/plans/:id',authenticateUser , getPlanById);
router.delete('/plan/delete/:id', deletePlan);

module.exports = router;