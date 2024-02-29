const express = require('express');
const router = express.Router();
const { sendMessage, getMessages } = require('../controllers/messageController');

// Send a message
router.post('/', sendMessage);

// Get messages
router.get('/:userId', getMessages);

module.exports = router;
