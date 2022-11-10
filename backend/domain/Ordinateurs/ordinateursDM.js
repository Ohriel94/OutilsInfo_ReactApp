import ordinateursDB from '../../database/ordinateursDB.js';

const creerOrdinateur = async (serNum, mar, mod, dateAcqu, sys, proc, mem, disq, notes) => {
 const newOrdinateur = {
  serialNumber: serNum,
  etatDisponible: true,
  details: {
   marque: mar,
   modele: mod,
   dateAcquisition: dateAcqu,
   configuration: {
    systeme: sys,
    processeur: proc,
    memoire: mem,
    disque: disq,
   },
   notes: notes,
  },
 };
 try {
  const trouve = await ordinateursDB.findBySerialNumber(newOrdinateur.serialNumber);
  if (trouve === undefined) await ordinateursDB.addOne(newOrdinateur);
  else throw new Error('This serial number is already in use...');
 } catch (e) {
  throw e;
 }
};

const recupererOrdinateurs = async () => {
 const ordinateurs = await ordinateursDB.getAll();
 return ordinateurs;
};

const recupererOrdinateurParSerialNumber = async (serialNumber) => {
 try {
  const ordinateur = await ordinateursDB.findBySerialNumber(serialNumber);
  return ordinateur;
 } catch (e) {
  throw new Error(e);
 }
};

const recupererOrdinateurParId = async (id) => {
 try {
  const ordinateur = await ordinateursDB.findById(id);
  return ordinateur;
 } catch (e) {
  throw new Error(e);
 }
};

const affecterOrdinateur = async (serialNumber) => {
 if (serialNumber != undefined) {
  const ordi = await ordinateursDB.findBySerialNumber(serialNumber);
  ordi.etatDisponible = false;
  await ordinateursDB.updateById(ordi._id, ordi);
 }
};

const retirerOrdinateur = async (serialNumber) => {
 if (serialNumber != undefined) {
  const ordi = await ordinateursDB.findBySerialNumber(serialNumber);
  ordi.etatDisponible = true;
  await ordinateursDB.updateById(ordi._id, ordi);
 }
};

const supprimerOrdinateur = async (id) => {
 try {
  const trouve = await ordinateursDB.findById(id);
  if (trouve !== undefined) await ordinateursDB.deleteOne(id);
  else throw new Error('This serial number is already in use...');
 } catch (e) {
  throw e;
 }
};

export default {
 creerOrdinateur,
 supprimerOrdinateur,
 recupererOrdinateurs,
 recupererOrdinateurParSerialNumber,
 recupererOrdinateurParId,
 affecterOrdinateur,
 retirerOrdinateur,
};
