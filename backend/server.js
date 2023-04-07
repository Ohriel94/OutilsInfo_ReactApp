import cors from 'cors';
import express from 'express';
import jwt from 'jsonwebtoken';

import adminsDM from './domain/Administrateurs/adminsDM.js';
import appareilsDM from './domain/Appareils/appareilsDM.js';
import cellulairesDM from './domain/Cellulaires/cellulairesDM.js';
import detenteursDM from './domain/Historiques/detenteursDM.js';
import historiquesDM from './domain/Historiques/historiquesDM.js';
import moniteursDM from './domain/Moniteurs/moniteursDM.js';
import ordinateursDM from './domain/Ordinateurs/ordinateursDM.js';
import peripheriquesDM from './domain/Peripheriques/peripheriquesDM.js';
import usagersDM from './domain/Usagers/usagersDM.js';

const app = express();
app.use(express.json());
app.use(cors());

const jwtSecret =
 '000b5f770df78872ce78360654ac3248ad896b0361b1f8065f2fdae6e5333a7d35ba9ef2954999c8ced06ba1b50f59c3d8581a2ee8b2a09495b74833a4222bc0';

jwt.secret = jwtSecret;
jwt.algorithms = ['HS256'];

//=============== AUTHENTIFICATE ===============
const authenticate = async (req, res, next) => {
 console.log(req.headers);
 const authHeader = req.headers.authorization;
 console.log(authHeader);
 const token = authHeader && authHeader.split(' ')[1];
 console.log(token);
 if (!token) return res.sendStatus(401);
 try {
  const payload = await jwt.verify(token, jwtSecret);
  req.userToken = payload;
  next();
 } catch (e) {
  return res.sendStatus(403);
 }
};

//=============== Routes - Administrateurs ===============
app.post('/inscription', async (req, res) => {
 console.log('[SERV] POST/incription');
 const prenom = req.body.prenom;
 const nom = req.body.nom;
 const email = req.body.email;
 const password = req.body.password;
 const flags = req.body.flags;
 try {
  await adminsDM.creerAdmin(prenom, nom, email, password, flags);
  res.sendStatus(200);
 } catch (e) {
  res.sendStatus(400);
 }
});

app.post('/connexion', async (req, res) => {
 console.log('[SERV] POST/connexion');
 const email = req.body.email;
 const password = req.body.password;
 console.log(email, password);
 const administrateur = await adminsDM.trouverAdminParEmail(email);
 if (administrateur != undefined) {
  if (administrateur.password === password) {
   const token = jwt.sign({ email, password }, jwtSecret);
   res.cookie('access_token', token, { httpOnly: true });
   res.json({ token: token, userInfo: { nom: administrateur.nom, prenom: administrateur.prenom } });
  }
 } else res.sendStatus(403);
});

app.post('/deconnexion', authenticate, async (req, res) => {
 console.log('[SERV] POST/deconnexion');
 return res.clearCookie('access_token').sendStatus(200).json({ message: 'Successfully logged out' });
});

app.get('/administrateurs', async (req, res) => {
 console.log('[SERV] GET/administrateurs');
 try {
  const response = await adminsDM.recupererAdministrateurs();
  response.map((admin) => {
   delete admin.password;
  });
  res.send(response);
 } catch (e) {
  res.sendStatus(404);
 }
});

app.post('/creerAdmin', async (req, res) => {
 console.log('[SERV] POST/creerAdmin');
 const prenom = req.body.prenom;
 const nom = req.body.nom;
 const email = req.body.email;
 const courriel = req.body.courriel;
 const flags = req.body.flags;
 try {
  await adminsDM.creerAdmin(prenom, nom, email, courriel, flags);
  res.sendStatus(200);
 } catch (e) {
  res.sendStatus(400);
 }
});

app.post('/administrateur/supprimer', async (req, res) => {
 console.log('[SERV] POST/administrateur/supprimer/:id');
 console.log(req.query);
 const id = req.query;
 try {
  const response = await adminsDM.supprimerAdmin(id);
  res.send(response);
 } catch (e) {
  res.sendStatus(404);
 }
});

