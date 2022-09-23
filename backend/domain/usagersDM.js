import usagersDB from '../database/usagersDB.js';
import mongoose from 'mongoose';

const creerUsager = async (prenom, nom) => {
 console.log('--- usagerDM/creerUsager');
 const username = prenom.substring(0, 1) + nom;
 const newUsager = {
  username: username.toLowerCase(),
  prenom: prenom,
  nom: nom,
 };
 await usagersDB.addOne(newUsager);
};

const recupererUsagers = async () => {
 console.log('--- usagerDM/recupererUsagers');
 const usagers = await usagersDB.getAll();
 return usagers;
};

const recupererUsagerParId = async (id) => {
 console.log('--- usagerDM/recupererUsagerParId');
 try {
  const usager = await usagersDB.findUserById(id);
  return usager;
 } catch (e) {
  throw new Error('Usager not found');
 }
};

const recupererUsagerParUsername = async (username) => {
 console.log('--- usagerDM/recupererUsagerParUsername');
 try {
  const usager = await usagersDB.findByUsername(username);
  return usager;
 } catch (e) {
  throw new Error('Usager not found');
 }
};

const affecterAppareilAUsagerParId = async (usagerId, appareil) => {
 console.log('--- usagerDM/affecterAppareilAUsagerParId');
 if (appareil !== undefined) {
  let usager = await usagersDB.findUserById(usagerId);
  const appareilTrouve = usager.appareilsAffectes.filter(
   (app) => app.serialNumber === appareil.serialNumber
  );
  if (appareilTrouve[0] === undefined) usager.appareilsAffectes.push(appareil);
  try {
   await usagersDB.updateById(usagerId, usager);
  } catch (e) {
   throw new Error('User not found');
  }
 }
};

const retirerAppareilAUsagerParId = async (usagerId, appareil) => {
 console.log('--- usagerDM/retirerAppareilAUsagerParId');
 try {
  if (appareil !== undefined) {
   let usager = await usagersDB.findUserById(usagerId);
   const appareilTrouve = usager.appareilsAffectes.filter(
    (app) => app.serialNumber === appareil.serialNumber
   );
   if (appareilTrouve[0] !== undefined)
    usager.appareilsAffectes.map((appareil, index) =>
     usager.appareilsAffectes.splice(index, 1)
    );
   await usagersDB.updateById(usagerId, usager);
  }
 } catch (e) {
  throw new Error('User not found');
 }
};

export default {
 creerUsager,
 recupererUsagers,
 recupererUsagerParId,
 recupererUsagerParUsername,
 affecterAppareilAUsagerParId,
 retirerAppareilAUsagerParId,
};
