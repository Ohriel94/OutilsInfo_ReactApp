import adminsDB from '../../database/adminsDB.js';
import Toolbox from '../Toolbox.js';

const creerAdmin = async (prenom, nom, email, password) => {
 const newAdmin = {
  prenom: prenom,
  nom: nom,
  email: email,
  username: Toolbox.formaterUsername(prenom, nom),
  password: password,
  dateCreation: new Date(),
  status: {
   actif: true,
   admin: true,
  },
 };
 try {
  const trouve = await adminsDB.findByUsername(newAdmin.pseudo);
  if (trouve !== undefined && trouve.email === newAdmin.email) await adminsDB.addOne(newAdmin);
  else throw new Error('This user has already been added');
 } catch (e) {
  console.log(e.message);
  throw e;
 }
};

const recupererAdminParUsernameEtPassword = async (username, password) => {
 try {
  const admin = await adminsDB.findByUsername(username);
  if (admin !== undefined && admin.password === password) return admin;
  else throw new Error('Wrong username or password');
 } catch (e) {
  console.log(e.message);
  throw e;
 }
};

export default {
 creerAdmin,
 recupererAdminParUsernameEtPassword,
};