app.get('/recupererAdministrateur/:administrateurID', async (req, res) => {
 console.log('[SERV] GET/recupererAdministrateur/:administrateurID');
 const administrateurID = req.params.administrateurID;
 try {
  const response = await adminsDM.recupererAdministrateurParId(administrateurID);
  res.send(response);
 } catch (e) {
  res.sendStatus(404);
 }
});

app.post('/administrateurs/editerAdmin', async (req, res) => {
 console.log('[SERV] POST/administrateurs/editerAdmin');
 const nom = req.body.nom;
 const prenom = req.body.prenom;
 const username = req.body.username;
 const email = req.body.email;
 const sendStatus = req.body.sendStatus;
 try {
  if (nom !== undefined && prenom !== undefined && username !== undefined && sendStatus !== undefined) {
   await adminsDM.editerAdministrateur(nom, prenom, username, email, sendStatus);
   res.sendStatus(200);
  }
 } catch (e) {
  res.sendStatus(404);
 }
});

app.get('/administrateurs/trouverAdmin', async (req, res) => {
 console.log('[SERV] POST/administrateurs/trouverAdmin');
 const email = req.body.email;
 try {
  console.log(email);
  if (email !== undefined) {
   await adminsDM.trouverAdminParEmail(email);
   res.sendStatus(200);
  }
 } catch (e) {
  res.sendStatus(404);
 }
});

//=============== Routes - Cellulaires ===============

//=============== Routes - Moniteurs ===============
app.get('/moniteurs', async (req, res) => {
 console.log('[SERV] GET/moniteurs');
 const response = await moniteursDM.recupererMoniteurs();
 res.send(response);
});

//=============== Routes - Historiques ===============
app.get('/historiques', async (req, res) => {
 console.log('[SERV] GET/historiques');
 const response = await historiquesDM.recupererHistoriques();
 res.send(response);
});

app.get('/detenteurs', async (req, res) => {
 console.log('[SERV] GET/detenteurs');
 const response = await historiquesDM.recupererDetenteurs();
 res.send(response);
});

app.get('/listeDetenteurs/:idAppareil', async (req, res) => {
 console.log('[SERV] GET/listeDetenteurs/:idAppareil');
 const idAppareil = req.query.idAppareil;
 console.log(req.query);
 let response;
 if (req.query.idAppareil === undefined) {
  response = sendStatus(404);
 } else {
  response = await historiquesDM.recupererDetenteursParAppareil(idAppareil);
 }
 res.send(response);
});

//=============== Routes - Appareils ===============
app.get('/appareils', async (req, res) => {
 console.log('[SERV] GET/appareils');
 const response = await appareilsDM.recupererAppareils();
 response !== undefined ? res.send(response) : res.sendStatus(404);
});

app.post('/creerAppareil', async (req, res) => {
 console.log('[SERV] POST/creerAppareil');
 const serNum = req.body.serialNumber;
 const mar = req.body.marque;
 const mod = req.body.modele;
 const dateAcqu = req.body.dateAcquisition;
 const sys = req.body.systeme;
 const proc = req.body.processeur;
 const mem = req.body.memoire;
 const disq = req.body.disque;
 const notes = req.body.notes;
 try {
  const response = await appareilsDM.creerAppareil(serNum, mar, mod, dateAcqu, sys, proc, mem, disq, notes);
  res.sendStatus(202);
 } catch (e) {
  res.sendStatus(400);
 }
});

app.post('/creerAppareils', async (req, res) => {
 console.log('[SERV] POST/creerAppareils');
 const qte = req.body.qte;
 const type = req.body.type;
 const serNum = req.body.serialNumber;
 const marque = req.body.marque;
 const modele = req.body.modele;
 const dateAcqu = req.body.dateAcquisition;
 const dateAnno = req.body.dateAnnonce;
 const dateSort = req.body.dateSortie;
 const sys = req.body.os;
 const cpu = req.body.cpu;
 const gpu = req.body.gpu;
 const memoire = req.body.memoire;
 const stockages = req.body.stockages;
 const notes = req.body.notes;
 try {
  const response = await appareilsDM.creerAppareils(
   qte,
   type,
   serNum,
   marque,
   modele,
   dateAcqu,
   dateAnno,
   dateSort,
   sys,
   cpu,
   gpu,
   memoire,
   stockages,
   notes
  );
  console.log(response);
  res.sendStatus(202);
 } catch (e) {
  res.sendStatus(400);
 }
});

