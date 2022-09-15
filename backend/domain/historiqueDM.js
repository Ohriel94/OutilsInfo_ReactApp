import historiqueDB from '../database/historiqueDB.js';
import mongoose from 'mongoose';

const recupererHistorique = async () => {
 console.log('--- historiqueDM/recupererHistorique');
 const historique = await historiqueDB.getHistorique();
 return historique;
};

const enregistrerAffectationAppareil = async (usager, appareil) => {
 console.log('--- historiqueDM/enregistrerAffectationAppareil');
 const date = new Date();
 if (usager._id !== undefined && appareil._id !== undefined) {
  const nouvelleEntree = creerEntreeHistorique(
   date,
   appareil,
   usager,
   `affectation`
  );
  console.log(nouvelleEntree);
  const nouvelleJournee = creerJourneeHistorique(date);
  console.log(nouvelleJournee);
  await ajouterEntreeHistorique(nouvelleJournee, nouvelleEntree);
 }
};

const enregistrerRetraitAppareil = async (usager, appareil) => {
 console.log('--- historiqueDM/enregistrerRetraitAppareil');
 const date = new Date();
 if (usager._id !== undefined && appareil._id !== undefined) {
  const nouvelleEntree = creerEntreeHistorique(
   date,
   appareil,
   usager,
   `retrait`
  );
  console.log(nouvelleEntree);
  const nouvelleJournee = creerJourneeHistorique(date);
  console.log(nouvelleJournee);
  await ajouterEntreeHistorique(nouvelleJournee, nouvelleEntree);
 }
};

//=============== Utilitaires ===============

const creerJourneeHistorique = (date) => {
 const nouvelleJournee = { date: formaterDate(date), entrees: [] };
 return nouvelleJournee;
};

const creerEntreeHistorique = (date, appareil, usager, operation) => {
 const nouvelleEntree = {
  time: formaterHeure(date),
  type: operation,
  appareil: `${appareil.serialNumber} - ${appareil.details.marque} ${appareil.details.modele}`,
  idUsager: usager._id,
  idAppareil: appareil._id,
 };
 return nouvelleEntree;
};

const ajouterEntreeHistorique = async (nouvelleJournee, nouvelleEntree) => {
 const trouve = await historiqueDB.findByDate(nouvelleJournee.date);
 console.log(trouve !== undefined);
 if (trouve !== undefined) {
  trouve.entrees.push(nouvelleEntree);
  console.log(`trouve : ${trouve.date}`);
  await historiqueDB.updateById(trouve._id, trouve);
 } else {
  nouvelleJournee.entrees.push(nouvelleEntree);
  await historiqueDB.addEntree(nouvelleJournee);
 }
 console.log(nouvelleJournee);
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
 console.log(heureFormatee);
 return heureFormatee;
};

const formaterDate = (date) => {
 const dateFormatee = [
  formaterA2Digits(date.getDate()),
  formaterA2Digits(date.getMonth() + 1),
  date.getFullYear(),
 ].join('/');
 console.log(dateFormatee);
 return dateFormatee;
};

export default {
 recupererHistorique,
 enregistrerAffectationAppareil,
 enregistrerRetraitAppareil,
};
