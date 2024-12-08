const express = require('express');
const ttsHandler = require('../handlers/ttsHandler');

const router = express.Router();

router.post('/convert', ttsHandler.convertTextToSpeech);

module.exports = router;
