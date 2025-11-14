// Modelo temporal para tickets (sin Mongoose por ahora)

class TicketDAO {
  constructor() {
    this.tickets = [];
  }

  async findAll() {
    try {
      return this.tickets;
    } catch (err) {
      throw new Error('Error al obtener tickets: ' + err.message);
    }
  }

  async findById(id) {
    try {
      return this.tickets.find(t => t._id === id);
    } catch (err) {
      throw new Error('Error al obtener ticket por ID: ' + err.message);
    }
  }

  async create(ticketData) {
    try {
      const newTicket = {
        _id: Date.now().toString(),
        ...ticketData,
        createdAt: new Date()
      };
      this.tickets.push(newTicket);
      return newTicket;
    } catch (err) {
      throw new Error('Error al crear ticket: ' + err.message);
    }
  }

  async update(id, ticketData) {
    try {
      const index = this.tickets.findIndex(t => t._id === id);
      if (index === -1) return null;
      this.tickets[index] = { ...this.tickets[index], ...ticketData };
      return this.tickets[index];
    } catch (err) {
      throw new Error('Error al actualizar ticket: ' + err.message);
    }
  }

  async delete(id) {
    try {
      const index = this.tickets.findIndex(t => t._id === id);
      if (index === -1) return null;
      const deleted = this.tickets.splice(index, 1);
      return deleted[0];
    } catch (err) {
      throw new Error('Error al eliminar ticket: ' + err.message);
    }
  }
}

module.exports = new TicketDAO();
