import ordinateursDM from './ordinateursDM.js';
import ordinateursDB from '../database/ordinateursDB.js';

jest.mock('../database/ordinateursDB.js');

beforeEach(() => {
 ordinateursDB.getAll.mockClear();
 ordinateursDB.addOne.mockClear();
 ordinateursDB.updateById.mockClear();
 ordinateursDB.deleteById.mockClear();
});

describe('recupererLiens', () => {
 it('should call ordinateursDB', async () => {
  await ordinateursDM.recupererLiens();
  expect(ordinateursDB.getAll).toHaveBeenCalledTimes(1);
 });

 it('should return content from DB', async () => {
  const expected = [{ lien: '' }, { id: 'Lien 1' }];
  ordinateursDB.getAll.mockImplementation(() => {
   return expected;
  });

  const actual = await ordinateursDM.recupererLiens();
  expect(actual).toEqual(expected);
 });
});

describe('ajouterLien', () => {
 it('should call ordinateursDB', async () => {
  await ordinateursDM.creerlien();
  const all = await ordinateursDB.getAll();

  expect(ordinateursDB.addOne).toHaveBeenCalledTimes(1);
  expect(ordinateursDB.addOne).toHaveBeenCalledWith({
   id: `Lien ${all.length + 1}`,
   lien: '',
  });
 });
});

describe('modiferLien', () => {
 it('should call ordinateursDB', async () => {
  await ordinateursDB.updateById('Lien 1', 'nouveauLien');

  expect(ordinateursDB.updateById).toHaveBeenCalledTimes(1);
  expect(ordinateursDB.updateById).toHaveBeenCalledWith(
   'Lien 1',
   'nouveauLien'
  );
 });

 it(`should throw exception when DB doesn't find item`, async () => {
  ordinateursDB.updateById.mockImplementation(() => {
   throw new Error();
  });

  expect(() => ordinateursDM.modifierLien.reject().toThrow());
 });
});

describe('supprimerLien', () => {
 it('should call ordinateursDB.deleteById', async () => {
  await ordinateursDB.deleteById({ id: 'Lien 1' });

  expect(ordinateursDB.deleteById).toHaveBeenCalledTimes(1);
  expect(ordinateursDB.deleteById).toHaveBeenCalledWith({ id: 'Lien 1' });
 });

 it(`should throw exception when DB find item'`, async () => {
  ordinateursDB.deleteById.mockImplementation(() => {
   throw new Error();
  });

  expect(() =>
   ordinateursDM.supprimerLien("Ce lien n'existe pas").reject().toThrow()
  );
 });
});
