import mongoose from 'mongoose';

const EntreeHistoriqueSchema = mongoose.Schema({
 time: String,
 type: String,
 appareil: String,
 idUsager: ObjectId,
 idAppareil: ObjectId,
});

module.exports = EntreeHistorique = mongoose.model(
 'EntreeHistorique',
 EntreeHistoriqueSchema
);
