import ordinateursDM from './ordinateursDM.js';
import ordinateursDB from '../../database/ordinateursDB.js';
import { ObjectId } from 'mongodb';

jest.mock('../../database/ordinateursDB.js');

beforeEach(async () => {
 ordinateursDB.getAll.mockClear();
 ordinateursDB.addOne.mockClear();
 ordinateursDB.findBySerialNumber.mockClear();
 ordinateursDB.findById.mockClear();
 ordinateursDB.updateById.mockClear();
 ordinateursDB.deleteOne.mockClear();
});

describe('recupererOrdinateurs', () => {
 const expected = [
  {
   serialNumber: '9991',
   etatDisponible: true,
   details: {
    configuration: {},
   },
  },
  {
   serialNumber: '9992',
   etatDisponible: true,
   details: {
    configuration: {},
   },
  },
  {
   serialNumber: '9993',
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

describe('recupererOrdinateurParId', () => {
 it('should call ordinateursDB 1 time', async () => {
  await ordinateursDM.recupererOrdinateurParId('112233aabbcc');
  expect(ordinateursDB.findById).toHaveBeenCalledTimes(1);
 });

 it('should have been called with the right parameter', async () => {
  await ordinateursDM.recupererOrdinateurParId('112233aabbcc');
  expect(ordinateursDB.findById).toHaveBeenCalledWith('112233aabbcc');
 });

 it('should return the correct elements from DB', async () => {
  const expected = {
   _id: ObjectId('112233aabbcc'),
   serialNumber: '9992',
   etatDisponible: true,
   details: {
    configuration: {},
   },
  };
  ordinateursDB.findById.mockImplementation(() => {
   return expected;
  });
  const actual = await ordinateursDM.recupererOrdinateurParId('112233aabbcc');
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
   _id: ObjectId('112233aabbcc'),
   serialNumber: '9992',
   etatDisponible: false,
   details: {
    configuration: {},
   },
  };
  ordinateursDB.findBySerialNumber.mockImplementation(() => {
   return {
    _id: ObjectId('112233aabbcc'),
    serialNumber: '9992',
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
   _id: ObjectId('112233aabbcc'),
   serialNumber: '9992',
   etatDisponible: true,
   details: {
    configuration: {},
   },
  };
  ordinateursDB.findBySerialNumber.mockImplementation(() => {
   return {
    _id: ObjectId('112233aabbcc'),
    serialNumber: '9992',
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

 it('should have setted ordinateur.etatDisponible to true', async () => {
  const expected = {
   _id: ObjectId('112233aabbcc'),
   serialNumber: '9992',
   etatDisponible: true,
   details: {
    configuration: {},
   },
  };
  const ordinateur = expected;
  ordinateur.etatDisponible = false;
  ordinateursDB.addOne(ordinateur);
  await ordinateursDM.retirerOrdinateur('9992');
  const actual = await ordinateursDB.findBySerialNumber('9992');
  expect(actual.etatDisponible).toEqual(expected.etatDisponible);
 });
});

describe('supprimerOrdinateur', () => {
 it('should call ordinateursDB', async () => {
  await ordinateursDM.supprimerOrdinateur('11223344aabbccdd');
  expect(ordinateursDB.findById).toHaveBeenCalledTimes(1);
  expect(ordinateursDB.deleteOne).toHaveBeenCalledTimes(1);
 });

 it('should have been called with the right parameter', async () => {
  const expected = {
   _id: ObjectId('112233aabbcc'),
   serialNumber: '9992',
   etatDisponible: true,
   details: {
    configuration: {},
   },
  };
  await ordinateursDM.supprimerOrdinateur(expected._id);
  expect(ordinateursDB.findById).toHaveBeenCalledWith(expected._id);
  expect(ordinateursDB.deleteOne).toHaveBeenCalledWith(expected._id);
 });
});
