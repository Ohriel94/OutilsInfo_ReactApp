import adminsDB from '../../database/adminsDB.js';

const creerAdmin = async (prenom, nom, email, password) => {
 const newAdmin = {
  prenom: prenom,
  nom: nom,
  email: email,
  username: formaterUsername(prenom, nom),
  password: password,
  dateCreation: new Date(),
  status: {
   actif: true,
   admin: true,
  },
 };
 try {
  const trouve = await adminsDB.findByUsername(newAdmin.username);
  if (trouve === undefined) await adminsDB.addOne(newAdmin);
  else throw new Error('This user has already been added');
 } catch (e) {
  throw e;
 }
};

const recupererAdminParUsernameEtPassword = async (username, password) => {
 try {
  const admin = await adminsDB.findByUsername(username);
  if (admin !== undefined && admin.password === password) return admin;
  else throw new Error('Wrong username or password');
 } catch (e) {
  throw e;
 }
};

// ============================= Utilitaires =============================

const formaterUsername = (prenom, nom) => {
 const username = prenom.substring(0, 1).toUpperCase() + nom.split('-')[1].toUpperCase();
 return username;
};

export default {
 creerAdmin,
 recupererAdminParUsernameEtPassword,
};
