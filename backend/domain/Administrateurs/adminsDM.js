import adminsDB from '../../database/adminsDB.js';

const creerAdmin = async (prenom, nom, email, password, flags) => {
 const newAdmin = {
  prenom: prenom,
  nom: nom,
  email: email.toLowerCase(),
  username: formaterUsername(prenom, nom),
  password: password,
  dateCreation: '2020-01-01',
  flags: flags,
 };
 const trouver = await trouverAdminParUsername(newAdmin.username);
 try {
  if (trouver === undefined) {
   await adminsDB.addOne(newAdmin);
  } else throw new Error('Already exist');
 } catch (e) {
  throw e;
 }
};

const supprimerAdmin = async (id) => {
 const response = await adminsDB.deleteOne(id);
 return response;
};

const recupererAdministrateurs = async () => {
 const administrateurs = await adminsDB.getAll();
 return administrateurs;
};

const recupererAdminParEmailEtPassword = async (email, password) => {
 const emailFormatted = email !== undefined ? email.toLowerCase() : undefined;
 try {
  const admin = await adminsDB.findByEmail(emailFormatted);
  if (admin !== undefined) if (admin.password === password) return admin;
 } catch (e) {
  throw e;
 }
};

const trouverAdminParId = async (id) => {
 try {
  const admin = await adminsDB.findById(id);
  if (admin !== undefined) return admin;
 } catch (e) {
  throw e;
 }
};

const trouverAdminParEmail = async (email) => {
 const emailFormatted = email !== undefined ? email.toLowerCase() : undefined;
 try {
  const admin = await adminsDB.findByEmail(emailFormatted);
  if (admin !== undefined) return admin;
 } catch (e) {
  throw e;
 }
};

const trouverAdminParUsername = async (username) => {
 try {
  const admin = await adminsDB.findByUsername(username);
  if (admin !== undefined) return admin;
 } catch (e) {
  throw e;
 }
};

const editerAdministrateur = async (nom, prenom, username, email, status) => {
 const usernameFormatted = username.toUpperCase();
 const emailFormatted = email.toLowerCase();
 try {
  const trouve = await adminsDB.findByEmail(emailFormatted);
  const stringId = trouve._id.toString();
  trouve.nom = nom;
  trouve.prenom = prenom;
  trouve.username = usernameFormatted;
  trouve.status = status;
  if (trouve !== undefined) adminsDB.updateById(stringId, trouve);
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
   prenom.split('-')[1].substring(0, 1).toUpperCase() +
   nom.toUpperCase();
 else username = prenom.substring(0, 1).toUpperCase() + nom.toUpperCase();
 return username;
};

export default {
 recupererAdministrateurs,
 creerAdmin,
 supprimerAdmin,
 trouverAdminParId,
 trouverAdminParEmail,
 trouverAdminParUsername,
 recupererAdminParEmailEtPassword,
 editerAdministrateur,
 formaterUsername,
};
