import adminsDB from '../../database/adminsDB.js';

const creerAdmin = async (username, password) => {
 const newAdmin = {
  username,
  password,
  status: {
   actif: true,
  },
 };
 await adminsDB.addOne(newAdmin);
};

const recupererAdminParUsernameEtPassword = async (username, password) => {
 try {
  const admin = await adminsDB.findByUsername(username);
  if (admin !== undefined && admin.password === password) return admin;
 } catch (e) {
  throw new Error('Wrong username or password');
 }
};

export default {
 creerAdmin,
 recupererAdminParUsernameEtPassword,
};
