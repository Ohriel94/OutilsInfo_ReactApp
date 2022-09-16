import ordinateursDM from './ordinateursDM.js';
import ordinateursDB from '../database/ordinateursDB.js';

jest.mock('../database/ordinateursDB.js');

beforeEach(() => {
 ordinateursDB.getAll.mockClear();
 ordinateursDB.addOne.mockClear();
 ordinateursDB.updateById.mockClear();
 ordinateursDB.findBySerialNumber.mockClear();
});

describe('recupererOrdinateurs', () => {
 it('should call ordinateursDB', async () => {
  await ordinateursDM.recupererOrdinateurs();
  expect(ordinateursDB.getAll).toHaveBeenCalledTimes(1);
 });

 it('should return content from DB', async () => {
  const expected = [
   {
    _id: 'abcde12345',
    serialNumber: '9999',
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
   },
  ];
  ordinateursDB.getAll.mockImplementation(() => {
   return expected;
  });

  const actual = await ordinateursDM.recupererOrdinateurs();
  expect(actual).toEqual(expected);
 });
});

describe('creerOrdinateur', () => {
 it('should call ordinateursDB', async () => {
  const expected = {
   serialNumber: '9999',
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

  await ordinateursDM.creerOrdinateur(
   expected.serialNumber,
   expected.etatDisponible,
   expected.details.marque,
   expected.details.modele,
   expected.details.dateAcquisition,
   expected.details.configuration.systeme,
   expected.details.configuration.processeur,
   expected.details.configuration.memoire,
   expected.details.configuration.disque,
   expected.details.notes
  );

  expect(ordinateursDB.addOne).toHaveBeenCalledTimes(1);
  expect(ordinateursDB.addOne).toHaveBeenCalledWith(expected);
 });
});

describe('trouverOrdinateur', () => {
 it('should call ordinateursDB', async () => {
  const expected = {
   _id: 'abcde12345',
   serialNumber: '9999',
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
  await ordinateursDM.creerOrdinateur(
   expected.serialNumber,
   expected.etatDisponible,
   expected.details.marque,
   expected.details.modele,
   expected.details.dateAcquisition,
   expected.details.configuration.systeme,
   expected.details.configuration.processeur,
   expected.details.configuration.memoire,
   expected.details.configuration.disque,
   expected.details.notes
  );

  const actual = await ordinateursDM.trouverOrdinateur(expected.serialNumber);

  expect(ordinateursDB.findBySerialNumber).toHaveBeenCalledTimes(1);
  expect(ordinateursDB.findBySerialNumber).toHaveBeenCalledWith('9999');
  //   expect(actual).toEqual(expected);
 });
});

// describe('supprimerLien', () => {
//  it('should call ordinateursDB.deleteById', async () => {
//   await ordinateursDB.deleteById({ id: 'Lien 1' });

//   expect(ordinateursDB.deleteById).toHaveBeenCalledTimes(1);
//   expect(ordinateursDB.deleteById).toHaveBeenCalledWith({ id: 'Lien 1' });
//  });

//  it(`should throw exception when DB find item'`, async () => {
//   ordinateursDB.deleteById.mockImplementation(() => {
//    throw new Error();
//   });

//   expect(() =>
//    ordinateursDM.supprimerLien("Ce lien n'existe pas").reject().toThrow()
//   );
//  });
// });
