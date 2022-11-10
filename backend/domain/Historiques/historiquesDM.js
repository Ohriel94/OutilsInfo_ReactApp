import historiqueDB from '../../database/historiquesDB.js';

const recupererHistoriques = async () => {
 const historique = await historiqueDB.getAll();
 return historique;
};

const enregistrerAffectationAppareil = async (usager, appareil) => {
 const date = new Date();
 if (usager._id !== undefined && appareil._id !== undefined) {
  const nouvelleEntree = creerEntreeHistorique(date, appareil, usager._id, `affectation`);
  const nouvelleJournee = creerJourneeHistorique(date);
  await ajouterEntreeHistorique(nouvelleJournee, nouvelleEntree);
 }
};

const enregistrerRetraitAppareil = async (usager, appareil) => {
 const date = new Date();
 if (usager._id !== undefined && appareil._id !== undefined) {
  const nouvelleEntree = creerEntreeHistorique(date, appareil, usager._id, `retrait`);
  const nouvelleJournee = creerJourneeHistorique(date);
  await ajouterEntreeHistorique(nouvelleJournee, nouvelleEntree);
 }
};

//=============== Utilitaires ===============

const creerJourneeHistorique = (date) => {
 const nouvelleJournee = { date: formaterDate(date), entrees: [] };
 return nouvelleJournee;
};

const creerEntreeHistorique = (date, appareil, idUsager, operation) => {
 const nouvelleEntree = {
  time: formaterHeure(date),
  type: operation,
  appareil: `${appareil.serialNumber} - ${appareil.details.marque} ${appareil.details.modele}`,
  idUsager: idUsager,
  idAppareil: appareil._id,
 };
 return nouvelleEntree;
};

const ajouterEntreeHistorique = async (nouvelleJournee, nouvelleEntree) => {
 const journeeTrouvee = await historiqueDB.findByDate(nouvelleJournee.date);
 if (journeeTrouvee !== undefined) {
  journeeTrouvee.entrees.push(nouvelleEntree);
  await historiqueDB.updateById(journeeTrouvee._id, journeeTrouvee);
 } else {
  nouvelleJournee.entrees.push(nouvelleEntree);
  await historiqueDB.addOne(nouvelleJournee);
 }
};

const formaterA2Digits = (num) => {
 return num.toString().padStart(2, '0');
};

const formaterHeure = (date) => {
 const heureFormatee = [
  formaterA2Digits(date.getHours()),
  formaterA2Digits(date.getMinutes()),
  formaterA2Digits(date.getSeconds()),
 ].join(':');
 return heureFormatee;
};

const formaterDate = (date) => {
 const dateFormatee = [
  formaterA2Digits(date.getDate()),
  formaterA2Digits(date.getMonth() + 1),
  date.getFullYear(),
 ].join('/');
 return dateFormatee;
};

export default {
 recupererHistoriques,
 enregistrerAffectationAppareil,
 enregistrerRetraitAppareil,
 formaterA2Digits,
 formaterHeure,
 creerEntreeHistorique,
 formaterDate,
 creerJourneeHistorique,
 ajouterEntreeHistorique,
};
