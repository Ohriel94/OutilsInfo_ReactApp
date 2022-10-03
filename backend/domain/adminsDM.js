import adminsDB from '../database/adminsDB.js';

const creerAdmin = async (name, password) => {
 const newAdmin = {
  name,
  password,
  status: {
   actif: true,
  },
 };
 await adminsDB.addOne(newAdmin);
};

const recupererAdministrateurParNomEtMotDePasse = async (name, password) => {
 console.log(await adminsDB.findByName(name));
 try {
  const admin = await adminsDB.findByName(name);
  if (admin !== undefined && admin.password === password) return admin;
 } catch (e) {
  throw new Error('Wrong name or password');
 }
};

export default {
 creerAdmin,
 recupererAdministrateurParNomEtMotDePasse,
};
