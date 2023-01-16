import * as React from 'react';
import Theme from '../../Ressources/Theme';
import { ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import EditerOrdinateur from './EditerOrdinateur';
import HistoDetenteurs from '../Historique/HistoDetenteurs';

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

const OrdinateurAccordeon = (props) => {
 const navigate = useNavigate();

 const [detenteurs, setDetenteurs] = React.useState([]);

 const { ordinateur, handleSubmit, notifier } = props;

 return (
  <ThemeProvider theme={Theme}>
   <Accordion>
    <AccordionSummary
     sx={{ backgroundColor: BGCouleurListe(ordinateur.etatDisponible) }}
     expandIcon={<ExpandMoreIcon />}
     aria-controls='panel1a-content'
     id='panel1a-header'>
     <Typography variant='h5'>
      {`${ordinateur.serialNumber} - ${ordinateur.details.marque} ${ordinateur.details.modele}`}
     </Typography>
    </AccordionSummary>
    <AccordionDetails>
     <Grid container>
      <Grid item xs={5} sm={3} textAlign={'center'} sx={componentStyle.sx}>
       <Typography variant='h6'>Spécifications</Typography>
       <hr />
       <Grid container style={componentStyle.style}>
        <Typography variant='subtitle2'>{ordinateur.details.configuration.processeur}</Typography>
        <Typography variant='subtitle2'>{ordinateur.details.configuration.systeme}</Typography>
        <Grid container>
         <Grid item xs={6}>
          <Typography variant='subtitle2'>{ordinateur.details.configuration.disque} Go</Typography>
         </Grid>
         <Grid item xs={6}>
          <Typography variant='subtitle2'>{ordinateur.details.configuration.memoire} Go</Typography>
         </Grid>
        </Grid>
        <Grid item xs={12}>
         <Typography variant='subtitle2'>{ordinateur.details.dateAcquisition}</Typography>
        </Grid>
       </Grid>
      </Grid>
      <Grid item xs={7} sm={9} sx={componentStyle.sx}>
       <Grid container>
        <Grid item xs={11} style={componentStyle.style}>
         <Typography variant='h6'>Notes</Typography>
        </Grid>
        <Grid item xs={1}>
         <EditerOrdinateur handleSubmit={handleSubmit} notifier={notifier} ordinateur={ordinateur} />
        </Grid>
       </Grid>
       <hr />
       <Typography variant='body2'>{ordinateur.details.notes}</Typography>
      </Grid>
     </Grid>
     <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls='panel1a-content' id='panel1a-header'>
       <Typography variant='h5'>Historique des détenteurs</Typography>
      </AccordionSummary>
      <AccordionDetails>
       {/* <HistoDetenteurs
        idAppareil={ordinateur._id}
        notifier={notifier}
        detenteurs={detenteurs}
        setDetenteurs={setDetenteurs}
       /> */}
      </AccordionDetails>
     </Accordion>
    </AccordionDetails>
   </Accordion>
  </ThemeProvider>
 );
};

export default OrdinateurAccordeon;
