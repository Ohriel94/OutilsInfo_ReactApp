import ordinateursDB from '../database/ordinateursDB.js';
import mongoose from 'mongoose';

const creerOrdinateur = async (
 serNb,
 mar,
 mod,
 dateAcqu,
 sys,
 proc,
 mem,
 disq,
 notes
) => {
 const newOrdinateur = {
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
 await ordinateursDB.addOne(newOrdinateur);
};

const recupererOrdinateurs = async () => {
 const ordinateurs = await ordinateursDB.getAll();
 return ordinateurs;
};

const trouverOrdinateur = async (serialNumber) => {
 try {
  const ordinateur = await ordinateursDB.findBySerialNumber(serialNumber);
  return ordinateur;
 } catch (e) {
  throw new Error(e);
 }
};

const affecterOrdinateur = async (serialNumber) => {
 if (serialNumber != undefined) {
  const ordi = await ordinateursDB.findBySerialNumber(serialNumber);
  console.log(ordi);
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

export default {
 creerOrdinateur,
 recupererOrdinateurs,
 trouverOrdinateur,
 affecterOrdinateur,
 retirerOrdinateur,
};
