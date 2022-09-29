import ordinateursDM from './ordinateursDM.js';
import ordinateursDB from '../database/ordinateursDB.js';

jest.mock('../database/ordinateursDB.js');

beforeEach(async () => {
 ordinateursDB.getAll.mockClear();
 ordinateursDB.addOne.mockClear();
 ordinateursDB.findBySerialNumber.mockClear();
 ordinateursDB.updateById.mockClear();
});

describe('recupererOrdinateurs', () => {
 const expected = [
  {
   serialNumber: '9991',
   nom: 'Asus Alpha',
   etatDisponible: true,
   details: {
    configuration: {},
   },
  },
  {
   serialNumber: '9992',
   nom: 'Asus Alpha',
   etatDisponible: true,
   details: {
    configuration: {},
   },
  },
  {
   serialNumber: '9993',
   nom: 'Asus Alpha',
   etatDisponible: true,
   details: {
    configuration: {},
   },
  },
 ];
 ordinateursDB.getAll.mockImplementation(() => {
  return expected;
 });

 it('should call ordinateursDB 1 time', async () => {
  await ordinateursDM.recupererOrdinateurs();
  expect(ordinateursDB.getAll).toHaveBeenCalledTimes(1);
 });

 it('should contain correct number of elements', async () => {
  const ordinateurs = await ordinateursDM.recupererOrdinateurs();
  expect(ordinateurs.length).toBe(3);
 });

 it('should return the correct elements from DB', async () => {
  const actual = await ordinateursDM.recupererOrdinateurs();
  expect(actual).toEqual(expected);
 });
});

describe('creerOrdinateur', () => {
 const expected = {
  serialNumber: '9991',
  nom: 'Asus Alpha',
  etatDisponible: true,
  details: {
   marque: 'Asus',
   modele: 'Alpha',
   dateAcquisition: '01/01/2000',
   configuration: {
    systeme: 'Windows 10 64x',
    processeur: 'intel core i7-1165G7 @ 2.80Ghz',
    memoire: '16',
    disque: '512',
   },
   notes: '',
  },
 };

 it('should call ordinateursDB 1 time', async () => {
  await ordinateursDM.creerOrdinateur(
   expected.serialNumber,
   expected.details.marque,
   expected.details.modele,
   expected.details.dateAcquisition,
   expected.details.configuration.systeme,
   expected.details.configuration.processeur,
   expected.details.configuration.memoire,
   expected.details.configuration.disque,
   expected.details.notes
  );
  expect(ordinateursDB.addOne).toHaveBeenCalledTimes(1);
 });

 it('should have been called with the right parameters', async () => {
  await ordinateursDM.creerOrdinateur(
   expected.serialNumber,
   expected.details.marque,
   expected.details.modele,
   expected.details.dateAcquisition,
   expected.details.configuration.systeme,
   expected.details.configuration.processeur,
   expected.details.configuration.memoire,
   expected.details.configuration.disque,
   expected.details.notes
  );
  expect(ordinateursDB.addOne).toHaveBeenCalledWith(expected);
 });
});

describe('recupererOrdinateurParSerialNumber', () => {
 it('should call ordinateursDB 1 time', async () => {
  await ordinateursDM.recupererOrdinateurParSerialNumber('9992');
  expect(ordinateursDB.findBySerialNumber).toHaveBeenCalledTimes(1);
 });

 it('should have been called with the right parameter', async () => {
  await ordinateursDM.recupererOrdinateurParSerialNumber('9992');
  expect(ordinateursDB.findBySerialNumber).toHaveBeenCalledWith('9992');
 });

 it('should return the correct elements from DB', async () => {
  const expected = {
   serialNumber: '9992',
   nom: 'Asus Alpha',
   etatDisponible: true,
   details: {
    configuration: {},
   },
  };
  ordinateursDB.findBySerialNumber.mockImplementation(() => {
   return expected;
  });
  const actual = await ordinateursDM.recupererOrdinateurParSerialNumber('9992');
  expect(actual).toEqual(expected);
 });
});

describe('affecterOrdinateur', () => {
 it('should call ordinateursDB', async () => {
  await ordinateursDM.affecterOrdinateur('9992');
  expect(ordinateursDB.findBySerialNumber).toHaveBeenCalledTimes(1);
  expect(ordinateursDB.updateById).toHaveBeenCalledTimes(1);
 });

 it('should have been called with the right parameter', async () => {
  const expected = {
   _id: "ObjectId('1')",
   serialNumber: '9992',
   nom: 'Asus Alpha',
   etatDisponible: false,
   details: {
    configuration: {},
   },
  };
  ordinateursDB.findBySerialNumber.mockImplementation(() => {
   return {
    _id: "ObjectId('1')",
    serialNumber: '9992',
    nom: 'Asus Alpha',
    etatDisponible: true,
    details: {
     configuration: {},
    },
   };
  });
  await ordinateursDM.affecterOrdinateur('9992');
  expect(ordinateursDB.findBySerialNumber).toHaveBeenCalledWith('9992');
  expect(ordinateursDB.updateById).toHaveBeenCalledWith(expected._id, expected);
 });
});

describe('retirerOrdinateur', () => {
 it('should call ordinateursDB', async () => {
  await ordinateursDM.retirerOrdinateur('9992');
  expect(ordinateursDB.findBySerialNumber).toHaveBeenCalledTimes(1);
  expect(ordinateursDB.updateById).toHaveBeenCalledTimes(1);
 });

 it('should have been called with the right parameter', async () => {
  const expected = {
   _id: "ObjectId('1')",
   serialNumber: '9992',
   nom: 'Asus Alpha',
   etatDisponible: true,
   details: {
    configuration: {},
   },
  };
  ordinateursDB.findBySerialNumber.mockImplementation(() => {
   return {
    _id: "ObjectId('1')",
    serialNumber: '9992',
    nom: 'Asus Alpha',
    etatDisponible: false,
    details: {
     configuration: {},
    },
   };
  });
  await ordinateursDM.retirerOrdinateur('9992');
  expect(ordinateursDB.findBySerialNumber).toHaveBeenCalledWith('9992');
  expect(ordinateursDB.updateById).toHaveBeenCalledWith(expected._id, expected);
 });
});
