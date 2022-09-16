import historiqueDM from './historiqueDM.js';
import historiqueUTL from '../utilitaires/historiqueUTL.js';
import historiqueDB from '../database/historiqueDB.js';

jest.mock('../database/historiqueDB.js');

beforeEach(() => {
 historiqueDB.getAll.mockClear();
 historiqueDB.addOne.mockClear();
 historiqueDB.findByDate.mockClear();
 historiqueDB.updateById.mockClear();
 historiqueDB.deleteById.mockClear();
});

describe('recupererHistoriques', () => {
 it('should call historiqueDB', async () => {
  await historiqueDM.recupererHistoriques();
  expect(historiqueDB.getAll).toHaveBeenCalledTimes(1);
 });

 it('should return content from DB', async () => {
  const expected = [
   {
    date: '',
    entrees: [],
   },
  ];
  historiqueDB.getAll.mockImplementation(() => {
   return expected;
  });

  const actual = await historiqueDM.recupererHistoriques();
  expect(historiqueDB.getAll).toHaveBeenCalledTimes(1);
  expect(actual).toEqual(expected);
 });
});

describe('enregistrerAffectationAppareil', () => {
 it('should call historiqueDB', async () => {
  let date = new Date();
  let usager = { _id: 'abcde12345' };
  let appareil = {
   _id: 'fghij67890',
   serialNumber: '9999',
   details: { marque: 'Asus', modele: 'Alpha' },
  };
  let nouvelleJournee = historiqueUTL.creerJourneeHistorique(date);
  let nouvelleEntree = historiqueUTL.creerEntreeHistorique(
   date,
   appareil,
   usager,
   'affectation'
  );
  nouvelleJournee.entrees.push(nouvelleEntree);

  await historiqueDM.enregistrerAffectationAppareil(usager, appareil);

  expect(historiqueDB.addOne).toHaveBeenCalledTimes(1);
  expect(historiqueDB.addOne).toHaveBeenCalledWith(nouvelleJournee);
 });
});

describe('enregistrerRetraitAppareil', () => {
 it('should call historiqueDB', async () => {
  let date = new Date();
  let usager = { _id: 'abcde12345' };
  let appareil = {
   _id: 'fghij67890',
   serialNumber: '9999',
   details: { marque: 'Asus', modele: 'Alpha' },
  };
  let nouvelleJournee = historiqueUTL.creerJourneeHistorique(date);
  let nouvelleEntree = historiqueUTL.creerEntreeHistorique(
   date,
   appareil,
   usager,
   'retrait'
  );
  nouvelleJournee.entrees.push(nouvelleEntree);

  await historiqueDM.enregistrerRetraitAppareil(usager, appareil);

  expect(historiqueDB.addOne).toHaveBeenCalledTimes(1);
  expect(historiqueDB.addOne).toHaveBeenCalledWith(nouvelleJournee);
 });
});
