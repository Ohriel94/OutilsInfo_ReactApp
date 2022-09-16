import express from 'express';
import jwt from 'jsonwebtoken';
import usagersDM from './domain/usagersDM.js';
import ordinateursDM from './domain/ordinateursDM.js';
import historiqueDM from './domain/historiqueDM.js';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

// app.post("/signup", async (req, res) => {
//   const username = req.body.username;
//   const password = req.body.password;
//   try {
//     await usagersDM.createAdventurer(username, password);
//     res.sendStatus(200);
//   } catch (e) {
//     res.sendStatus(400);
//   }
// });

// app.post("/login", async (req, res) => {
//   const username = req.body.username;
//   const password = req.body.password;
//   const adventurer = await usagersDM.getAdventurerByNameAndPassword(
//     username,
//     password
//   );
//   if (adventurer != undefined) {
//     const token = jwt.sign({ username, password }, "divinity");
//     res.send(token);
//   } else res.sendStatus(403);
// });

// const authenticate = async (req, res, next) => {
//   // On ramasse le header d'authorization
//   const authHeader = req.headers["authorization"];
//   // On obtient le token à partir du header en enlevant le mot "BEARER"
//   const token = authHeader && authHeader.split(" ")[1];
//   // Si aucun token -> unauthorized
//   if (token == null) return res.sendStatus(401);

//   try {
//     // Vérification du token selon notre secret
//     const payload = await jwt.verify(token, "divinity");
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
 res.send(response);
});

app.get('/recupererOrdinateur/:serNum', async (req, res) => {
 console.log('----- GET/recupererOrdinateur -----');
 const serNum = req.params.serNum;
 console.log(serNum);
 const response = await ordinateursDM.trouverOrdinateur(serNum);
 res.send(response);
});

app.get('/historique', async (req, res) => {
 console.log('----- GET/historiqueDM -----');
 const response = await historiqueDM.recupererHistoriques();
 res.send(response);
});

app.post('/creerUsager'),
 async (req, res) => {
  console.log('----- POST/usagersDM -----');
  const newUsager = req.body;
  newUsager.appareilsAffecter = [];
  console.log('Add Usager');
  console.log(newUsager);
 };

app.post('/affecterAppareil', async (req, res) => {
 console.log('----- POST/affecterAppareil -----');
 const usager = req.body;
 try {
  if (
   usager.ordinateurAssigne !== undefined &&
   usager.ordinateurAssigne !== {}
  ) {
   console.log(`Affecter a l'usager...`);
   delete usager.id;
   delete usager.label;
   delete usager.title;
   delete usager.ordinateurAssigne.id;
   delete usager.ordinateurAssigne.title;
   delete usager.ordinateurAssigne.etatDisponible;
   console.log(usager);
   await usagersDM.affecterAppareilAUsager(
    usager._id,
    usager.ordinateurAssigne
   );
   console.log(`Affecter a l'ordinateur...`);
   await ordinateursDM.affecterOrdinateur(usager.ordinateurAssigne);
   await historiqueDM.enregistrerAffectationAppareil(
    usager,
    usager.ordinateurAssigne
   );
   res.sendStatus(200);
  }
 } catch (e) {
  res.sendStatus(404);
 }
});

app.post('/retirerAppareil', async (req, res) => {
 console.log('----- POST/retirerAppareil -----');
 const usager = req.body;
 if (
  usager.ordinateurAssigne !== undefined &&
  usager.ordinateurAssigne !== {}
 ) {
  try {
   console.log(`Retirer a l'usager...`);
   delete usager.id;
   delete usager.label;
   delete usager.title;
   delete usager.ordinateurAssigne.id;
   delete usager.ordinateurAssigne.title;
   delete usager.ordinateurAssigne.etatDisponible;
   console.log(usager);
   await usagersDM.retirerAppareilAUsager(usager._id, usager.ordinateurAssigne);
   console.log(`Retirer a l'ordinateur...`);
   await ordinateursDM.retirerOrdinateur(usager.ordinateurAssigne);
   await historiqueDM.enregistrerRetraitAppareil(
    usager,
    usager.ordinateurAssigne
   );
   res.sendStatus(200);
  } catch (e) {
   res.sendStatus(404);
  }
 }
});

console.log('server starting');
app.listen(3001);
console.log('server started');