app.get('/recupererAppareil/type?:type', async (req, res) => {
 console.log('[SERV] GET/recupererOrdinateur/:type');
 const type = req.query.type;
 try {
  const response = await appareilsDM.recupererAppareilsParType(type);
  res.send(response);
 } catch (e) {
  res.sendStatus(404);
 }
});

app.get('/recupererAppareil/id?:id', async (req, res) => {
 console.log('[SERV] GET/recupererAppareil/id?:id');
 const id = req.query.id;
 try {
  const response = await appareilsDM.recupererAppareilParId(id);
  res.send(response);
 } catch (e) {
  res.sendStatus(404);
 }
});

app.get('/recupererAppareil/serialNumber?:serialNumber', async (req, res) => {
 console.log('[SERV] GET/recupererAppareil/serialNumber?:serialNumber');
 const serialNumber = req.query.serialNumber;
 try {
  const response = await appareilsDM.recupererAppareilParSerialNumber(serialNumber);
  res.send(response);
 } catch (e) {
  res.sendStatus(404);
 }
});

app.post('/editerAppareil', async (req, res) => {
 console.log('[SERV] POST/editerAppareil');
 const id = req.body.id;
 const serNum = req.body.serialNumber;
 const mar = req.body.marque;
 const mod = req.body.modele;
 const dateAcqu = req.body.dateAcquisition;
 const sys = req.body.systeme;
 const proc = req.body.processeur;
 const mem = req.body.memoire;
 const disq = req.body.disque;
 const notes = req.body.notes;
 console.log(req.body);
 try {
  const result = await appareilsDM.editerAppareil(
   id,
   serNum,
   mar,
   mod,
   dateAcqu,
   sys,
   proc,
   mem,
   disq,
   notes
  );
  res.sendStatus(202);
 } catch (e) {
  res.sendStatus(400);
 }
});

app.post('/supprimerAppareil/:appareilID', async (req, res) => {
 console.log('[SERV] POST/supprimerAppareil');
 const appareilID = req.params.appareilID;
 try {
  await appareilsDM.supprimerAppareil(appareilID);
  res.sendStatus(202);
 } catch (e) {
  res.sendStatus(404);
 }
});

//=============== Routes - Ordinateurs ===============
app.get('/ordinateurs', async (req, res) => {
 console.log('[SERV] GET/ordinateurs');
 const response = await ordinateursDM.recupererOrdinateurs();
 response !== undefined ? res.send(response) : res.sendStatus(404);
});

app.get('/recupererOrdinateur/:ordinateurID', async (req, res) => {
 console.log('[SERV] GET/recupererOrdinateur/:ordinateurID');
 const ordinateurID = req.params.id;
 try {
  const response = await ordinateursDM.recupererOrdinateurParId(ordinateurID);
  res.send(response);
 } catch (e) {
  res.sendStatus(404);
 }
});

app.post('/creerOrdinateur', async (req, res) => {
 console.log('[SERV] POST/creerOrdinateur');
 const serNum = req.body.serialNumber;
 const mar = req.body.marque;
 const mod = req.body.modele;
 const dateAcqu = req.body.dateAcquisition;
 const sys = req.body.systeme;
 const proc = req.body.processeur;
 const mem = req.body.memoire;
 const disq = req.body.disque;
 const notes = req.body.notes;
 try {
  const response = await ordinateursDM.creerOrdinateur(
   serNum,
   mar,
   mod,
   dateAcqu,
   sys,
   proc,
   mem,
   disq,
   notes
  );
  res.sendStatus(202);
 } catch (e) {
  res.sendStatus(400);
 }
});

app.post('/creerOrdinateurs', async (req, res) => {
 console.log('[SERV] POST/creerOrdinateurs');
 const qte = req.body.qte;
 const serNum = req.body.serialNumber;
 const mar = req.body.marque;
 const mod = req.body.modele;
 const dateAcqu = req.body.dateAcquisition;
 const sys = req.body.systeme;
 const proc = req.body.processeur;
 const mem = req.body.memoire;
 const disq = req.body.disque;
 const notes = req.body.notes;
 try {
  const response = await ordinateursDM.creerOrdinateurs(
   qte,
   serNum,
   mar,
   mod,
   dateAcqu,
   sys,
   proc,
   mem,
   disq,
   notes
  );
  console.log(response);
  res.sendStatus(202);
 } catch (e) {
  res.sendStatus(400);
 }
});

