const ticketDAO = require('../dao/models/ticket.dao');
const crypto = require('crypto');

class TicketRepository {
  // Generar código único para ticket
  generateCode() {
    return 'TICKET-' + crypto.randomBytes(8).toString('hex').toUpperCase();
  }

  // Crear ticket
  async createTicket(ticketData) {
    try {
      const { purchaser, amount, products } = ticketData;

      const ticket = {
        code: this.generateCode(),
        purchase_datetime: new Date(),
        amount,
        purchaser,
        products
      };

      return await ticketDAO.create(ticket);
    } catch (err) {
      throw new Error(err.message);
    }
  }

  // Obtener todos los tickets
  async getAllTickets() {
    try {
      return await ticketDAO.findAll();
    } catch (err) {
      throw new Error(err.message);
    }
  }

  // Obtener ticket por ID
  async getTicketById(id) {
    try {
      return await ticketDAO.findById(id);
    } catch (err) {
      throw new Error(err.message);
    }
  }

  // Obtener tickets por usuario (email)
  async getTicketsByPurchaser(email) {
    try {
      const allTickets = await ticketDAO.findAll();
      return allTickets.filter(t => t.purchaser === email);
    } catch (err) {
      throw new Error(err.message);
    }
  }
}

module.exports = new TicketRepository();
