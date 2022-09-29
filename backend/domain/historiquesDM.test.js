import historiquesDM from './historiquesDM.js';
import historiquesDB from '../database/historiquesDB.js';

jest.mock('../database/historiquesDB.js');
jest.spyOn(historiquesDM, 'formaterA2Digits');
jest.spyOn(historiquesDM, 'formaterHeure');
jest.spyOn(historiquesDM, 'creerEntreeHistorique');
jest.spyOn(historiquesDM, 'formaterDate');
jest.spyOn(historiquesDM, 'creerJourneeHistorique');
jest.spyOn(historiquesDM, 'ajouterEntreeHistorique');

beforeEach(() => {
 historiquesDB.getAll.mockClear();
 historiquesDB.addOne.mockClear();
 historiquesDB.findByDate.mockClear();
 historiquesDB.updateById.mockClear();
 historiquesDB.deleteById.mockClear();

 historiquesDM.formaterA2Digits.mockClear();
 historiquesDM.formaterHeure.mockClear();
 historiquesDM.creerEntreeHistorique.mockClear();
 historiquesDM.formaterDate.mockClear();
 historiquesDM.creerJourneeHistorique.mockClear();
 historiquesDM.ajouterEntreeHistorique.mockClear();
});

describe('recupererHistoriques', () => {
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
 historiquesDB.getAll.mockImplementation(() => {
  return expected;
 });
 it('should call historiquesDB 1 time', async () => {
  await historiquesDM.recupererHistoriques();
  expect(historiquesDB.getAll).toHaveBeenCalledTimes(1);
 });

 it('should contain correct number of elements', async () => {
  const historiques = await historiquesDM.recupererHistoriques();
  expect(historiques.length).toBe(3);
 });

 it('should return the correct elements from DB', async () => {
  const actual = await historiquesDM.recupererHistoriques();
  expect(actual).toEqual(expected);
 });
});

describe('formaterA2Digits', () => {
 const expected = 4;
 it('should have been called 1 time', () => {
  historiquesDM.formaterA2Digits(expected);
  expect(historiquesDM.formaterA2Digits).toHaveBeenCalledTimes(1);
 });

 it('should have been called with the right parameters', async () => {
  await historiquesDM.formaterA2Digits(expected);
  expect(historiquesDM.formaterA2Digits).toHaveBeenCalledWith(expected);
 });

 it('should return the correct number on 2 digits', () => {
  const actual = historiquesDM.formaterA2Digits(expected);
  expect(actual).toBe('04');
 });
});

describe('formaterHeure', () => {
 const date = new Date(2020, 2, 5, 12, 5, 8);
 it('should have been called 1 time', () => {
  historiquesDM.formaterHeure(date);
  expect(historiquesDM.formaterHeure).toHaveBeenCalledTimes(1);
 });

 it('should have been called with the right parameters', async () => {
  const expected = date;
  await historiquesDM.formaterHeure(expected);
  expect(historiquesDM.formaterHeure).toHaveBeenCalledWith(expected);
 });

 it('should return the correct time on 2 digits', () => {
  const expected = '12:05:08';
  const actual = historiquesDM.formaterHeure(date);
  expect(actual).toBe(expected);
 });
});