app.post('/editerAppareil', async (req, res) => {
 console.log('[SERV] POST/editerAppareil');
 const id = req.body.id;
 const serNum = req.body.serialNumber;
 const mar = req.body.marque;
 const mod = req.body.modele;
 const dateAcqu = req.body.dateAcquisition;
 const sys = req.body.systeme;
 const proc = req.body.processeur;
 const mem = req.body.memoire;
 const disq = req.body.disque;
 const notes = req.body.notes;
 console.log(req.body);
 try {
  const result = await ordinateursDM.editerOrdinateur(
   id,
   serNum,
   mar,
   mod,
   dateAcqu,
   sys,
   proc,
   mem,
   disq,
   notes
  );
  res.sendStatus(202);
 } catch (e) {
  res.sendStatus(400);
 }
});

app.post('/supprimerOrdinateur/:ordinateurID', async (req, res) => {
 console.log('[SERV] POST/supprimerOrdinateur');
 const ordinateurID = req.params.ordinateurID;
 try {
  await ordinateursDM.supprimerOrdinateur(ordinateurID);
  res.sendStatus(202);
 } catch (e) {
  res.sendStatus(404);
 }
});

//=============== Routes - Peripheriques ===============

//=============== Routes - Usagers ===============
app.get('/usagers', async (req, res) => {
 console.log('[SERV] GET/usagers');
 try {
  const response = await usagersDM.recupererUsagers();
  res.send(response);
 } catch (e) {
  res.sendStatus(404);
 }
});

app.post('/creerUsager'),
 async (req, res) => {
  console.log('[SERV] POST/creerUsager');
  const prenom = req.body.prenom;
  const nom = req.body.nom;
  usagersDM.creerUsager(prenom, nom);
  res.sendStatus(200);
 };

app.get('/recupererUsager/:usagerID', async (req, res) => {
 console.log('[SERV] GET/recupererUsager/:usagerID');
 console.log(req.params);
 const usagerID = req.params.usagerID;
 try {
  const response = await usagersDM.recupererUsagerParId(usagerID);
  res.send(response);
 } catch (e) {
  res.sendStatus(404);
 }
});

app.post('/affecterAppareil', async (req, res) => {
 console.log('[SERV] POST/affecterAppareil');
 const usager = req.body.usager;
 const appareil = req.body.appareil;
 try {
  if (usager !== undefined && appareil !== undefined) {
   delete usager.id;
   delete usager.label;
   delete appareil.id;
   delete appareil.title;
   delete appareil.etatDisponible;
   delete appareil.details.notes;
   console.log(usager);
   console.log(appareil);
   console.log(`Affecter a l'usager...`);
   await usagersDM.affecterAppareilAUsagerParId(usager._id, appareil);
   console.log(`Rendre l'ordinateur indisponible...`);
   await ordinateursDM.affecterOrdinateur(appareil.serialNumber);
   console.log("Inscrire entree dans l'historique... ");
   await historiquesDM.enregistrerAffectationAppareil(usager, appareil);
   res.sendStatus(200);
  }
 } catch (e) {
  res.sendStatus(404);
 }
});

app.post('/retirerAppareil', async (req, res) => {
 console.log('[SERV] POST/retirerAppareil');
 const usager = req.body.usager;
 const appareil = req.body.appareil;
 try {
  if (usager !== undefined && appareil !== undefined) {
   delete usager.id;
   delete usager.label;
   delete usager.title;
   delete appareil.id;
   delete appareil.title;
   delete appareil.etatDisponible;
   delete appareil.details.notes;

   console.log(`Retirer a l'usager...`);
   await usagersDM.retirerAppareilAUsagerParId(usager._id, appareil);
   console.log(`Rendre l'ordinateur disponible...`);
   await ordinateursDM.retirerOrdinateur(appareil.serialNumber);
   console.log("Inscrire entree dans l'historique... ");
   await historiquesDM.enregistrerRetraitAppareil(usager, appareil);
   res.sendStatus(200);
  }
 } catch (e) {
  res.sendStatus(404);
 }
});

console.log('server starting');
app.listen(3001);
console.log('server started');
