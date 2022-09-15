import usagersDB from '../database/usagersDB.js';
import mongoose from 'mongoose';

const creerUsager = async (prenom, nom) => {
 console.log('--- usagerDM/creerUsager');
 const pseudo = prenom.substring(0, 1) + nom;
 const newUsager = {
  pseudo: pseudo.toLowerCase(),
  prenom: prenom,
  nom: nom,
 };
 await usagersDB.addUsager(newUsager);
};

const recupererOrdinateurDeUsager = async (username) => {
 console.log('--- usagerDM/recupererOrdinateurDeUsager');
 try {
  const usager = await usagersDB.findByName(username);
  return usager.appareils;
 } catch (e) {
  throw new Error('Usager not found');
 }
};

const recupererUsagers = async () => {
 console.log('--- usagerDM/getUsers');
 const usagers = await usagersDB.getUsers();
 return usagers;
};

const recupererUsagerParId = async (_id) => {
 console.log('--- usagerDM/recupererUsagerParId');
 try {
  const usager = await usagersDB.findUserById(_id);
  return usager;
 } catch (e) {
  throw new Error('Usager not found');
 }
};

const affecterAppareilAUsager = async (usagerId, appareil) => {
 console.log('--- usagerDM/affecterAppareilAUsager');
 if (appareil !== undefined) {
  console.log(appareil !== undefined);
  let usager = await usagersDB.findUserById(usagerId);
  console.log(
   !usager.appareilsAffectes.includes(appareil)
    ? `${appareil.serialNumber} a été trouvé...`
    : `${appareil.ser0ialNumber} n'a pas été trouvé...`
  );
  const trouvé = usager.appareilsAffectes.filter(
   (app) => app.serialNumber === appareil.serialNumber
  );
  console.log(trouvé[0]);
  if (trouvé[0] === undefined) usager.appareilsAffectes.push(appareil);
  console.log(usager);
  try {
   await usagersDB.updateById(usagerId, usager);
  } catch (e) {
   throw new Error('User not found');
  }
 } else usagersDB.updateDevicesOfUser(usagerId, []);
};

const retirerAppareilAUsager = async (usagerId, appareil) => {
 console.log('--- usagerDM/retirerAppareilAUsager');
 try {
  if (appareil !== undefined) {
   let usager = await usagersDB.findUserById(usagerId);
   console.log(
    !usager.appareilsAffectes.includes(appareil)
     ? `${appareil.serialNumber} a été trouvé...`
     : `${appareil.serialNumber} n'a pas été trouvé...`
   );
   const trouvé = usager.appareilsAffectes.filter(
    (app) => app.serialNumber === appareil.serialNumber
   );
   console.log(trouvé[0]);
   if (trouvé[0] !== undefined)
    usager.appareilsAffectes.map((appareil, index) =>
     usager.appareilsAffectes.splice(index, 1)
    );
   console.log(usager.appareilsAffectes);
   await usagersDB.updateById(usagerId, usager);
  }
 } catch (e) {
  throw new Error('User not found');
 }
};

export default {
 creerUsager,
 recupererUsagers,
 recupererOrdinateurDeUsager,
 recupererUsagerParId,
 affecterAppareilAUsager,
 retirerAppareilAUsager,
};
