import administrateursDM from './administrateursDM.js';
import administrateursDB from '../../database/administrateursDB.js';

jest.mock('../../database/administrateursDB.js');

beforeEach(() => {
 administrateursDB.getAll.mockClear();
 administrateursDB.addOne.mockClear();
 administrateursDB.findByEmail.mockClear();
 administrateursDB.findById.mockClear();
 administrateursDB.updateById.mockClear();
});

describe('creerAdmin', () => {
 it('should have been called 1 time', async () => {
  const expected = {
   prenom: 'Admus',
   nom: 'Unitus-Testus',
   email: 'abc@testmail.com',
   password: 'UnMotDePasse',
  };
  await administrateursDM.creerAdmin(expected.prenom, expected.nom, expected.email, expected.password);
  expect(administrateursDB.addOne).toHaveBeenCalledTimes(1);
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
  await administrateursDM.creerAdmin(expected.prenom, expected.nom, expected.email, expected.password);
  expect(administrateursDB.addOne).toHaveBeenCalledWith(expected);
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
  administrateursDB.findByEmail.mockImplementation(() => {
   return expected;
  });
  await administrateursDM.recupererAdminParEmailEtPassword(expected.email, expected.password);
  expect(administrateursDB.findByEmail).toHaveBeenCalledTimes(1);
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
  administrateursDB.findByEmail.mockImplementation(() => {
   return expected;
  });
  await administrateursDM.recupererAdminParEmailEtPassword(expected.email, expected.password);
  expect(administrateursDB.findByEmail).toHaveBeenCalledWith(expected.email);
 });

 it('should return the right element from DB', async () => {
  const expected = {
   email: 'abc@testmail.com',
   password: 'UnMotDePasse',
  };
  administrateursDB.findByEmail.mockImplementation(() => {
   return expected;
  });
  const actual = await administrateursDM.recupererAdminParEmailEtPassword(expected.email, expected.password);
  expect(actual).toEqual(expected);
 });

 //  it('should throw an excepion if the provided email is wrong', async () => {
 //   const expected = {
 //    email: 'abc@testmail.com',
 //    password: 'UnMotDePasse',
 //   };
 //   expect(administrateursDM.recupererAdminParEmailEtPassword('bcd@testmail.com', expected.password)).resolves.toThrow(
 //    'Wrong email'
 //   );
 //  });
});
