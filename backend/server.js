import cors from 'cors';
import express from 'express';
import jwt from 'jsonwebtoken';
import adminsDM from './domain/adminsDM.js';
import usagersDM from './domain/usagersDM.js';
import ordinateursDM from './domain/ordinateursDM.js';
import historiquesDM from './domain/historiquesDM.js';

const app = express();
app.use(express.json());
app.use(cors());

app.post('/inscription', async (req, res) => {
 console.log('----- POST/incription -----');
 const username = req.body.username;
 const password = req.body.password;
 try {
  await adminsDM.creerAdmin(username, password);
  res.sendStatus(200);
 } catch (e) {
  res.sendStatus(400);
 }
});

app.post('/connexion', async (req, res) => {
 console.log('----- POST/connexion -----');
 const username = req.body.username;
 const password = req.body.password;
 const adventurer = await adminsDM.recupererAdministrateurParNomEtMotDePasse(
  username,
  password
 );
 if (adventurer != undefined) {
  const token = jwt.sign(
   { username, password },
   '000b5f770df78872ce78360654ac3248ad896b0361b1f8065f2fdae6e5333a7d35ba9ef2954999c8ced06ba1b50f59c3d8581a2ee8b2a09495b74833a4222bc0'
  );
  res.send(token);
 } else res.sendStatus(403);
});

// const authenticate = async (req, res, next) => {
//   // On ramasse le header d'authorization
//   const authHeader = req.headers["authorization"];
//   // On obtient le token à partir du header en enlevant le mot "BEARER"
//   const token = authHeader && authHeader.split(" ")[1];
//   // Si aucun token -> unauthorized
//   if (token == null) return res.sendStatus(401);

//   try {
//     // Vérification du token selon notre secret
//     const payload = await jwt.verify(token, "000b5f770df78872ce78360654ac3248ad896b0361b1f8065f2fdae6e5333a7d35ba9ef2954999c8ced06ba1b50f59c3d8581a2ee8b2a09495b74833a4222bc0");
//     // Injection du token dans la requête pour demandeur
//     req.userToken = payload;
//     // Passage au prochain middleware ou la route demandée
//     next();
//   } catch (e) {
//     // Vérification échouée -> forbidden
//     return res.sendStatus(403);
//   }
// };

app.get('/usagers', async (req, res) => {
 console.log('----- GET/usagers -----');
 const response = await usagersDM.recupererUsagers();
 res.send(response);
});

app.get('/recupererUsager*', async (req, res) => {
 console.log('----- GET/recupererUsager -----');
 console.log(req.params);
 const usagerId = req.params.id;
 res.send(usagerId);
 // console.log(usagerId);
 // const response = await usagersDM.recupererUsagerParId(usagerId);
 // res.send(response);
});

app.get('/ordinateurs', async (req, res) => {
 console.log('----- GET/ordinateurs -----');
 const response = await ordinateursDM.recupererOrdinateurs();
 response !== undefined ? res.send(response) : res.sendStatus(404);
});

app.get('/recupererOrdinateur/:serNum', async (req, res) => {
 console.log('----- GET/recupererOrdinateur -----');
 const serNum = req.params.serNum;
 const response = await ordinateursDM.recupererOrdinateurParSerialNumber(
  serNum
 );
 response !== undefined ? res.send(response) : res.sendStatus(404);
});

app.get('/historiques', async (req, res) => {
 console.log('----- GET/historiquesDM -----');
 const response = await historiquesDM.recupererHistoriques();
 res.send(response);
});

app.post('/creerUsager'),
 async (req, res) => {
  console.log('----- POST/usagersDM -----');
  const newUsager = req.body;
  //   newUsager.appareilsAffecter = [];
  //   console.log('Add Usager');
  //   console.log(newUsager);
 };

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
