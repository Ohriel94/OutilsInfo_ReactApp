import adminsDM from './adminsDM.js';
import adminsDB from '../../database/adminsDB.js';

jest.mock('../../database/adminsDB.js');

beforeEach(() => {
 adminsDB.getAll.mockClear();
 adminsDB.findById.mockClear();
 adminsDB.findByEmail.mockClear();
 adminsDB.findByUsername.mockClear();
 adminsDB.addOne.mockClear();
 adminsDB.updateById.mockClear();
});

describe('creerAdmin', () => {
 it('should have been called 1 time', async () => {
  const expected = {
   prenom: 'Adam',
   nom: 'Bastien-Charles',
   email: 'abc@testmail.com',
   password: 'UnMotDePasse',
  };
  await adminsDM.creerAdmin(expected.prenom, expected.nom, expected.email, expected.password);
  expect(adminsDB.addOne).toHaveBeenCalledTimes(1);
 });

 it('should have been called with the right parameters', async () => {
  const expected = {
   prenom: 'Adam',
   nom: 'Bastien-Charles',
   email: 'abc@testmail.com',
   username: 'ACHARLES',
   password: 'UnMotDePasse',
   dateCreation: new Date(),
   status: {
    actif: true,
    admin: true,
   },
  };
  await adminsDM.creerAdmin(expected.prenom, expected.nom, expected.email, expected.password);
  expect(adminsDB.addOne).toHaveBeenCalledWith(expected);
 });

 it('should return a username in upper case', async () => {
  const expected = {
   prenom: 'Adam',
   nom: 'Bastien-Charles',
   username: 'ACHARLES',
  };
  const actual = await adminsDM.formaterUsername(expected.prenom, expected.nom);
  expect(actual).toEqual(expected.username);
 });
});

describe('recupererAdminParUsernameEtPassword', () => {
 it('should have been called 1 time', async () => {
  const expected = {
   prenom: 'Adam',
   nom: 'Bastien-Charles',
   email: 'abc@testmail.com',
   username: 'ACHARLES',
   password: 'UnMotDePasse',
   dateCreation: new Date(),
   status: {
    actif: true,
    admin: true,
   },
  };
  adminsDB.findByEmail.mockImplementation(() => {
   return expected;
  });
  await adminsDM.recupererAdminParEmailEtPassword(expected.email, expected.password);
  expect(adminsDB.findByEmail).toHaveBeenCalledTimes(1);
 });

 it('should have been called with the right parameters', async () => {
  const expected = {
   prenom: 'Adam',
   nom: 'Bastien-Charles',
   email: 'abc@testmail.com',
   username: 'ACHARLES',
   password: 'UnMotDePasse',
   dateCreation: new Date(),
   status: {
    actif: true,
    admin: true,
   },
  };
  adminsDB.findByEmail.mockImplementation(() => {
   return expected;
  });
  await adminsDM.recupererAdminParEmailEtPassword(expected.email, expected.password);
  expect(adminsDB.findByEmail).toHaveBeenCalledWith(expected.email);
 });

 it('should return the right element from DB', async () => {
  const expected = {
   email: 'abc@testmail.com',
   password: 'UnMotDePasse',
  };
  adminsDB.findByEmail.mockImplementation(() => {
   return expected;
  });
  const actual = await adminsDM.recupererAdminParEmailEtPassword(expected.email, expected.password);
  expect(actual).toEqual(expected);
 });

 //  it('should throw an excepion if the provided email is wrong', async () => {
 //   const expected = {
 //    email: 'abc@testmail.com',
 //    password: 'UnMotDePasse',
 //   };
 //   expect(adminsDM.recupererAdminParEmailEtPassword('bcd@testmail.com', expected.password)).resolves.toThrow(
 //    'Wrong email'
 //   );
 //  });
});

