import adminsDM from './adminsDM.js';
import adminsDB from '../../database/adminsDB.js';

jest.mock('../../database/adminsDB.js');

beforeEach(() => {
 adminsDB.getAll.mockClear();
 adminsDB.addOne.mockClear();
 adminsDB.findByUsername.mockClear();
 adminsDB.findById.mockClear();
 adminsDB.updateById.mockClear();
});

describe('creerAdmins', () => {
 it('should have been called 1 time', async () => {
  const expected = {
   username: "Un nom d'utilisateur",
   password: 'Un mot de passe',
  };
  await adminsDM.creerAdmin(expected.username, expected.password);
  expect(adminsDB.addOne).toHaveBeenCalledTimes(1);
 });

 it('should have been called with the right parameters', async () => {
  const expected = {
   username: "Un nom d'utilisateur",
   password: 'Un mot de passe',
   status: {
    actif: true,
   },
  };
  await adminsDM.creerAdmin(expected.username, expected.password);
  expect(adminsDB.addOne).toHaveBeenCalledWith(expected);
 });
});

describe('recupererAdminParUsernameEtPassword', () => {
 it('should have been called 1 time', async () => {
  const expected = {
   username: "Un nom d'utilisateur",
   password: 'Un mot de passe',
  };
  await adminsDM.recupererAdminParUsernameEtPassword(
   expected.username,
   expected.password
  );
  expect(adminsDB.findByUsername).toHaveBeenCalledTimes(1);
 });

 it('should have been called with the right parameters', async () => {
  const expected = {
   username: "Un nom d'utilisateur",
   password: 'Un mot de passe',
  };
  await adminsDM.recupererAdminParUsernameEtPassword(
   expected.username,
   expected.password
  );
  expect(adminsDB.findByUsername).toHaveBeenCalledWith(expected.username);
 });

 it('should return the right element from DB', async () => {
  const expected = {
   username: "Un nom d'utilisateur",
   password: 'Un mot de passe',
   status: {
    actif: true,
   },
  };
  adminsDB.findByUsername.mockImplementation(() => {
   return expected;
  });
  const actual = await adminsDM.recupererAdminParUsernameEtPassword(
   expected.username,
   expected.password
  );
  expect(actual).toEqual(expected);
 });
});
