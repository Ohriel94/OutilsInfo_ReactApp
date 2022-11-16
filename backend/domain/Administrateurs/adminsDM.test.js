import adminsDM from './adminsDM.js';
import adminsDB from '../../database/adminsDB.js';

jest.mock('../../database/adminsDB.js');

beforeEach(() => {
 adminsDB.getAll.mockClear();
 adminsDB.addOne.mockClear();
 adminsDB.findByEmail.mockClear();
 adminsDB.findById.mockClear();
 adminsDB.updateById.mockClear();
});

describe('creerAdmin', () => {
 it('should have been called 1 time', async () => {
  const expected = {
   prenom: 'Admus',
   nom: 'Unitus-Testus',
   email: 'abc@testmail.com',
   password: 'UnMotDePasse',
  };
  await adminsDM.creerAdmin(expected.prenom, expected.nom, expected.email, expected.password);
  expect(adminsDB.addOne).toHaveBeenCalledTimes(1);
 });

 it('should have been called with the right parameters', async () => {
  const expected = {
   prenom: 'Admus',
   nom: 'Unitus-Testus',
   email: 'abc@testmail.com',
   username: 'ATESTUS',
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
});

describe('recupererAdminParUsernameEtPassword', () => {
 it('should have been called 1 time', async () => {
  const expected = {
   prenom: 'Admus',
   nom: 'Unitus-Testus',
   email: 'abc@testmail.com',
   username: 'ATESTUS',
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
   prenom: 'Admus',
   nom: 'Unitus-Testus',
   email: 'abc@testmail.com',
   username: 'ATESTUS',
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
