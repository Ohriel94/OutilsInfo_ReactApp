import * as React from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const BGCouleurListe = (etat) => {
 let couleur = '';
 if (etat === false) couleur = '#b55353';
 else couleur = '#67b56f';
 return couleur;
};

const componentStyle = {
 style: {
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
 },
 sx: { padding: (0, 1), border: 'lightgray solid 1px' },
};

const HistoDetenteurs = (props) => {
 const { idAppareil, detenteurs, setDetenteurs, notifier } = props;
 const navigate = useNavigate();

 const getListeDetenteursRequest = (idAppareil) => {
  const f = async () => {
   try {
    const getAdministrateursRequest = await Axios({
     method: 'get',
     url: `http://localhost:3001/listeDetenteurs/`,
     params: { idAppareil: idAppareil },
    });
    setDetenteurs(getAdministrateursRequest.data);
   } catch (e) {
    console.log('Failed to connect ' + e);
   }
  };
  f();
 };

 React.useEffect(() => {
  console.log('idAppareil : ', idAppareil);
  if (idAppareil !== undefined) getListeDetenteursRequest();
 });

 const afficherDetenteurs = () => {
  let filtered = {};
  if (detenteurs != []) {
   detenteurs.map((detenteur, index) => {
    if (detenteurs.filter(() => detenteur.idAppareil == idAppareil)[0]) {
     filtered = detenteurs.filter(() => detenteur.idAppareil == idAppareil)[0];
     console.log(`Detenteur.idAppareil : `, detenteur.idAppareil);
     console.log('idAppareil : ', idAppareil);

     console.log('Filtered idAppareil : ', detenteurs.filter(() => detenteur.idAppareil == idAppareil)[0]);
     return (
      <Grid container key={index} alignItems={'center'} textAlign={'center'}>
       <Grid item xs={4}>
        <Typography variant='paragraph'>{filtered.idUsager}</Typography>
       </Grid>
       <Grid item xs={4}>
        <Typography variant='subtitle2'>
         Le {filtered.debut.date} à {filtered.debut.heure}
        </Typography>
       </Grid>
       <Grid item xs={4}>
        <Typography variant='subtitle2'>
         Le {filtered.fin.date} à {filtered.fin.heure}
        </Typography>
       </Grid>
      </Grid>
     );
    }
   });
  }
 };

 return (
  <Grid
   container
   key={'HistoDetenteurs'}
   alignItems={'center'}
   textAlign={'center'}
   style={{
    flexDirection: 'row',
   }}>
   <Grid container key={'HistoDetenteurs'} alignItems={'center'} textAlign={'center'}>
    <Grid item xs={4}>
     <Typography variant='h6'>Assigner à</Typography>
    </Grid>
    <Grid item xs={4}>
     <Typography variant='h6'>Début du prêt</Typography>
    </Grid>
    <Grid item xs={4}>
     <Typography variant='h6'>Fin du prêt</Typography>
    </Grid>
   </Grid>
   {afficherDetenteurs()}
  </Grid>
 );
};

export default HistoDetenteurs;