describe('creerEntreeHistorique', () => {
 const date = new Date(2020, 2, 5, 12, 5, 8);
 const appareil = {
  _id: 'supose to be the _id of the device',
  serialNumber: 9999,
  details: { marque: 'Asus', modele: 'Alpha' },
 };

 it('should have been called 1 time', () => {
  historiquesDM.creerEntreeHistorique(
   date,
   appareil,
   'supose to be the _id of the user',
   'operation'
  );
  expect(historiquesDM.creerEntreeHistorique).toHaveBeenCalledTimes(1);
 });

 it('should have been called with the right parameters', async () => {
  await historiquesDM.creerEntreeHistorique(
   date,
   appareil,
   'supose to be the _id of the user',
   'operation'
  );
  expect(historiquesDM.creerEntreeHistorique).toHaveBeenCalledWith(
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
  const actual = historiquesDM.creerEntreeHistorique(
   date,
   appareil,
   expected.idUsager,
   'operation'
  );
  expect(actual).toEqual(expected);
 });
});

describe('formaterDate', () => {
 const date = new Date(2020, 2, 5, 12, 5, 8);
 it('should have been called 1 time', () => {
  historiquesDM.formaterDate(date);
  expect(historiquesDM.formaterDate).toHaveBeenCalledTimes(1);
 });

 it('should have been called with the right parameters', async () => {
  const expected = date;
  await historiquesDM.formaterDate(expected);
  expect(historiquesDM.formaterDate).toHaveBeenCalledWith(expected);
 });

 it('should return the correct date on 2 digits', () => {
  const expected = '05/03/2020';
  const actual = historiquesDM.formaterDate(date);
  expect(actual).toBe(expected);
 });
});

describe('creerJourneeHistorique', () => {
 const date = new Date();
 const expected = { date: historiquesDM.formaterDate(date), entrees: [] };
 it('should have been called 1 time', () => {
  historiquesDM.creerJourneeHistorique(date);
  expect(historiquesDM.creerJourneeHistorique).toHaveBeenCalledTimes(1);
 });

 it('should have been called with the right parameters', () => {
  historiquesDM.creerJourneeHistorique(date);
  expect(historiquesDM.creerJourneeHistorique).toHaveBeenCalledWith(date);
 });

 it('should return the correct object', () => {
  const actual = historiquesDM.creerJourneeHistorique(date);
  expect(actual).toEqual(expected);
 });
});

describe('ajouterEntreeHistorique', () => {
 const appareil = {
  _id: 'supose to be the _id of the device',
  serialNumber: 9999,
  details: { marque: 'Asus', modele: 'Alpha' },
 };

 it('should have been called 1 time', async () => {
  const date = new Date();
  const entree = historiquesDM.creerEntreeHistorique(
   date,
   appareil,
   'supose to be the _id of the user',
   'operation'
  );
  const journee = historiquesDM.creerJourneeHistorique(date);
  await historiquesDM.ajouterEntreeHistorique(journee, entree);
  expect(historiquesDB.findByDate).toHaveBeenCalledTimes(1);
  expect(historiquesDB.addOne).toHaveBeenCalledTimes(1);
 });

 it('should have been called with the right parameters', async () => {
  const date = new Date();
  const expected = {
   date: historiquesDM.formaterDate(date),
   entrees: [
    {
     time: historiquesDM.formaterHeure(date),
     type: 'operation',
     appareil: `${appareil.serialNumber} - ${appareil.details.marque} ${appareil.details.modele}`,
     idUsager: 'supose to be the _id of the user',
     idAppareil: `${appareil._id}`,
    },
   ],
  };
  const entree = historiquesDM.creerEntreeHistorique(
   date,
   appareil,
   'supose to be the _id of the user',
   'operation'
  );
  const journee = historiquesDM.creerJourneeHistorique(date);
  await historiquesDM.ajouterEntreeHistorique(journee, entree);
  expect(historiquesDB.findByDate).toHaveBeenCalledWith(journee.date);
  expect(historiquesDB.addOne).toHaveBeenCalledWith(expected);
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

 it('should call historiquesDB 1 time', async () => {
  await historiquesDM.enregistrerAffectationAppareil(usager, appareil);
  expect(historiquesDB.addOne).toHaveBeenCalledTimes(1);
 });

 it('should have been called with the right parameters', async () => {
  const date = new Date();
  const expected = {
   date: historiquesDM.formaterDate(date),
   entrees: [
    {
     appareil: '9999 - Asus Alpha',
     idAppareil: 'supose to be the _id of the device',
     idUsager: usager._id,
     time: historiquesDM.formaterHeure(date),
     type: 'affectation',
    },
   ],
  };
  await historiquesDM.enregistrerAffectationAppareil(usager, appareil);
  expect(historiquesDB.addOne).toHaveBeenCalledWith(expected);
 });
});

describe('enregistrerRetraitAppareil', () => {
 const usager = { _id: 'supose to be the _id of the user' };
 const appareil = {
  _id: 'supose to be the _id of the device',
  serialNumber: '9999',
  details: { marque: 'Asus', modele: 'Alpha' },
 };

 it('should call historiquesDB 1 time', async () => {
  await historiquesDM.enregistrerRetraitAppareil(usager, appareil);
  expect(historiquesDB.addOne).toHaveBeenCalledTimes(1);
 });

 it('should have been called with the right parameters', async () => {
  const date = new Date();
  const expected = {
   date: historiquesDM.formaterDate(date),
   entrees: [
    {
     appareil: '9999 - Asus Alpha',
     idAppareil: 'supose to be the _id of the device',
     idUsager: usager._id,
     time: historiquesDM.formaterHeure(date),
     type: 'retrait',
    },
   ],
  };
  await historiquesDM.enregistrerRetraitAppareil(usager, appareil);
  expect(historiquesDB.addOne).toHaveBeenCalledWith(expected);
 });
});