describe('trouverAdminParId', () => {
 it('should have been called 1 time', async () => {
  const expected = {
   _id: 'an_admin_object_id',
   prenom: 'Adam',
   nom: 'Bastien-Charles',
   email: 'abc@testmail.com',
   username: 'ACHARLES',
   password: 'UnMotDePasse',
   dateCreation: new Date(),
   status: {
    actif: true,
    admin: true,
   },
  };
  adminsDB.findById.mockImplementation(() => {
   return expected;
  });
  await adminsDM.trouverAdminParId(expected._id);
  expect(adminsDB.findById).toHaveBeenCalledTimes(1);
 });

 it('should have been called with the right parameters', async () => {
  const expected = {
   _id: 'an_admin_object_id',
   prenom: 'Adam',
   nom: 'Bastien-Charles',
   email: 'abc@testmail.com',
   username: 'ACHARLES',
   password: 'UnMotDePasse',
   dateCreation: new Date(),
   status: {
    actif: true,
    admin: true,
   },
  };
  adminsDB.findById.mockImplementation(() => {
   return expected;
  });
  await adminsDM.trouverAdminParId(expected._id);
  expect(adminsDB.findById).toHaveBeenCalledWith(expected._id);
 });

 it('should return the right element from DB', async () => {
  const expected = {
   prenom: 'Adam',
   nom: 'Bastien-Charles',
   email: 'abc@testmail.com',
   username: 'ACHARLES',
   password: 'UnMotDePasse',
   dateCreation: new Date(),
   status: {
    actif: true,
    admin: true,
   },
  };
  adminsDB.findById.mockImplementation(() => {
   return expected;
  });
  const actual = await adminsDM.trouverAdminParId(expected._id);
  expect(actual).toEqual(expected);
 });
});

describe('trouverAdminParEmail', () => {
 it('should have been called 1 time', async () => {
  const expected = {
   prenom: 'Adam',
   nom: 'Bastien-Charles',
   email: 'abc@testmail.com',
   username: 'ACHARLES',
   password: 'UnMotDePasse',
   dateCreation: new Date(),
   status: {
    actif: true,
    admin: true,
   },
  };
  adminsDB.findByEmail.mockImplementation(() => {
   return expected;
  });
  await adminsDM.trouverAdminParEmail(expected.email);
  expect(adminsDB.findByEmail).toHaveBeenCalledTimes(1);
 });

 it('should have been called with the right parameters', async () => {
  const expected = {
   prenom: 'Adam',
   nom: 'Bastien-Charles',
   email: 'abc@testmail.com',
   username: 'ACHARLES',
   password: 'UnMotDePasse',
   dateCreation: new Date(),
   status: {
    actif: true,
    admin: true,
   },
  };
  adminsDB.findByEmail.mockImplementation(() => {
   return expected;
  });
  await adminsDM.trouverAdminParEmail(expected.email);
  expect(adminsDB.findByEmail).toHaveBeenCalledWith(expected.email);
 });

 it('should return the right element from DB', async () => {
  const expected = {
   prenom: 'Adam',
   nom: 'Bastien-Charles',
   email: 'abc@testmail.com',
   username: 'ACHARLES',
   password: 'UnMotDePasse',
   dateCreation: new Date(),
   status: {
    actif: true,
    admin: true,
   },
  };
  adminsDB.findByEmail.mockImplementation(() => {
   return expected;
  });
  const actual = await adminsDM.trouverAdminParEmail(expected.email);
  expect(actual).toEqual(expected);
 });
});

