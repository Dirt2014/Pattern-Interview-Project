const express = require('express');

const feedController = require('../controllers/feed');

const router = express.Router();

//
router.get('/advisors', feedController.getAdvisors);

router.post('/assign-advisor-to-client', feedController.assignAdvisorToClient);

router.get('/advisor-clients/:advisorId', feedController.getAdvisorClients);

module.exports = router;