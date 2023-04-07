import appareilsDM from './appareilsDM.js';
import appareilsDB from '../../database/appareilsDB.js';
import { ObjectId } from 'mongodb';

jest.mock('../../database/appareilsDB.js');

beforeEach(async () => {
 appareilsDB.getAll.mockClear();
 appareilsDB.addOne.mockClear();
 appareilsDB.addMany.mockClear();
 appareilsDB.updateById.mockClear();
 appareilsDB.deleteOne.mockClear();
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

describe('creerAppareils (Ordinateur)', () => {
 const expected = [
  {
   type: 'Ordinateur',
   serialNumber: 9991,
   etatDisponible: true,
   details: {
    marque: 'Asus',
    modele: 'Alpha',
    dateAcquisition: '01/01/2000',
    dateAnnonce: '01/01/2000',
    dateSortie: '01/01/2000',
    configuration: {
     os: 'Windows 10 64x',
     cpu: 'intel core i7-1165G7 @ 2.80Ghz',
     gpu: 'Prototype HK7880 64GB',
     memoire: 16,
     stockages: [256, 2000, 2000],
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
    marque: 'Asus',
    modele: 'Alpha',
    dateAcquisition: '01/01/2000',
    dateAnnonce: '01/01/2000',
    dateSortie: '01/01/2000',
    configuration: {
     os: 'Windows 10 64x',
     cpu: 'intel core i7-1165G7 @ 2.80Ghz',
     gpu: 'Prototype HK7880 64GB',
     memoire: 16,
     stockages: [256, 2000, 2000],
    },
    notes: '',
    piecesJointes: {},
   },
  },
  {
   type: 'Ordinateur',
   serialNumber: 9993,
   etatDisponible: true,
   details: {
    marque: 'Asus',
    modele: 'Alpha',
    dateAcquisition: '01/01/2000',
    dateAnnonce: '01/01/2000',
    dateSortie: '01/01/2000',
    configuration: {
     os: 'Windows 10 64x',
     cpu: 'intel core i7-1165G7 @ 2.80Ghz',
     gpu: 'Prototype HK7880 64GB',
     memoire: 16,
     stockages: [256, 2000, 2000],
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
   3,
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

describe('creerAppareils (Cellulaire)', () => {
 const expected = [
  {
   type: 'Cellulaire',
   serialNumber: 9991,
   etatDisponible: true,
   details: {
    marque: 'Asus',
    modele: 'Alpha',
    dateAcquisition: '01/01/2000',
    dateAnnonce: '01/01/2000',
    dateSortie: '01/01/2000',
    configuration: {
     os: 'Windows 10 64x',
     cpu: 'intel core i7-1165G7 @ 2.80Ghz',
     gpu: 'Prototype HK7880 64GB',
     memoire: 16,
     stockages: [256, 2000, 2000],
    },
    notes: '',
    piecesJointes: {},
   },
  },
  {
   type: 'Cellulaire',
   serialNumber: 9992,
   etatDisponible: true,
   details: {
    marque: 'Asus',
    modele: 'Alpha',
    dateAcquisition: '01/01/2000',
    dateAnnonce: '01/01/2000',
    dateSortie: '01/01/2000',
    configuration: {
     os: 'Windows 10 64x',
     cpu: 'intel core i7-1165G7 @ 2.80Ghz',
     gpu: 'Prototype HK7880 64GB',
     memoire: 16,
     stockages: [256, 2000, 2000],
    },
    notes: '',
    piecesJointes: {},
   },
  },
  {
   type: 'Cellulaire',
   serialNumber: 9993,
   etatDisponible: true,
   details: {
    marque: 'Asus',
    modele: 'Alpha',
    dateAcquisition: '01/01/2000',
    dateAnnonce: '01/01/2000',
    dateSortie: '01/01/2000',
    configuration: {
     os: 'Windows 10 64x',
     cpu: 'intel core i7-1165G7 @ 2.80Ghz',
     gpu: 'Prototype HK7880 64GB',
     memoire: 16,
     stockages: [256, 2000, 2000],
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
   3,
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

describe('recupererAppareilsParType', () => {
 const expected = [
  {
   type: 'Ordinateur',
   serialNumber: 9991,
   etatDisponible: true,
   details: {
    marque: 'Asus',
    modele: 'Alpha',
    dateAcquisition: '01/01/2000',
    dateAnnonce: '01/01/2000',
    dateSortie: '01/01/2000',
    configuration: {
     os: 'Windows 10 64x',
     cpu: 'intel core i7-1165G7 @ 2.80Ghz',
     gpu: 'Prototype HK7880 64GB',
     memoire: 16,
     stockages: [256, 2000, 2000],
    },
    notes: '',
    piecesJointes: {},
   },
  },
  {
   type: 'Cellulaire',
   serialNumber: 9992,
   etatDisponible: true,
   details: {
    marque: 'Samsung',
    modele: 'S31',
    dateAcquisition: '01/01/2000',
    dateAnnonce: '01/01/2000',
    dateSortie: '01/01/2000',
    configuration: {
     os: 'Android 13, One UI 5.1',
     cpu: 'Octa-core (1x3.36 GHz Cortex-X3 & 2x2.8 GHz Cortex-A715 & 2x2.8 GHz Cortex-A710 & 3x2.0 GHz Cortex-A510)',
     gpu: 'Adreno 740',
     memoire: 16,
     stockages: [512, 512],
    },
    notes: '',
    piecesJointes: {},
   },
  },
  {
   type: 'Ordinateur',
   serialNumber: 9993,
   etatDisponible: true,
   details: {
    marque: 'Asus',
    modele: 'Alpha',
    dateAcquisition: '01/01/2000',
    dateAnnonce: '01/01/2000',
    dateSortie: '01/01/2000',
    configuration: {
     os: 'Windows 10 64x',
     cpu: 'intel core i7-1165G7 @ 2.80Ghz',
     gpu: 'Prototype HK7880 64GB',
     memoire: 16,
     stockages: [256, 2000, 2000],
    },
    notes: '',
    piecesJointes: {},
   },
  },
 ];
 it('should call appareilsDB 1 time', async () => {
  await appareilsDM.recupererAppareilsParType('Cellulaire');
  expect(appareilsDB.findByType).toHaveBeenCalledTimes(1);
 });

 it('should have been called with the right parameter', async () => {
  await appareilsDM.recupererAppareilsParType('Cellulaire');
  expect(appareilsDB.findByType).toHaveBeenCalledWith('Cellulaire');
 });

 it('should return the correct elements from DB', async () => {
  appareilsDB.findByType.mockImplementation(() => {
   return expected;
  });
  const actual = await appareilsDM.recupererAppareilsParType('Cellulaire');
  expect(actual).toEqual(expected[1]);
 });
});