describe('trouverAdminParUsername', () => {
 it('should have been called 1 time', async () => {
  const expected = {
   prenom: 'Adam',
   nom: 'Bastien-Charles',
   email: 'abc@testmail.com',
   username: 'ACHARLES',
   password: 'UnMotDePasse',
   dateCreation: new Date(),
   status: {
    actif: true,
    admin: true,
   },
  };
  adminsDB.findByUsername.mockImplementation(() => {
   return expected;
  });
  await adminsDM.trouverAdminParUsername(expected.username);
  expect(adminsDB.findByUsername).toHaveBeenCalledTimes(1);
 });

 it('should have been called with the right parameters', async () => {
  const expected = {
   prenom: 'Adam',
   nom: 'Bastien-Charles',
   email: 'abc@testmail.com',
   username: 'ACHARLES',
   password: 'UnMotDePasse',
   dateCreation: new Date(),
   status: {
    actif: true,
    admin: true,
   },
  };
  adminsDB.findByUsername.mockImplementation(() => {
   return expected;
  });
  await adminsDM.trouverAdminParUsername(expected.username);
  expect(adminsDB.findByUsername).toHaveBeenCalledWith(expected.username);
 });

 it('should return the right element from DB', async () => {
  const expected = {
   prenom: 'Adam',
   nom: 'Bastien-Charles',
   email: 'abc@testmail.com',
   username: 'ACHARLES',
   password: 'UnMotDePasse',
   dateCreation: new Date(),
   status: {
    actif: true,
    admin: true,
   },
  };
  adminsDB.findByUsername.mockImplementation(() => {
   return expected;
  });
  const actual = await adminsDM.trouverAdminParUsername(expected.username);
  expect(actual).toEqual(expected);
 });
});

describe('editerAdministrateur', () => {
 it('should have been called 1 time', async () => {
  const expected = {
   _id: 'an_admin_object_id',
   prenom: 'Adam',
   nom: 'Bastien-Charles',
   email: 'abc@testmail.com',
   username: 'ACHARLES',
   password: 'UnMotDePasse',
   status: {
    actif: true,
    admin: true,
   },
  };
  adminsDB.findByEmail.mockImplementation(() => {
   return expected;
  });
  await adminsDM.editerAdministrateur(
   expected.nom,
   expected.prenom,
   expected.username,
   expected.email,
   expected.status
  );
  expect(adminsDB.findByEmail).toHaveBeenCalledTimes(1);
  expect(adminsDB.updateById).toHaveBeenCalledTimes(1);
 });

 it('should have been called with the right parameters', async () => {
  const expected = {
   _id: 'an_admin_object_id',
   nom: 'Bastien-Charles',
   prenom: 'Adam',
   email: 'abc@testmail.com',
   username: 'ACHARLES',
   password: 'UnMotDePasse',
   dateCreation: new Date(),
   status: {
    actif: true,
    admin: true,
   },
  };
  adminsDB.findByEmail.mockImplementation(() => {
   return expected;
  });
  await adminsDM.editerAdministrateur(
   expected.nom,
   'Daniel',
   expected.username,
   expected.email,
   expected.status
  );
  expect(adminsDB.updateById).toHaveBeenCalledWith(expected._id, expected);
  expect(adminsDB.findByEmail).toHaveBeenCalledWith(expected.email);
 });

 //  it('should return the right element from DB', async () => {
 //   const expected = {
 //    _id: 'an_admin_object_id',
 //    prenom: 'Adam',
 //    nom: 'Bastien-Charles',
 //    email: 'abc@testmail.com',
 //    username: 'ACHARLES',
 //    password: 'UnMotDePasse',
 //    dateCreation: new Date(),
 //    status: {
 //     actif: true,
 //     admin: true,
 //    },
 //   };
 //   adminsDB.findByEmail.mockImplementation(() => {
 //    adminsDM.editerAdministrateur(
 //     expected.nom,
 //    'Adam2',
 //     expected.username,
 //     expected.email,
 //     expected.status
 //    );
 //   });
 //   await adminsDM.editerAdministrateur(
 //    expected.nom,
 //    'Adam2',
 //    expected.username,
 //    expected.email,
 //    expected.status
 //   );
 //   const actual = await adminsDM.trouverAdminParEmail(expected.email);
 //   expect(actual).toEqual(expected);
 //  });
});
