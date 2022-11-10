import cellulairesDM from './cellulairesDM.js';
import cellulairesDB from '../../database/cellulairesDB.js';

jest.mock('../../database/cellulairesDB.js');

beforeEach(async () => {
 cellulairesDB.getAll.mockClear();
 cellulairesDB.addOne.mockClear();
 cellulairesDB.findBySerialNumber.mockClear();
 cellulairesDB.updateById.mockClear();
});

describe('recupererCellulaires', () => {
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
 cellulairesDB.getAll.mockImplementation(() => {
  return expected;
 });

 it('should call cellulairesDB 1 time', async () => {
  await cellulairesDM.recupererCellulaires();
  expect(cellulairesDB.getAll).toHaveBeenCalledTimes(1);
 });

 it('should contain correct number of elements', async () => {
  const cellulaires = await cellulairesDM.recupererCellulaires();
  expect(cellulaires.length).toBe(3);
 });

 it('should return the correct elements from DB', async () => {
  const actual = await cellulairesDM.recupererCellulaires();
  expect(actual).toEqual(expected);
 });
});

describe('creerCellulaire', () => {
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

 it('should call cellulairesDB 1 time', async () => {
  await cellulairesDM.creerCellulaire(
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
  expect(cellulairesDB.addOne).toHaveBeenCalledTimes(1);
 });

 it('should have been called with the right parameters', async () => {
  await cellulairesDM.creerCellulaire(
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
  expect(cellulairesDB.addOne).toHaveBeenCalledWith(expected);
 });
});

describe('recupererCellulaireParSerialNumber', () => {
 it('should call cellulairesDB 1 time', async () => {
  await cellulairesDM.recupererCellulaireParSerialNumber('9992');
  expect(cellulairesDB.findBySerialNumber).toHaveBeenCalledTimes(1);
 });

 it('should have been called with the right parameter', async () => {
  await cellulairesDM.recupererCellulaireParSerialNumber('9992');
  expect(cellulairesDB.findBySerialNumber).toHaveBeenCalledWith('9992');
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
  cellulairesDB.findBySerialNumber.mockImplementation(() => {
   return expected;
  });
  const actual = await cellulairesDM.recupererCellulaireParSerialNumber('9992');
  expect(actual).toEqual(expected);
 });
});

describe('affecterCellulaire', () => {
 it('should call cellulairesDB', async () => {
  await cellulairesDM.affecterCellulaire('9992');
  expect(cellulairesDB.findBySerialNumber).toHaveBeenCalledTimes(1);
  expect(cellulairesDB.updateById).toHaveBeenCalledTimes(1);
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
  cellulairesDB.findBySerialNumber.mockImplementation(() => {
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
  await cellulairesDM.affecterCellulaire('9992');
  expect(cellulairesDB.findBySerialNumber).toHaveBeenCalledWith('9992');
  expect(cellulairesDB.updateById).toHaveBeenCalledWith(expected._id, expected);
 });
});

describe('retirerCellulaire', () => {
 it('should call cellulairesDB', async () => {
  await cellulairesDM.retirerCellulaire('9992');
  expect(cellulairesDB.findBySerialNumber).toHaveBeenCalledTimes(1);
  expect(cellulairesDB.updateById).toHaveBeenCalledTimes(1);
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
  cellulairesDB.findBySerialNumber.mockImplementation(() => {
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
  await cellulairesDM.retirerCellulaire('9992');
  expect(cellulairesDB.findBySerialNumber).toHaveBeenCalledWith('9992');
  expect(cellulairesDB.updateById).toHaveBeenCalledWith(expected._id, expected);
 });
});
