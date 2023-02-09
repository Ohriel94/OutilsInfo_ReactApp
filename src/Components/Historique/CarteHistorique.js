import * as React from 'react';
import axios from 'axios';
import { Grid, Typography, Paper } from '@mui/material';

const BGCouleurListe = (etat) => {
 let couleur = '';
 if (etat === 'affectation') couleur = '#67b56f';
 else couleur = '#b55353';
 return couleur;
};

const paperTheme = {
 color: 'success',
 sx: {
  padding: '2vh',
  fontSize: 18,
 },
 style: {
  width: 'auto',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
 },
 variant: 'contained',
};

const componentStyle = {
 style: {
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
 },
 sx: { padding: (0, 2) },
};

let startTime;
setInterval(function () {
 if (!startTime) {
  startTime = Date.now();
 }
}, 100);

const CarteHistorique = (props) => {
 const { entree, entreeKey } = props;

 const getInfos = async (idUsager, idAppareil) => {
  const getUsagerRequest = await axios
   .get(`http://localhost:3001/recupererUsager/` + idUsager)
   .then((response) => setUsager({ prenom: response.data.prenom, nom: response.data.nom }))
   .catch((error) => console.log('Failed to retrieve user : ' + error));

  const getOrdinateurRequest = await axios
   .get('http://localhost:3001/recupererOrdinateur/' + idAppareil)
   .then((response) =>
    setOrdinateur({
     serialNumber: response.data.serialNumber,
     nom: `${response.data.details.marque} ${response.data.details.modele}`,
     systeme: response.data.details.configuration.systeme,
     processeur: response.data.details.configuration.processeur,
     memoire: response.data.details.configuration.memoire,
     disque: response.data.details.configuration.disque,
    })
   )
   .catch((error) => console.log('Failed to retrieve device : ' + error));
 };

 const [usager, setUsager] = React.useState({});
 const [ordinateur, setOrdinateur] = React.useState({});

 React.useEffect(() => {
  getInfos(entree.idUsager, entree.idAppareil);
 }, []);

 return (
  <Paper
   key={entreeKey + Math.random() * 900000}
   elevation={6}
   sx={{
    padding: '1vh',
    margin: '0.5vh',
    backgroundColor: BGCouleurListe(entree.type),
   }}
   style={paperTheme.style}>
   <Typography variant={'h6'}>{`${usager.prenom} ${usager.nom}`}</Typography>
   <hr />
   <Grid
    container
    style={{
     flexDirection: 'row',
    }}
    sx={{
     justifyContent: 'center',
     alignItems: 'center',
    }}>
    <Grid
     textAlign={'center'}
     style={{ height: 'auto', width: '9vh' }}
     xs={4}
     sx={{
      textAlign: 'left',
     }}>
     <Typography variant={'h6'}>{entree.time}</Typography>
    </Grid>
    <Grid
     xs={8}
     sx={{
      textAlign: 'right',
     }}>
     <Typography variant='subtitle2'>{`${ordinateur.serialNumber} - ${ordinateur.nom}`}</Typography>
     <Typography variant='subtitle2'>{`${ordinateur.systeme}`}</Typography>
     <Typography variant='subtitle2'>{`${ordinateur.processeur}`}</Typography>
     <Grid container>
      <Grid item xs={6}>
       <Typography variant='subtitle2'>{ordinateur.disque} Go</Typography>
      </Grid>
      <Grid item xs={6}>
       <Typography variant='subtitle2'>{ordinateur.memoire} Go</Typography>
      </Grid>
     </Grid>
    </Grid>
   </Grid>
  </Paper>
 );
};

export default CarteHistorique;
