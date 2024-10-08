import appareilsDB from '../../database/appareilsDB.js';

class Ordinateur {
 constructor(
  type,
  serNum,
  marque,
  modele,
  dateAcqu,
  dateSort,
  dateAnno,
  os,
  cpu,
  gpu,
  memoire,
  stockages,
  notes
 ) {
  this.type = type;
  this.serialNumber = serNum;
  this.etatDisponible = true;
  this.details = {
   marque: marque,
   modele: modele,
   dateAcquisition: dateAcqu,
   dateAnnonce: dateAnno,
   dateSortie: dateSort,
   configuration: {
    os: os,
    cpu: cpu,
    gpu: gpu,
    memoire: memoire,
    stockages: [...stockages],
   },
   notes: notes,
   piecesJointes: {},
  };
 }
}

class Cellulaire {
 constructor(
  type,
  serNum,
  marque,
  modele,
  dateAcqu,
  dateSort,
  dateAnno,
  os,
  cpu,
  gpu,
  memoire,
  stockages,
  notes
 ) {
  this.type = type;
  this.serialNumber = serNum;
  this.etatDisponible = true;
  this.details = {
   marque: marque,
   modele: modele,
   dateAcquisition: dateAcqu,
   dateAnnonce: dateAnno,
   dateSortie: dateSort,
   configuration: {
    os: os,
    cpu: cpu,
    gpu: gpu,
    memoire: memoire,
    stockages: [...stockages],
   },
   notes: notes,
   piecesJointes: {},
  };
 }
}

const creerAppareil = async (serNum, mar, mod, dateAcqu, os, proc, mem, disq, notes) => {
 const newAppareil = new Appareil(type, serNum, mar, mod, dateAcqu, os, proc, mem, disq, notes);

 const trouve = await appareilsDB.findBySerialNumber(newAppareil.serialNumber);
 try {
  if (trouve === undefined) await appareilsDB.addOne(newAppareil);
  else throw new Error('This serial number is already in use...');
 } catch (e) {
  console.error(e);
  throw e;
 }
};

const creerAppareils = async (
 qte,
 type,
 serNum,
 marque,
 modele,
 dateAcqu,
 dateAnno,
 dateSort,
 os,
 cpu,
 gpu,
 memoire,
 stockages,
 notes
) => {
 let quantite = qte === undefined ? 1 : qte;
 let arr = [];
 for (let i = 0; i < quantite; i++) {
  const trouve = await appareilsDB.findBySerialNumber(serNum + i);
  if (trouve === undefined) {
   switch (type) {
    case 'Ordinateur':
     arr.push(
      new Ordinateur(
       type,
       parseInt(serNum) + i,
       marque,
       modele,
       dateAcqu,
       dateAnno,
       dateSort,
       os,
       cpu,
       gpu,
       parseInt(memoire),
       stockages,
       notes
      )
     );
     break;
    case 'Cellulaire':
     arr.push(
      new Cellulaire(
       type,
       parseInt(serNum) + i,
       marque,
       modele,
       dateAcqu,
       dateAnno,
       dateSort,
       os,
       cpu,
       gpu,
       parseInt(memoire),
       stockages,
       notes
      )
     );
     break;
   }
  }
 }
 const result = await appareilsDB.addMany(arr);
};

const recupererAppareils = async () => {
 const appareils = await appareilsDB.getAll();
 return appareils;
};

const recupererAppareilsParType = async (type) => {
 try {
  const appareils = await appareilsDB.findByType(type);
  return appareils;
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
 Cellulaire,
 Ordinateur,
 creerAppareil,
 creerAppareils,
 editerAppareil,
 supprimerAppareil,
 recupererAppareils,
 recupererAppareilsParType,
 recupererAppareilParSerialNumber,
 recupererAppareilParId,
 affecterAppareil,
 retirerAppareil,
};
