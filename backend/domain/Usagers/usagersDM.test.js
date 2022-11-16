import usagersDM from './usagersDM.js';
import usagersDB from '../../database/usagersDB.js';

jest.mock('../../database/usagersDB.js');

beforeEach(() => {
 usagersDB.getAll.mockClear();
 usagersDB.addOne.mockClear();
 usagersDB.updateById.mockClear();
 usagersDB.findUserById.mockClear();
 usagersDB.findByUsername.mockClear();
});

describe('recupererUsagers', () => {
 it('should call usagersDB', async () => {
  await usagersDM.recupererUsagers();
  expect(usagersDB.getAll).toHaveBeenCalledTimes(1);
 });

 it('should return content from DB', async () => {
  const expected = [
   {
    _id: 'supposed to be the _id of a user',
    prenom: 'Primus',
    nom: 'Resultus',
    appareilsAffectes: [],
   },
  ];
  usagersDB.getAll.mockImplementation(() => {
   return expected;
  });

  const actual = await usagersDM.recupererUsagers();
  expect(actual).toEqual(expected);
 });
});

describe('creerUsager', () => {
 const expected = {
  username: 'PRESULTUS',
  prenom: 'Primus',
  nom: 'Resultus',
  appareilsAffectes: [],
 };
 it('should call usagersDB 1 time', async () => {
  await usagersDM.creerUsager(expected.prenom, expected.nom);
  expect(usagersDB.addOne).toHaveBeenCalledTimes(1);
 });

 it('should have been called with the right parameters', async () => {
  await usagersDM.creerUsager(expected.prenom, expected.nom);
  expect(usagersDB.addOne).toHaveBeenCalledWith(expected);
 });
});

describe('recupererUsagerParId', () => {
 it('should call usagersDB 1 time', async () => {
  await usagersDM.recupererUsagerParId();
  expect(usagersDB.findUserById).toHaveBeenCalledTimes(1);
 });

 it('should call usagersDB with the right parameters', async () => {
  const expected = {
   _id: 'supposed to be the _id of a user',
   username: 'presultus',
   prenom: 'Primus',
   nom: 'Resultus',
   appareilsAffectes: [],
  };
  usagersDB.findUserById.mockImplementation(() => {
   return expected;
  });
  await usagersDM.recupererUsagerParId(expected._id);
  expect(usagersDB.findUserById).toHaveBeenCalledWith(expected._id);
 });

 it('should return the correct element from DB', async () => {
  const expected = {
   _id: 'supposed to be the _id of a user',
   username: 'presultus',
   prenom: 'Primus',
   nom: 'Resultus',
   appareilsAffectes: [],
  };
  usagersDB.findUserById.mockImplementation(() => {
   return expected;
  });
  const actual = await usagersDM.recupererUsagerParId(expected._id);
  expect(actual).toEqual(expected);
 });
});

describe('recupererUsagerParUsername', () => {
 it('should call usagersDB 1 time', async () => {
  const expected = {
   _id: 'supposed to be the _id of a user',
   username: 'presultus',
   prenom: 'Primus',
   nom: 'Resultus',
   appareilsAffectes: [],
  };
  usagersDB.findByUsername.mockImplementation(() => {
   return expected;
  });
  await usagersDM.recupererUsagerParUsername(expected.username);
  expect(usagersDB.findByUsername).toHaveBeenCalledTimes(1);
 });

 it('should call usagersDB with the right parameters', async () => {
  const expected = {
   _id: 'supposed to be the _id of a user',
   username: 'presultus',
   prenom: 'Primus',
   nom: 'Resultus',
   appareilsAffectes: [],
  };
  usagersDB.findByUsername.mockImplementation(() => {
   return expected;
  });
  await usagersDM.recupererUsagerParUsername(expected.username);
  expect(usagersDB.findByUsername).toHaveBeenCalledWith(expected.username);
 });

 it('should return the correct element from DB', async () => {
  const expected = {
   _id: 'supposed to be the _id of a user',
   username: 'presultus',
   prenom: 'Primus',
   nom: 'Resultus',
   appareilsAffectes: [],
  };
  usagersDB.findByUsername.mockImplementation(() => {
   return expected;
  });
  const actual = await usagersDM.recupererUsagerParUsername(expected.username);
  expect(actual).toEqual(expected);
 });
});

describe('affecterAppareilAUsagerParId', () => {
 const usager = {
  _id: 'supposed to be the _id of a user',
  username: 'presultus',
  prenom: 'Primus',
  nom: 'Resultus',
  appareilsAffectes: [],
 };
 const appareil = {
  _id: "ObjectId('supposed to be the _id of a device')",
  serialNumber: '9992',
  nom: 'Asus Alpha',
  etatDisponible: false,
  details: {
   configuration: {},
  },
 };
 it('should call usagersDB', async () => {
  await usagersDM.affecterAppareilAUsagerParId(usager._id, appareil);
  expect(usagersDB.findUserById).toHaveBeenCalledTimes(1);
  expect(usagersDB.updateById).toHaveBeenCalledTimes(1);
 });

 it('should have been called with the right parameter', async () => {
  usagersDB.findUserById.mockImplementation(() => {
   return usager;
  });
  await usagersDM.affecterAppareilAUsagerParId(usager._id, appareil);
  expect(usagersDB.findUserById).toHaveBeenCalledWith(usager._id);
  expect(usagersDB.updateById).toHaveBeenCalledWith(usager._id, usager);
 });
});

describe('retirerAppareilAUsagerParId', () => {
 const usager = {
  _id: 'supposed to be the _id of a user',
  username: 'presultus',
  prenom: 'Primus',
  nom: 'Resultus',
  appareilsAffectes: [],
 };
 const appareil = {
  _id: "ObjectId('1')",
  serialNumber: '9992',
  nom: 'Asus Alpha',
  etatDisponible: false,
  details: {
   configuration: {},
  },
 };
 it('should call usagersDB', async () => {
  await usagersDM.retirerAppareilAUsagerParId(usager._id, appareil);
  expect(usagersDB.findUserById).toHaveBeenCalledTimes(1);
  expect(usagersDB.updateById).toHaveBeenCalledTimes(1);
 });

 it('should have been called with the right parameter', async () => {
  usagersDB.findUserById.mockImplementation(() => {
   return usager;
  });
  await usagersDM.retirerAppareilAUsagerParId(usager._id, appareil);
  expect(usagersDB.findUserById).toHaveBeenCalledWith(usager._id);
  expect(usagersDB.updateById).toHaveBeenCalledWith(usager._id, usager);
 });
});
