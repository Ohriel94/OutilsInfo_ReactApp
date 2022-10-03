import adminsDB from '../database/adminsDB.js';

jest.mock('../database/adminsDB.js');

beforeEach(() => {
 adminsDB.getAll.mockClear();
 adminsDB.addOne.mockClear();
 adminsDB.findByName.mockClear();
 adminsDB.findById.mockClear();
 adminsDB.updateById.mockClear();
});
