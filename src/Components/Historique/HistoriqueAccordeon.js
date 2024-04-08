import * as React from 'react';
import CarteHistorique from './CarteHistorique';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

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

const HistoriqueAccordeon = (props) => {
 const { historique, key } = props;

 return (
  <Accordion key={key + Math.random() * 900000}>
   <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls='panel1a-content' id='panel1a-header'>
    <Typography variant='h5' sx={{ width: '90%' }}>{`${historique.date}`}</Typography>
    <Typography variant='subtitle2' color='secondary'>{`${historique.entrees.length}`}</Typography>
   </AccordionSummary>
   <AccordionDetails>
    <Grid container>
     {historique.entrees.map((entree, entreeKey) => (
      <CarteHistorique entree={entree} entreeKey={entreeKey} />
     ))}
    </Grid>
   </AccordionDetails>
  </Accordion>
 );
};

export default HistoriqueAccordeon;
