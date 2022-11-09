import moniteursDB from '../../database/moniteursDB.js';

const creerMoniteur = async (serNb, mar, mod, dateAcqu, sys, proc, mem, disq, notes) => {
 const newMoniteur = {
  serialNumber: serNb,
  nom: `${mar} ${mod}`,
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
 await moniteursDB.addOne(newMoniteur);
};

const recupererMoniteurs = async () => {
 const moniteurs = await moniteursDB.getAll();
 return moniteurs;
};

const recupererMoniteurParSerialNumber = async (serialNumber) => {
 try {
  const moniteur = await moniteursDB.findBySerialNumber(serialNumber);
  return moniteur;
 } catch (e) {
  throw new Error(e);
 }
};

const affecterMoniteur = async (serialNumber) => {
 if (serialNumber != undefined) {
  const moni = await moniteursDB.findBySerialNumber(serialNumber);
  moni.etatDisponible = false;
  await moniteursDB.updateById(moni._id, moni);
 }
};

const retirerMoniteur = async (serialNumber) => {
 if (serialNumber != undefined) {
  const moni = await moniteursDB.findBySerialNumber(serialNumber);
  moni.etatDisponible = true;
  await moniteursDB.updateById(moni._id, moni);
 }
};

export default {
 creerMoniteur,
 recupererMoniteurs,
 recupererMoniteurParSerialNumber,
 affecterMoniteur,
 retirerMoniteur,
};
