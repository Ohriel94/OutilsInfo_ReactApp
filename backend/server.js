import cors from 'cors';
import express from 'express';
import jwt from 'jsonwebtoken';

import adminsDM from './domain/Administrateurs/adminsDM.js';
import cellulairesDM from './domain/Cellulaires/cellulairesDM.js';
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

//=============== AUTHENTIFICATE ===============
const authenticate = async (req, res, next) => {
 // On ramasse le header d'authorization
 const authHeader = req.headers['authorization'];
 // On obtient le token à partir du header en enlevant le mot "BEARER"
 const token = authHeader && authHeader.split(' ')[1];
 // Si aucun token -> unauthorized
 if (token == null) return res.sendStatus(401);

 try {
  // Vérification du token selon notre secret
  const payload = await jwt.verify(token, jwtSecret);
  // Injection du token dans la requête pour demandeur
  req.userToken = payload;
  // Passage au prochain middleware ou la route demandée
  next();
 } catch (e) {
  // Vérification échouée -> forbidden
  return res.sendStatus(403);
 }
};

//=============== Routes - Administrateurs ===============
app.post('/inscription', async (req, res) => {
 console.log('----- POST/incription -----');
 const prenom = req.body.prenom;
 const nom = req.body.nom;
 const email = req.body.email;
 const password = req.body.password;
 try {
  await adminsDM.creerAdmin(prenom, nom, email, password);
  res.sendStatus(200);
 } catch (e) {
  res.sendStatus(400);
 }
});

app.get('/connexion', async (req, res) => {
 console.log('----- POST/connexion -----');
 const email = req.body.email;
 const password = req.body.password;
 const administrateur = await adminsDM.recupererAdminParEmailEtPassword(email, password);
 if (administrateur != undefined) {
  const token = jwt.sign({ email, password }, jwtSecret);
  return res
   .cookie('access_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
   })
   .status(200)
   .json({ message: 'Logged in successfully 😊 👌' });
 } else res.sendStatus(403);
});

app.post('/deconnexion', authenticate, async (req, res) => {
 return res
  .clearCookie('access_token')
  .status(200)
  .json({ message: 'Successfully logged out 😏 🍀' });
});

app.get('/administrateurs', async (req, res) => {
 console.log('----- GET/administrateurs -----');
 try {
  const response = await adminsDM.recupererAdministrateurs();
  response.map((admin) => {
   delete admin._id;
   delete admin.password;
  });
  res.send(response);
 } catch (e) {
  res.sendStatus(404);
 }
});

app.post('/creerAdministrateur'),
 async (req, res) => {
  console.log('----- POST/creerAdministrateur -----');
  const prenom = req.body.prenom;
  const nom = req.body.nom;
  adminsDM.creerAdministrateur(prenom, nom);
  res.sendStatus(200);
 };

app.get('/recupererAdministrateur/:administrateurID', async (req, res) => {
 console.log('----- GET/recupererAdministrateur/:administrateurID -----');
 const administrateurID = req.params.administrateurID;
 try {
  const response = await adminsDM.recupererAdministrateurParId(administrateurID);
  res.send(response);
 } catch (e) {
  res.sendStatus(404);
 }
});

app.post('/administrateurs/editerAdmin', async (req, res) => {
 console.log('----- POST/administrateurs/editerAdmin -----');
 const nom = req.body.nom;
 const prenom = req.body.prenom;
 const username = req.body.username;
 const email = req.body.email;
 const status = req.body.status;
 try {
  if (nom !== undefined && prenom !== undefined && username !== undefined && status !== undefined) {
   await adminsDM.editerAdministrateur(nom, prenom, username, email, status);
   res.sendStatus(200);
  }
 } catch (e) {
  res.sendStatus(404);
 }
});

app.get('/administrateurs/trouverAdmin', async (req, res) => {
 console.log('----- POST/administrateurs/editerAdmin -----');
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
 console.log('----- GET/moniteurs -----');
 const response = await moniteursDM.recupererMoniteurs();
 res.send(response);
});

//=============== Routes - Historiques ===============
app.get('/historiques', async (req, res) => {
 console.log('----- GET/historiques -----');
 const response = await historiquesDM.recupererHistoriques();
 res.send(response);
});

//=============== Routes - Ordinateurs ===============
app.get('/ordinateurs', async (req, res) => {
 console.log('----- GET/ordinateurs -----');
 const response = await ordinateursDM.recupererOrdinateurs();
 response !== undefined ? res.send(response) : res.sendStatus(404);
});

app.get('/recupererOrdinateur/:ordinateurID', async (req, res) => {
 console.log('----- GET/recupererOrdinateur/:ordinateurID -----');
 const ordinateurID = req.params.ordinateurID;
 try {
  const response = await ordinateursDM.recupererOrdinateurParId(ordinateurID);
  res.send(response);
 } catch (e) {
  res.sendStatus(404);
 }
});

app.post('/creerOrdinateur', async (req, res) => {
 console.log('----- POST/creerOrdinateur -----');
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

app.post('/supprimerOrdinateur/:ordinateurID', async (req, res) => {
 console.log('----- POST/supprimerOrdinateur -----');
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
 console.log('----- GET/usagers -----');
 try {
  const response = await usagersDM.recupererUsagers();
  res.send(response);
 } catch (e) {
  res.sendStatus(404);
 }
});

app.post('/creerUsager'),
 async (req, res) => {
  console.log('----- POST/creerUsager -----');
  const prenom = req.body.prenom;
  const nom = req.body.nom;
  usagersDM.creerUsager(prenom, nom);
  res.sendStatus(200);
 };

app.get('/recupererUsager/:usagerID', async (req, res) => {
 console.log('----- GET/recupererUsager/:usagerID -----');
 const usagerID = req.params.usagerID;
 try {
  const response = await usagersDM.recupererUsagerParId(usagerID);
  res.send(response);
 } catch (e) {
  res.sendStatus(404);
 }
});

app.post('/affecterAppareil', async (req, res) => {
 console.log('----- POST/affecterAppareil -----');
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
 console.log('----- POST/retirerAppareil -----');
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
