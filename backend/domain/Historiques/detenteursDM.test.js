import detenteursDM from './detenteursDM.js';
import detenteursDB from '../../database/detenteursDB.js';

jest.mock('../../database/detenteursDB.js');
jest.spyOn(detenteursDM, 'formaterA2Digits');
jest.spyOn(detenteursDM, 'formaterHeure');
jest.spyOn(detenteursDM, 'creerEntreeDetenteur');
jest.spyOn(detenteursDM, 'formaterDate');
jest.spyOn(detenteursDM, 'creerJourneeDetenteur');
jest.spyOn(detenteursDM, 'ajouterEntreeDetenteur');

beforeEach(() => {
 detenteursDB.getAll.mockClear();
 detenteursDB.addOne.mockClear();
 detenteursDB.findByDate.mockClear();
 detenteursDB.updateById.mockClear();
 detenteursDB.deleteById.mockClear();

 detenteursDM.formaterA2Digits.mockClear();
 detenteursDM.formaterHeure.mockClear();
 detenteursDM.creerEntreeDetenteur.mockClear();
 detenteursDM.formaterDate.mockClear();
 detenteursDM.creerJourneeDetenteur.mockClear();
 detenteursDM.ajouterEntreeDetenteur.mockClear();
});

describe('recupererDetenteurs', () => {
 const expected = [
  {
   date: '',
   entrees: [],
  },
  {
   date: '',
   entrees: [],
  },
  {
   date: '',
   entrees: [],
  },
 ];
 detenteursDB.getAll.mockImplementation(() => {
  return expected;
 });
 it('should call detenteursDB 1 time', async () => {
  await detenteursDM.recupererDetenteurs();
  expect(detenteursDB.getAll).toHaveBeenCalledTimes(1);
 });

 it('should contain correct number of elements', async () => {
  const detenteurs = await detenteursDM.recupererDetenteurs();
  expect(detenteurs.length).toBe(3);
 });

 it('should return the correct elements from DB', async () => {
  const actual = await detenteursDM.recupererDetenteurs();
  expect(actual).toEqual(expected);
 });
});

describe('formaterA2Digits', () => {
 const expected = 4;
 it('should have been called 1 time', () => {
  detenteursDM.formaterA2Digits(expected);
  expect(detenteursDM.formaterA2Digits).toHaveBeenCalledTimes(1);
 });

 it('should have been called with the right parameters', async () => {
  await detenteursDM.formaterA2Digits(expected);
  expect(detenteursDM.formaterA2Digits).toHaveBeenCalledWith(expected);
 });

 it('should return the correct number on 2 digits', () => {
  const actual = detenteursDM.formaterA2Digits(expected);
  expect(actual).toBe('04');
 });
});

describe('formaterHeure', () => {
 const date = new Date(2020, 2, 5, 12, 5, 8);
 it('should have been called 1 time', () => {
  detenteursDM.formaterHeure(date);
  expect(detenteursDM.formaterHeure).toHaveBeenCalledTimes(1);
 });

 it('should have been called with the right parameters', async () => {
  const expected = date;
  await detenteursDM.formaterHeure(expected);
  expect(detenteursDM.formaterHeure).toHaveBeenCalledWith(expected);
 });

 it('should return the correct time on 2 digits', () => {
  const expected = '12:05:08';
  const actual = detenteursDM.formaterHeure(date);
  expect(actual).toBe(expected);
 });
});

describe('creerEntreeDetenteur', () => {
 const date = new Date(2020, 2, 5, 12, 5, 8);
 const appareil = {
  _id: 'supose to be the _id of the device',
  serialNumber: 9999,
  details: { marque: 'Asus', modele: 'Alpha' },
 };

 it('should have been called 1 time', () => {
  detenteursDM.creerEntreeDetenteur(date, appareil, 'supose to be the _id of the user', 'operation');
  expect(detenteursDM.creerEntreeDetenteur).toHaveBeenCalledTimes(1);
 });

 it('should have been called with the right parameters', async () => {
  await detenteursDM.creerEntreeDetenteur(date, appareil, 'supose to be the _id of the user', 'operation');
  expect(detenteursDM.creerEntreeDetenteur).toHaveBeenCalledWith(
   date,
   appareil,
   'supose to be the _id of the user',
   'operation'
  );
 });

 it('should return the correct object', () => {
  const expected = {
   time: '12:05:08',
   type: 'operation',
   appareil: `${appareil.serialNumber} - ${appareil.details.marque} ${appareil.details.modele}`,
   idUsager: 'supose to be the _id of the user',
   idAppareil: `${appareil._id}`,
  };
  const actual = detenteursDM.creerEntreeDetenteur(date, appareil, expected.idUsager, 'operation');
  expect(actual).toEqual(expected);
 });
});

