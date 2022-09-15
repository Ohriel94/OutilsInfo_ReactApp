import ordinateursDB from '../database/ordinateursDB.js';
import mongoose from 'mongoose';

const creerOrdinateur = async (
 serNb,
 mar,
 mod,
 sys,
 proc,
 mem,
 disq,
 dateAcqu,
 etatDisp
) => {
 console.log('--- ordinateursDM/creerOrdinateur');
 const newOrdinateur = {
  serialNumber: serNb,
  marque: mar,
  modele: mod,
  systeme: sys,
  processeur: proc,
  memoire: mem,
  disque: disq,
  dateAcquisition: dateAcqu,
  etatDisponible: etatDisp,
 };
 await ordinateursDB.addOrdinateur(newOrdinateur);
};

const recupererOrdinateurs = async () => {
 console.log('--- ordinateursDM/recupererOrdinateurs');
 const ordinateurs = await ordinateursDB.getOrdinateurs();
 return ordinateurs;
};

const trouverOrdinateur = async (serNum) => {
 console.log('--- ordinateursDM/trouverOrdinateur');
 const ordinateurs = await ordinateursDB.findBySerialNumber(serNum);
 return ordinateurs;
};

const affecterOrdinateur = async (ordinateur) => {
 console.log('--- ordinateursDM/affecterOrdinateur');
 console.log('serialNumber : ' + ordinateur.serialNumber);
 if (ordinateur != undefined) {
  const ordi = await ordinateursDB.findBySerialNumber(ordinateur.serialNumber);
  console.log('ordinateur : ' + ordi._id);
  ordi.etatDisponible = false;
  await ordinateursDB.updateById(ordi._id, ordi);
 }
};

const retirerOrdinateur = async (ordinateur) => {
 console.log('--- ordinateursDM/retirerOrdinateur');
 console.log(ordinateur);
 if (ordinateur != undefined) {
  const ordi = await ordinateursDB.findBySerialNumber(ordinateur.serialNumber);
  ordi.etatDisponible = true;
  await ordinateursDB.updateById(ordi._id, ordi);
 }
};

export default {
 creerOrdinateur,
 recupererOrdinateurs,
 trouverOrdinateur,
 affecterOrdinateur,
 retirerOrdinateur,
};
