import cellulairesDB from '../../database/cellulairesDB.js';

const creerCellulaire = async (
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
 const newCellulaire = {
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
 await cellulairesDB.addOne(newCellulaire);
};

const recupererCellulaires = async () => {
 const cellulaires = await cellulairesDB.getAll();
 return cellulaires;
};

const recupererCellulaireParSerialNumber = async (serialNumber) => {
 try {
  const cellulaire = await cellulairesDB.findBySerialNumber(serialNumber);
  return cellulaire;
 } catch (e) {
  throw new Error(e);
 }
};

const affecterCellulaire = async (serialNumber) => {
 if (serialNumber != undefined) {
  const ordi = await cellulairesDB.findBySerialNumber(serialNumber);
  ordi.etatDisponible = false;
  console.log(ordi);
  await cellulairesDB.updateById(ordi._id, ordi);
 }
};

const retirerCellulaire = async (serialNumber) => {
 if (serialNumber != undefined) {
  const ordi = await cellulairesDB.findBySerialNumber(serialNumber);
  ordi.etatDisponible = true;
  console.log(ordi);
  await cellulairesDB.updateById(ordi._id, ordi);
 }
};

export default {
 creerCellulaire,
 recupererCellulaires,
 recupererCellulaireParSerialNumber,
 affecterCellulaire,
 retirerCellulaire,
};
