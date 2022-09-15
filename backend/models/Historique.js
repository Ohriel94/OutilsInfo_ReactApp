import mongoose from 'mongoose';

const HistoriqueSchema = mongoose.Schema({
 date: String,
 entrees: Array(0),
});

module.exports = Historique = mongoose.model('Historique', HistoriqueSchema);
