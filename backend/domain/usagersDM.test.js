import usagersDM from './usagersDM.js';
import usagersDB from '../database/usagersDB.js';

jest.mock('../database/usagersDB.js');

beforeEach(() => {
 usagersDB.getAll.mockClear();
 usagersDB.addOne.mockClear();
 usagersDB.updateById.mockClear();
 usagersDB.findUserById.mockClear();
});

describe('recupererUsagers', () => {
 it('should call usagersDB', async () => {
  await usagersDM.recupererUsagers();
  expect(usagersDB.getAll).toHaveBeenCalledTimes(1);
 });

 it('should return content from DB', async () => {
  const expected = [{ lien: '' }, { id: 'Lien 1' }];
  usagersDB.getAll.mockImplementation(() => {
   return expected;
  });

  const actual = await usagersDM.recupererUsagers();
  expect(actual).toEqual(expected);
 });
});

// describe('ajouterLien', () => {
//  it('should call usagersDB', async () => {
//   await usagersDM.creerlien();
//   const all = await usagersDB.getAll();

//   expect(usagersDB.addUsager).toHaveBeenCalledTimes(1);
//   expect(usagersDB.addUsager).toHaveBeenCalledWith({
//    id: `Lien ${all.length + 1}`,
//    lien: '',
//   });
//  });
// });

// describe('modiferLien', () => {
//  it('should call usagersDB', async () => {
//   await usagersDB.updateById('Lien 1', 'nouveauLien');

//   expect(usagersDB.updateById).toHaveBeenCalledTimes(1);
//   expect(usagersDB.updateById).toHaveBeenCalledWith('Lien 1', 'nouveauLien');
//  });

//  it(`should throw exception when DB doesn't find item`, async () => {
//   usagersDB.updateById.mockImplementation(() => {
//    throw new Error();
//   });

//   expect(() => usagersDM.modifierLien.reject().toThrow());
//  });
// });

// describe('supprimerLien', () => {
//  it('should call usagersDB.deleteById', async () => {
//   await usagersDB.deleteById({ id: 'Lien 1' });

//   expect(usagersDB.deleteById).toHaveBeenCalledTimes(1);
//   expect(usagersDB.deleteById).toHaveBeenCalledWith({ id: 'Lien 1' });
//  });

//  it(`should throw exception when DB find item'`, async () => {
//   usagersDB.deleteById.mockImplementation(() => {
//    throw new Error();
//   });

//   expect(() =>
//    usagersDM.supprimerLien("Ce lien n'existe pas").reject().toThrow()
//   );
//  });
// });
