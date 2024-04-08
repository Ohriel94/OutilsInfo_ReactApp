import detenteurDB from '../../database/detenteursDB.js';

const recupererDetenteurs = async () => {
 const detenteur = await detenteurDB.getAll();
 return detenteur;
};

const recupererDetenteursParAppareil = async (idAppareil) => {
 const detenteurs = await detenteurDB.getAll();
 const listeDetenteurs = detenteurs.filter((detenteur) => detenteur.idAppareil === idAppareil);
 return listeDetenteurs;
};

const enregistrerAffectationAppareil = async (usager, appareil) => {
 const date = new Date();
 if (usager._id !== undefined && appareil._id !== undefined) {
  const nouvelleEntree = creerEntreeDetenteur(date, appareil, usager, `affectation`);
  const nouvelleJournee = creerJourneeDetenteur(date);
  await ajouterEntreeDetenteur(nouvelleJournee, nouvelleEntree);
 }
};

const enregistrerRetraitAppareil = async (usager, appareil) => {
 const date = new Date();
 if (usager._id !== undefined && appareil._id !== undefined) {
  const nouvelleEntree = creerEntreeDetenteur(date, appareil, usager, `retrait`);
  const nouvelleJournee = creerJourneeDetenteur(date);
  await ajouterEntreeDetenteur(nouvelleJournee, nouvelleEntree);
 }
};

//=============== Utilitaires ===============

const creerJourneeDetenteur = (date) => {
 const nouvelleJournee = { date: formaterDate(date), entrees: [] };
 return nouvelleJournee;
};

const creerEntreeDetenteur = (date, appareil, usager, operation) => {
 const nouvelleEntree = {
  time: formaterHeure(date),
  type: operation,
  appareil: `${appareil.serialNumber} - ${appareil.details.marque} ${appareil.details.modele}`,
  usager: `${usager.prenom} ${usager.nom}`,
  idUsager: usager._id,
  idAppareil: appareil._id,
 };
 return nouvelleEntree;
};

const ajouterEntreeDetenteur = async (nouvelleJournee, nouvelleEntree) => {
 const journeeTrouvee = await detenteurDB.findByDate(nouvelleJournee.date);
 if (journeeTrouvee !== undefined) {
  journeeTrouvee.entrees.push(nouvelleEntree);
  await detenteurDB.updateById(journeeTrouvee._id, journeeTrouvee);
 } else {
  nouvelleJournee.entrees.push(nouvelleEntree);
  await detenteurDB.addOne(nouvelleJournee);
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
 recupererDetenteurs,
 recupererDetenteursParAppareil,
 enregistrerAffectationAppareil,
 enregistrerRetraitAppareil,
 formaterA2Digits,
 formaterHeure,
 creerEntreeDetenteur,
 formaterDate,
 creerJourneeDetenteur,
 ajouterEntreeDetenteur,
};
