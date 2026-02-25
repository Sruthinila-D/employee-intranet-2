const express = require('express');
const router = express.Router();
const attachmentController = require('../controllers/attachment.controller');

router.post('/', attachmentController.createAttachment);
router.get('/', attachmentController.getAttachments);
router.get('/ticket/:ticketId', attachmentController.getAttachmentByTicket);

module.exports = router;