describe('formaterDate', () => {
 const date = new Date(2020, 2, 5, 12, 5, 8);
 it('should have been called 1 time', () => {
  detenteursDM.formaterDate(date);
  expect(detenteursDM.formaterDate).toHaveBeenCalledTimes(1);
 });

 it('should have been called with the right parameters', async () => {
  const expected = date;
  await detenteursDM.formaterDate(expected);
  expect(detenteursDM.formaterDate).toHaveBeenCalledWith(expected);
 });

 it('should return the correct date on 2 digits', () => {
  const expected = '05/03/2020';
  const actual = detenteursDM.formaterDate(date);
  expect(actual).toBe(expected);
 });
});

describe('creerJourneeDetenteur', () => {
 const date = new Date();
 const expected = { date: detenteursDM.formaterDate(date), entrees: [] };
 it('should have been called 1 time', () => {
  detenteursDM.creerJourneeDetenteur(date);
  expect(detenteursDM.creerJourneeDetenteur).toHaveBeenCalledTimes(1);
 });

 it('should have been called with the right parameters', () => {
  detenteursDM.creerJourneeDetenteur(date);
  expect(detenteursDM.creerJourneeDetenteur).toHaveBeenCalledWith(date);
 });

 it('should return the correct object', () => {
  const actual = detenteursDM.creerJourneeDetenteur(date);
  expect(actual).toEqual(expected);
 });
});

describe('ajouterEntreeDetenteur', () => {
 const appareil = {
  _id: 'supose to be the _id of the device',
  serialNumber: 9999,
  details: { marque: 'Asus', modele: 'Alpha' },
 };

 it('should have been called 1 time', async () => {
  const date = new Date();
  const entree = detenteursDM.creerEntreeDetenteur(
   date,
   appareil,
   'supose to be the _id of the user',
   'operation'
  );
  const journee = detenteursDM.creerJourneeDetenteur(date);
  await detenteursDM.ajouterEntreeDetenteur(journee, entree);
  expect(detenteursDB.findByDate).toHaveBeenCalledTimes(1);
  expect(detenteursDB.addOne).toHaveBeenCalledTimes(1);
 });

 it('should have been called with the right parameters', async () => {
  const date = new Date();
  const expected = {
   date: detenteursDM.formaterDate(date),
   entrees: [
    {
     time: detenteursDM.formaterHeure(date),
     type: 'operation',
     appareil: `${appareil.serialNumber} - ${appareil.details.marque} ${appareil.details.modele}`,
     idUsager: 'supose to be the _id of the user',
     idAppareil: `${appareil._id}`,
    },
   ],
  };
  const entree = detenteursDM.creerEntreeDetenteur(
   date,
   appareil,
   'supose to be the _id of the user',
   'operation'
  );
  const journee = detenteursDM.creerJourneeDetenteur(date);
  await detenteursDM.ajouterEntreeDetenteur(journee, entree);
  expect(detenteursDB.findByDate).toHaveBeenCalledWith(journee.date);
  expect(detenteursDB.addOne).toHaveBeenCalledWith(expected);
 });

 it('should throw an error if the day is not found', () => {});
});

describe('enregistrerAffectationAppareil', () => {
 const usager = { _id: 'supose to be the _id of the user' };
 const appareil = {
  _id: 'supose to be the _id of the device',
  serialNumber: '9999',
  details: { marque: 'Asus', modele: 'Alpha' },
 };

 it('should call detenteursDB 1 time', async () => {
  await detenteursDM.enregistrerAffectationAppareil(usager, appareil);
  expect(detenteursDB.addOne).toHaveBeenCalledTimes(1);
 });

 it('should have been called with the right parameters', async () => {
  const date = new Date();
  const expected = {
   date: detenteursDM.formaterDate(date),
   entrees: [
    {
     appareil: '9999 - Asus Alpha',
     idAppareil: 'supose to be the _id of the device',
     idUsager: usager._id,
     time: detenteursDM.formaterHeure(date),
     type: 'affectation',
    },
   ],
  };
  await detenteursDM.enregistrerAffectationAppareil(usager, appareil);
  expect(detenteursDB.addOne).toHaveBeenCalledWith(expected);
 });
});

describe('enregistrerRetraitAppareil', () => {
 const usager = { _id: 'supose to be the _id of the user' };
 const appareil = {
  _id: 'supose to be the _id of the device',
  serialNumber: '9999',
  details: { marque: 'Asus', modele: 'Alpha' },
 };

 it('should call detenteursDB 1 time', async () => {
  await detenteursDM.enregistrerRetraitAppareil(usager, appareil);
  expect(detenteursDB.addOne).toHaveBeenCalledTimes(1);
 });

 it('should have been called with the right parameters', async () => {
  const date = new Date();
  const expected = {
   date: detenteursDM.formaterDate(date),
   entrees: [
    {
     appareil: '9999 - Asus Alpha',
     idAppareil: 'supose to be the _id of the device',
     idUsager: usager._id,
     time: detenteursDM.formaterHeure(date),
     type: 'retrait',
    },
   ],
  };
  await detenteursDM.enregistrerRetraitAppareil(usager, appareil);
  expect(detenteursDB.addOne).toHaveBeenCalledWith(expected);
 });
});
