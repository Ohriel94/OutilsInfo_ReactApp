import historiqueDM from './historiqueDM.js';
import historiqueDB from '../database/historiqueDB.js';

jest.mock('../database/historiqueDB.js');

beforeEach(() => {
 historiqueDB.getAll.mockClear();
 historiqueDB.addOne.mockClear();
 historiqueDB.updateById.mockClear();
 historiqueDB.deleteById.mockClear();
});

describe('recupererLiens', () => {
 it('should call historiqueDB', async () => {
  await historiqueDM.recupererLiens();
  expect(historiqueDB.getAll).toHaveBeenCalledTimes(1);
 });

 it('should return content from DB', async () => {
  const expected = [{ lien: '' }, { id: 'Lien 1' }];
  historiqueDB.getAll.mockImplementation(() => {
   return expected;
  });

  const actual = await historiqueDM.recupererLiens();
  expect(actual).toEqual(expected);
 });
});

describe('ajouterLien', () => {
 it('should call historiqueDB', async () => {
  await historiqueDM.creerlien();
  const all = await historiqueDB.getAll();

  expect(historiqueDB.addOne).toHaveBeenCalledTimes(1);
  expect(historiqueDB.addOne).toHaveBeenCalledWith({
   id: `Lien ${all.length + 1}`,
   lien: '',
  });
 });
});

describe('modiferLien', () => {
 it('should call historiqueDB', async () => {
  await historiqueDB.updateById('Lien 1', 'nouveauLien');

  expect(historiqueDB.updateById).toHaveBeenCalledTimes(1);
  expect(historiqueDB.updateById).toHaveBeenCalledWith('Lien 1', 'nouveauLien');
 });

 it(`should throw exception when DB doesn't find item`, async () => {
  historiqueDB.updateById.mockImplementation(() => {
   throw new Error();
  });

  expect(() => historiqueDM.modifierLien.reject().toThrow());
 });
});

describe('supprimerLien', () => {
 it('should call historiqueDB.deleteById', async () => {
  await historiqueDB.deleteById({ id: 'Lien 1' });

  expect(historiqueDB.deleteById).toHaveBeenCalledTimes(1);
  expect(historiqueDB.deleteById).toHaveBeenCalledWith({ id: 'Lien 1' });
 });

 it(`should throw exception when DB find item'`, async () => {
  historiqueDB.deleteById.mockImplementation(() => {
   throw new Error();
  });

  expect(() =>
   historiqueDM.supprimerLien("Ce lien n'existe pas").reject().toThrow()
  );
 });
});
