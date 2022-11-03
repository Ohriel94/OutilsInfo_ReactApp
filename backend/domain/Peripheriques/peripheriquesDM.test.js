import peripheriquesDM from './peripheriquesDM.js';
import peripheriquesDB from '../../database/peripheriquesDB.js';

jest.mock('../../database/peripheriquesDB.js');

beforeEach(async () => {
 peripheriquesDB.getAll.mockClear();
 peripheriquesDB.addOne.mockClear();
 peripheriquesDB.findBySerialNumber.mockClear();
 peripheriquesDB.updateById.mockClear();
});

describe('recupererPeripheriques', () => {
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
 peripheriquesDB.getAll.mockImplementation(() => {
  return expected;
 });

 it('should call peripheriquesDB 1 time', async () => {
  await peripheriquesDM.recupererPeripheriques();
  expect(peripheriquesDB.getAll).toHaveBeenCalledTimes(1);
 });

 it('should contain correct number of elements', async () => {
  const peripheriques = await peripheriquesDM.recupererPeripheriques();
  expect(peripheriques.length).toBe(3);
 });

 it('should return the correct elements from DB', async () => {
  const actual = await peripheriquesDM.recupererPeripheriques();
  expect(actual).toEqual(expected);
 });
});

describe('creerPeripherique', () => {
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

 it('should call peripheriquesDB 1 time', async () => {
  await peripheriquesDM.creerPeripherique(
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
  expect(peripheriquesDB.addOne).toHaveBeenCalledTimes(1);
 });

 it('should have been called with the right parameters', async () => {
  await peripheriquesDM.creerPeripherique(
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
  expect(peripheriquesDB.addOne).toHaveBeenCalledWith(expected);
 });
});

describe('recupererPeripheriqueParSerialNumber', () => {
 it('should call peripheriquesDB 1 time', async () => {
  await peripheriquesDM.recupererPeripheriqueParSerialNumber('9992');
  expect(peripheriquesDB.findBySerialNumber).toHaveBeenCalledTimes(1);
 });

 it('should have been called with the right parameter', async () => {
  await peripheriquesDM.recupererPeripheriqueParSerialNumber('9992');
  expect(peripheriquesDB.findBySerialNumber).toHaveBeenCalledWith('9992');
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
  peripheriquesDB.findBySerialNumber.mockImplementation(() => {
   return expected;
  });
  const actual = await peripheriquesDM.recupererPeripheriqueParSerialNumber(
   '9992'
  );
  expect(actual).toEqual(expected);
 });
});

describe('affecterPeripherique', () => {
 it('should call peripheriquesDB', async () => {
  await peripheriquesDM.affecterPeripherique('9992');
  expect(peripheriquesDB.findBySerialNumber).toHaveBeenCalledTimes(1);
  expect(peripheriquesDB.updateById).toHaveBeenCalledTimes(1);
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
  peripheriquesDB.findBySerialNumber.mockImplementation(() => {
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
  await peripheriquesDM.affecterPeripherique('9992');
  expect(peripheriquesDB.findBySerialNumber).toHaveBeenCalledWith('9992');
  expect(peripheriquesDB.updateById).toHaveBeenCalledWith(
   expected._id,
   expected
  );
 });
});

describe('retirerPeripherique', () => {
 it('should call peripheriquesDB', async () => {
  await peripheriquesDM.retirerPeripherique('9992');
  expect(peripheriquesDB.findBySerialNumber).toHaveBeenCalledTimes(1);
  expect(peripheriquesDB.updateById).toHaveBeenCalledTimes(1);
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
  peripheriquesDB.findBySerialNumber.mockImplementation(() => {
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
  await peripheriquesDM.retirerPeripherique('9992');
  expect(peripheriquesDB.findBySerialNumber).toHaveBeenCalledWith('9992');
  expect(peripheriquesDB.updateById).toHaveBeenCalledWith(
   expected._id,
   expected
  );
 });
});
