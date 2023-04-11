import appareilsDM from '../domain/Appareils/appareilsDM.js';
import appareilsDB from '../database/appareilsDB.js';
import { ObjectId } from 'mongodb';

jest.mock('../database/appareilsDB.js');

beforeEach(async () => {
 appareilsDB.getAll.mockClear();
 appareilsDB.addOne.mockClear();
 appareilsDB.addMany.mockClear();
 appareilsDB.findBySerialNumber.mockClear();
 appareilsDB.findById.mockClear();
 appareilsDB.updateById.mockClear();
 appareilsDB.deleteOne.mockClear();
});

describe('Appareil', () => {
 const expected = {
  type: 'Ordinateur',
  serialNumber: 9991,
  etatDisponible: true,
  details: {
   marque: 'Dell',
   modele: 'Vostro 5502',
   dateAcquisition: '2020-01-01',
   dateSortie: '2015-01-01',
   dateAnnonce: '2010-01-01',
   configuration: {
    os: 'Windows 10 64x',
    cpu: 'intel core i7-1165G7 @ 2.80Ghz',
    gpu: 'nVidia RX3060 12GB',
    memoire: 16,
    stockages: [512, 2000],
   },
   notes: '',
   piecesJointes: {},
  },
 };
 let appareil = new appareilsDM.Appareil(
  expected.type,
  expected.serialNumber,
  expected.details.marque,
  expected.details.modele,
  expected.details.dateAcquisition,
  expected.details.dateSortie,
  expected.details.dateAnnonce,
  expected.details.configuration.os,
  expected.details.configuration.cpu,
  expected.details.configuration.gpu,
  expected.details.configuration.memoire,
  expected.details.configuration.stockages,
  expected.details.notes
 );

 it('should be defined', () => {
  expect(appareil).toBeDefined();
 });

 it('should return the right element', () => {
  expect(appareil).toEqual(expected);
 });
});

describe('recupererAppareils', () => {
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
 appareilsDB.getAll.mockImplementation(() => {
  return expected;
 });

 it('should call appareilsDB 1 time', async () => {
  await appareilsDM.recupererAppareils();
  expect(appareilsDB.getAll).toHaveBeenCalledTimes(1);
 });

 it('should contain correct number of elements', async () => {
  const appareils = await appareilsDM.recupererAppareils();
  expect(appareils.length).toBe(3);
 });

 it('should return the correct elements from DB', async () => {
  const actual = await appareilsDM.recupererAppareils();
  expect(actual).toEqual(expected);
 });
});

describe('creerAppareils', () => {
 const expected = [
  {
   type: 'Ordinateur',
   serialNumber: 9991,
   etatDisponible: true,
   details: {
    marque: 'Alpha',
    modele: 'Beta 123',
    dateAcquisition: '2020-01-01',
    dateAnnonce: '2010-01-01',
    dateSortie: '2010-01-01',
    configuration: {
     os: 'Windows 10 64x',
     cpu: 'intel core i7-1165G7 @ 2.80Ghz',
     gpu: 'Prototype RX8400 32GB',
     memoire: 16,
     stockages: [512, 2000],
    },
    notes: '',
    piecesJointes: {},
   },
  },
  {
   type: 'Ordinateur',
   serialNumber: 9992,
   etatDisponible: true,
   details: {
    marque: 'Alpha',
    modele: 'Beta 123',
    dateAcquisition: '2020-01-01',
    dateAnnonce: '2010-01-01',
    dateSortie: '2010-01-01',
    configuration: {
     os: 'Windows 10 64x',
     cpu: 'intel core i7-1165G7 @ 2.80Ghz',
     gpu: 'Prototype RX8400 32GB',
     memoire: 16,
     stockages: [512, 2000],
    },
    notes: '',
    piecesJointes: {},
   },
  },
 ];

 it('should call appareilsDB 1 time', async () => {
  await appareilsDM.creerAppareils(
   1,
   expected[0].type,
   expected[0].serialNumber,
   expected[0].details.marque,
   expected[0].details.modele,
   expected[0].details.dateAcquisition,
   expected[0].details.dateAnnonce,
   expected[0].details.dateSortie,
   expected[0].details.configuration.os,
   expected[0].details.configuration.cpu,
   expected[0].details.configuration.gpu,
   expected[0].details.configuration.memoire,
   expected[0].details.configuration.stockages,
   expected[0].details.notes
  );
  expect(appareilsDB.addMany).toHaveBeenCalledTimes(1);
 });

 it('should have been called with the right parameters', async () => {
  await appareilsDM.creerAppareils(
   2,
   expected[0].type,
   expected[0].serialNumber,
   expected[0].details.marque,
   expected[0].details.modele,
   expected[0].details.dateAcquisition,
   expected[0].details.dateAnnonce,
   expected[0].details.dateSortie,
   expected[0].details.configuration.os,
   expected[0].details.configuration.cpu,
   expected[0].details.configuration.gpu,
   expected[0].details.configuration.memoire,
   expected[0].details.configuration.stockages,
   expected[0].details.notes
  );
  expect(appareilsDB.addMany).toHaveBeenCalledWith(expected);
 });
});

