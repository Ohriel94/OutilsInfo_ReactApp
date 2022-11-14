import usagersDB from '../../database/usagersDB.js';

const creerUsager = async (prenom, nom) => {
 const username = prenom.substring(0, 1) + nom;
 const newUsager = {
  username: username.toUpperCase(),
  prenom: prenom,
  nom: nom,
  appareilsAffectes: [],
 };
 await usagersDB.addOne(newUsager);
};

const recupererUsagers = async () => {
 const usagers = await usagersDB.getAll();
 return usagers;
};

const recupererUsagerParId = async (id) => {
 try {
  const usager = await usagersDB.findUserById(id);
  return usager;
 } catch (e) {
  throw new Error('Usager not found');
 }
};

const recupererUsagerParUsername = async (username) => {
 try {
  const usager = await usagersDB.findByUsername(username);
  return usager;
 } catch (e) {
  throw new Error('Usager not found');
 }
};

const affecterAppareilAUsagerParId = async (usagerId, appareil) => {
 try {
  if (appareil !== undefined) {
   let usager = await usagersDB.findUserById(usagerId);
   const appareilTrouve = usager.appareilsAffectes.filter(
    (app) => app.serialNumber === appareil.serialNumber
   );
   if (appareilTrouve[0] === undefined) usager.appareilsAffectes.push(appareil);
   await usagersDB.updateById(usagerId, usager);
  }
 } catch (e) {
  throw new Error('User not found');
 }
};

const retirerAppareilAUsagerParId = async (usagerId, appareil) => {
 try {
  if (appareil !== undefined) {
   let usager = await usagersDB.findUserById(usagerId);
   const appareilTrouve = usager.appareilsAffectes.filter(
    (app) => app.serialNumber === appareil.serialNumber
   );
   if (appareilTrouve[0] !== undefined)
    usager.appareilsAffectes.map((appareil, index) => usager.appareilsAffectes.splice(index, 1));
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
