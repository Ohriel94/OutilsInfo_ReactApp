import appareilsDB from '../../database/appareilsDB.js';

const creerAppareil = async (serNum, mar, mod, dateAcqu, sys, proc, mem, disq, notes) => {
 const newAppareil = {
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
 const trouve = await appareilsDB.findBySerialNumber(newAppareil.serialNumber);
 try {
  if (trouve === undefined) await appareilsDB.addOne(newAppareil);
  else throw new Error('This serial number is already in use...');
 } catch (e) {
  throw e;
 }
};

const creerAppareils = async (qte, typ, serNum, mar, mod, dateAcqu, sys, proc, mem, disq, notes) => {
 let quantite = qte === undefined ? 1 : qte;
 let arr = [];
 for (let i = 0; i < quantite; i++) {
  const trouve = await appareilsDB.findBySerialNumber(serNum + i);
  console.log('Found : ', trouve._id);
  if (trouve === undefined) {
   arr.push({
    serialNumber: serNum + i,
    type: typ,
    etatDisponible: true,
    details: {
     marque: mar,
     modele: mod,
     dateAcquisition: dateAcqu,
     configuration: {
      systeme: sys,
      processeur: proc,
      memoire: mem,
      disques: [...disq],
     },
     notes: notes,
    },
    piecesJointes: {},
   });
  }
 }
 console.log('[AppDM] Length :', arr.length);
 const result = await appareilsDB.addMany(arr);
 console.log('[AppDM] Result :', result);
};

const recupererAppareils = async () => {
 const appareils = await appareilsDB.getAll();
 return appareils;
};

const recupererAppareilParType = async (type) => {
 try {
  const appareil = await appareilsDB.findByType(type);
  return appareil;
 } catch (e) {
  throw new Error(e);
 }
};

const recupererAppareilParSerialNumber = async (serialNumber) => {
 try {
  const appareil = await appareilsDB.findBySerialNumber(serialNumber);
  return appareil;
 } catch (e) {
  throw new Error(e);
 }
};

const recupererAppareilParId = async (id) => {
 try {
  const appareil = await appareilsDB.findById(id);
  return appareil;
 } catch (e) {
  throw new Error(e);
 }
};

const editerAppareil = async (id, serNum, mar, mod, dateAcqu, sys, proc, mem, disq, notes) => {
 try {
  const trouve = await appareilsDB.findById(id);
  if (trouve !== undefined) {
   if (serNum !== trouve.serialNumber) trouve.serialNumber = serNum;
   if (mar !== trouve.details.marque) trouve.details.marque = mar;
   if (mod !== trouve.details.modele) trouve.details.modele = mod;
   if (dateAcqu !== trouve.details.dateAcquisition) trouve.details.dateAcquisition = dateAcqu;
   if (sys !== trouve.details.configuration.systeme) trouve.details.configuration.systeme = sys;
   if (proc !== trouve.details.configuration.processeur) trouve.details.configuration.processeur = proc;
   if (mem !== trouve.details.configuration.memoire) trouve.details.configuration.memoire = mem;
   if (disq !== trouve.details.configuration.disque) trouve.details.configuration.disque = disq;
   if (notes !== trouve.details.notes) trouve.details.notes = notes;
   await appareilsDB.updateById(trouve._id, trouve);
  }
 } catch (e) {
  throw new Error(e);
 }
};

const affecterAppareil = async (serialNumber) => {
 if (serialNumber != undefined) {
  const ordi = await appareilsDB.findBySerialNumber(serialNumber);
  ordi.etatDisponible = false;
  await appareilsDB.updateById(ordi._id, ordi);
 }
};

const retirerAppareil = async (serialNumber) => {
 if (serialNumber != undefined) {
  const ordi = await appareilsDB.findBySerialNumber(serialNumber);
  ordi.etatDisponible = true;
  await appareilsDB.updateById(ordi._id, ordi);
 }
};

const supprimerAppareil = async (id) => {
 try {
  const trouve = await appareilsDB.findById(id);
  if (trouve !== undefined) await appareilsDB.deleteOne(id);
  else throw new Error('This serial number is already in use...');
 } catch (e) {
  throw e;
 }
};

export default {
 creerAppareil,
 creerAppareils,
 editerAppareil,
 supprimerAppareil,
 recupererAppareils,
 recupererAppareilParType,
 recupererAppareilParSerialNumber,
 recupererAppareilParId,
 affecterAppareil,
 retirerAppareil,
};
