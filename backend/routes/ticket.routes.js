const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticket.controller');

router.post('/', ticketController.createTicket);
router.get('/', ticketController.getAllTickets);
router.get('/:id', ticketController.getTicketById);
router.put('/:id/status', ticketController.updateTicketStatus);
router.delete('/:id', ticketController.deleteTicket);

module.exports = router;