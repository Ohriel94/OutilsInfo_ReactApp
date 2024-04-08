import historiquesDB from '../../database/historiquesDB.js';

const recupererHistoriques = async () => {
 const historiques = await historiquesDB.getAll();
 return historiques;
};

const recupererDetenteursParAppareil = async (idAppareil) => {
 const detenteurs = [];
 const historiques = await historiquesDB.getAll();
 historiques.map((journee) => {
  let entreeDetenteur;
  journee.entrees.map((entree) => {
   if (entree.idAppareil === idAppareil) {
    switch (entree.type) {
     case 'affectation':
      entreeDetenteur = {
       appareil: { id: idAppareil, nom: entree.appareil },
       detenteur: [
        {
         id: entree.idUsager,
         nom: entree.usager,
         periode: { debut: { idHistorique: journee._id, date: journee.date, heure: entree.time } },
        },
       ],
      };
      detenteurs.push(entreeDetenteur);
      break;
     case 'retrait':
      if (detenteurs.filter((detenteur) => detenteur.appareil.id === idAppareil)[0])
       entreeDetenteur = {
        appareil: { id: idAppareil, nom: entree.appareil },
        detenteur: [
         {
          id: entree.idUsager,
          nom: entree.usager,
          periode: { fin: { idHistorique: journee._id, date: journee.date, heure: entree.time } },
         },
        ],
       };
      break;
    }
    detenteurs.push(entreeDetenteur);
   }
  });
 });
 return detenteurs;
};

const enregistrerAffectationAppareil = async (usager, appareil) => {
 const date = new Date();
 if (usager._id !== undefined && appareil._id !== undefined) {
  const nouvelleEntree = creerEntreeHistorique(date, appareil, usager, `affectation`);
  const nouvelleJournee = creerJourneeHistorique(date);
  await ajouterEntreeHistorique(nouvelleJournee, nouvelleEntree);
 }
};

const enregistrerRetraitAppareil = async (usager, appareil) => {
 const date = new Date();
 if (usager._id !== undefined && appareil._id !== undefined) {
  const nouvelleEntree = creerEntreeHistorique(date, appareil, usager, `retrait`);
  const nouvelleJournee = creerJourneeHistorique(date);
  await ajouterEntreeHistorique(nouvelleJournee, nouvelleEntree);
 }
};

//=============== Utilitaires ===============

const creerJourneeHistorique = (date) => {
 const nouvelleJournee = { date: formaterDate(date), entrees: [] };
 return nouvelleJournee;
};

const creerEntreeHistorique = (date, appareil, usager, operation) => {
 const nouvelleEntree = {
  time: formaterHeure(date),
  type: operation,
  appareil: `${appareil.serialNumber} - ${appareil.details.marque} ${appareil.details.modele}`,
  usager: `${usager.prenom} ${usager.nom}`,
  idUsager: usager._id,
  idAppareil: appareil._id,
 };
 return nouvelleEntree;
};

const ajouterEntreeHistorique = async (nouvelleJournee, nouvelleEntree) => {
 const journeeTrouvee = await historiquesDB.findByDate(nouvelleJournee.date);
 if (journeeTrouvee !== undefined) {
  journeeTrouvee.entrees.push(nouvelleEntree);
  await historiquesDB.updateById(journeeTrouvee._id, journeeTrouvee);
 } else {
  nouvelleJournee.entrees.push(nouvelleEntree);
  await historiquesDB.addOne(nouvelleJournee);
 }
};

const formaterA2Digits = (num) => {
 return num.toString().padStart(2, '0');
};

const formaterHeure = (date) => {
 const heureFormatee = [
  formaterA2Digits(date.getHours()),
  formaterA2Digits(date.getMinutes()),
  formaterA2Digits(date.getSeconds()),
 ].join(':');
 return heureFormatee;
};

const formaterDate = (date) => {
 const dateFormatee = [
  formaterA2Digits(date.getDate()),
  formaterA2Digits(date.getMonth() + 1),
  date.getFullYear(),
 ].join('/');
 return dateFormatee;
};

export default {
 recupererHistoriques,
 recupererDetenteursParAppareil,
 enregistrerAffectationAppareil,
 enregistrerRetraitAppareil,
 formaterA2Digits,
 formaterHeure,
 creerEntreeHistorique,
 formaterDate,
 creerJourneeHistorique,
 ajouterEntreeHistorique,
};
