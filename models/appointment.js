const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  date: Date,
  status: { type: String, default: 'pending' }, // pending, confirmed, completed
});

module.exports = mongoose.model('Appointment', appointmentSchema);