describe('recupererAppareilParSerialNumber', () => {
 it('should call appareilsDB 1 time', async () => {
  await appareilsDM.recupererAppareilParSerialNumber('9992');
  expect(appareilsDB.findBySerialNumber).toHaveBeenCalledTimes(1);
 });

 it('should have been called with the right parameter', async () => {
  await appareilsDM.recupererAppareilParSerialNumber('9992');
  expect(appareilsDB.findBySerialNumber).toHaveBeenCalledWith('9992');
 });

 it('should return the correct elements from DB', async () => {
  const expected = {
   serialNumber: '9992',
   etatDisponible: true,
   details: {
    configuration: {},
   },
  };
  appareilsDB.findBySerialNumber.mockImplementation(() => {
   return expected;
  });
  const actual = await appareilsDM.recupererAppareilParSerialNumber('9992');
  expect(actual).toEqual(expected);
 });
});

describe('recupererAppareilParId', () => {
 it('should call appareilsDB 1 time', async () => {
  await appareilsDM.recupererAppareilParId('112233aabbcc');
  expect(appareilsDB.findById).toHaveBeenCalledTimes(1);
 });

 it('should have been called with the right parameter', async () => {
  await appareilsDM.recupererAppareilParId('112233aabbcc');
  expect(appareilsDB.findById).toHaveBeenCalledWith('112233aabbcc');
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
  appareilsDB.findById.mockImplementation(() => {
   return expected;
  });
  const actual = await appareilsDM.recupererAppareilParId('112233aabbcc');
  expect(actual).toEqual(expected);
 });
});

describe('affecterAppareil', () => {
 it('should call appareilsDB', async () => {
  await appareilsDM.affecterAppareil('9992');
  expect(appareilsDB.findBySerialNumber).toHaveBeenCalledTimes(1);
  expect(appareilsDB.updateById).toHaveBeenCalledTimes(1);
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
  appareilsDB.findBySerialNumber.mockImplementation(() => {
   return {
    _id: ObjectId('112233aabbcc'),
    serialNumber: '9992',
    etatDisponible: true,
    details: {
     configuration: {},
    },
   };
  });
  await appareilsDM.affecterAppareil('9992');
  expect(appareilsDB.findBySerialNumber).toHaveBeenCalledWith('9992');
  expect(appareilsDB.updateById).toHaveBeenCalledWith(expected._id, expected);
 });
});

describe('retirerAppareil', () => {
 it('should call appareilsDB', async () => {
  await appareilsDM.retirerAppareil('9992');
  expect(appareilsDB.findBySerialNumber).toHaveBeenCalledTimes(1);
  expect(appareilsDB.updateById).toHaveBeenCalledTimes(1);
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
  appareilsDB.findBySerialNumber.mockImplementation(() => {
   return {
    _id: ObjectId('112233aabbcc'),
    serialNumber: '9992',
    etatDisponible: false,
    details: {
     configuration: {},
    },
   };
  });
  await appareilsDM.retirerAppareil('9992');
  expect(appareilsDB.findBySerialNumber).toHaveBeenCalledWith('9992');
  expect(appareilsDB.updateById).toHaveBeenCalledWith(expected._id, expected);
 });

 it('should have setted appareil.etatDisponible to true', async () => {
  const expected = {
   _id: ObjectId('112233aabbcc'),
   serialNumber: '9992',
   etatDisponible: true,
   details: {
    configuration: {},
   },
  };
  const appareil = expected;
  appareil.etatDisponible = false;
  appareilsDB.addOne(appareil);
  await appareilsDM.retirerAppareil('9992');
  const actual = await appareilsDB.findBySerialNumber('9992');
  expect(actual.etatDisponible).toEqual(expected.etatDisponible);
 });
});

describe('supprimerAppareil', () => {
 it('should call appareilsDB', async () => {
  await appareilsDM.supprimerAppareil('11223344aabbccdd');
  expect(appareilsDB.findById).toHaveBeenCalledTimes(1);
  expect(appareilsDB.deleteOne).toHaveBeenCalledTimes(1);
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
  await appareilsDM.supprimerAppareil(expected._id);
  expect(appareilsDB.findById).toHaveBeenCalledWith(expected._id);
  expect(appareilsDB.deleteOne).toHaveBeenCalledWith(expected._id);
 });
});
