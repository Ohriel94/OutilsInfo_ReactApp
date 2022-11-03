import moniteursDM from './moniteursDM.js';
import moniteursDB from '../../database/moniteursDB.js';

jest.mock('../../database/moniteursDB.js');

beforeEach(async () => {
 moniteursDB.getAll.mockClear();
 moniteursDB.addOne.mockClear();
 moniteursDB.findBySerialNumber.mockClear();
 moniteursDB.updateById.mockClear();
});

describe('recupererMoniteurs', () => {
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
 moniteursDB.getAll.mockImplementation(() => {
  return expected;
 });

 it('should call moniteursDB 1 time', async () => {
  await moniteursDM.recupererMoniteurs();
  expect(moniteursDB.getAll).toHaveBeenCalledTimes(1);
 });

 it('should contain correct number of elements', async () => {
  const moniteurs = await moniteursDM.recupererMoniteurs();
  expect(moniteurs.length).toBe(3);
 });

 it('should return the correct elements from DB', async () => {
  const actual = await moniteursDM.recupererMoniteurs();
  expect(actual).toEqual(expected);
 });
});

describe('creerMoniteur', () => {
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

 it('should call moniteursDB 1 time', async () => {
  await moniteursDM.creerMoniteur(
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
  expect(moniteursDB.addOne).toHaveBeenCalledTimes(1);
 });

 it('should have been called with the right parameters', async () => {
  await moniteursDM.creerMoniteur(
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
  expect(moniteursDB.addOne).toHaveBeenCalledWith(expected);
 });
});

describe('recupererMoniteurParSerialNumber', () => {
 it('should call moniteursDB 1 time', async () => {
  await moniteursDM.recupererMoniteurParSerialNumber('9992');
  expect(moniteursDB.findBySerialNumber).toHaveBeenCalledTimes(1);
 });

 it('should have been called with the right parameter', async () => {
  await moniteursDM.recupererMoniteurParSerialNumber('9992');
  expect(moniteursDB.findBySerialNumber).toHaveBeenCalledWith('9992');
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
  moniteursDB.findBySerialNumber.mockImplementation(() => {
   return expected;
  });
  const actual = await moniteursDM.recupererMoniteurParSerialNumber('9992');
  expect(actual).toEqual(expected);
 });
});

describe('affecterMoniteur', () => {
 it('should call moniteursDB', async () => {
  await moniteursDM.affecterMoniteur('9992');
  expect(moniteursDB.findBySerialNumber).toHaveBeenCalledTimes(1);
  expect(moniteursDB.updateById).toHaveBeenCalledTimes(1);
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
  moniteursDB.findBySerialNumber.mockImplementation(() => {
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
  await moniteursDM.affecterMoniteur('9992');
  expect(moniteursDB.findBySerialNumber).toHaveBeenCalledWith('9992');
  expect(moniteursDB.updateById).toHaveBeenCalledWith(expected._id, expected);
 });
});

describe('retirerMoniteur', () => {
 it('should call moniteursDB', async () => {
  await moniteursDM.retirerMoniteur('9992');
  expect(moniteursDB.findBySerialNumber).toHaveBeenCalledTimes(1);
  expect(moniteursDB.updateById).toHaveBeenCalledTimes(1);
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
  moniteursDB.findBySerialNumber.mockImplementation(() => {
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
  await moniteursDM.retirerMoniteur('9992');
  expect(moniteursDB.findBySerialNumber).toHaveBeenCalledWith('9992');
  expect(moniteursDB.updateById).toHaveBeenCalledWith(expected._id, expected);
 });
});
