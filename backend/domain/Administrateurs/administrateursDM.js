import administrateursDB from '../../database/administrateursDB.js';

const creerAdmin = async (prenom, nom, email, password) => {
 const newAdmin = {
  prenom: prenom,
  nom: nom,
  email: email.toLowerCase(),
  username: formaterUsername(prenom, nom),
  password: password,
  dateCreation: new Date(),
  status: {
   actif: true,
   admin: true,
  },
 };
 try {
  const trouve = await administrateursDB.findByEmail(newAdmin.email);
  if (trouve === undefined) await administrateursDB.addOne(newAdmin);
  else throw new Error('This user has already been added');
 } catch (e) {
  throw e;
 }
};

const recupererAdministrateurs = async () => {
 const administrateurs = await administrateursDB.getAll();
 return administrateurs;
};

const recupererAdminParEmailEtPassword = async (email, password) => {
 const emailFormatted = email !== undefined ? email.toLowerCase() : 'undefined@email.com';
 try {
  const admin = await administrateursDB.findByEmail(emailFormatted);
  if (admin !== undefined) if (admin.password === password) return admin;
 } catch (e) {
  throw e;
 }
};

// ============================= Utilitaires =============================
const formaterUsername = (prenom, nom) => {
 let username = '';
 if (nom.includes('-')) username = prenom.substring(0, 1).toUpperCase() + nom.split('-')[1].toUpperCase();
 else if (prenom.includes('-'))
  username =
   prenom.substring(0, 1).toUpperCase() +
   prenom
    .split('-')[1]
    .substring(0, 1)
    .toUpperCase() +
   nom.toUpperCase();
 else username = prenom.substring(0, 1).toUpperCase() + nom.toUpperCase();
 return username;
};

export default {
 creerAdmin,
 recupererAdministrateurs,
 recupererAdminParEmailEtPassword,
};
