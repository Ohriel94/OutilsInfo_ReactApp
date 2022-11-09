import peripheriquesDB from '../../database/peripheriquesDB.js';

const creerPeripherique = async (serNb, mar, mod, dateAcqu, sys, proc, mem, disq, notes) => {
 const newPeripherique = {
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
 await peripheriquesDB.addOne(newPeripherique);
};

const recupererPeripheriques = async () => {
 const peripheriques = await peripheriquesDB.getAll();
 return peripheriques;
};

const recupererPeripheriqueParSerialNumber = async (serialNumber) => {
 try {
  const peripherique = await peripheriquesDB.findBySerialNumber(serialNumber);
  return peripherique;
 } catch (e) {
  throw new Error(e);
 }
};

const affecterPeripherique = async (serialNumber) => {
 if (serialNumber != undefined) {
  const peri = await peripheriquesDB.findBySerialNumber(serialNumber);
  peri.etatDisponible = false;
  await peripheriquesDB.updateById(peri._id, peri);
 }
};

const retirerPeripherique = async (serialNumber) => {
 if (serialNumber != undefined) {
  const peri = await peripheriquesDB.findBySerialNumber(serialNumber);
  peri.etatDisponible = true;
  await peripheriquesDB.updateById(peri._id, peri);
 }
};

export default {
 creerPeripherique,
 recupererPeripheriques,
 recupererPeripheriqueParSerialNumber,
 affecterPeripherique,
 retirerPeripherique,
};
