import * as React from 'react';
import EditerAdministrateur from './EditerAdministrateur';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const AdministrateurAccordeon = (props) => {
 let { administrateur } = props;
 if (administrateur === undefined) administrateur = [{ prenom: 'Alpha', nom: 'Beta' }];

 const componentStyle = {
  style: {
   justifyContent: 'center',
   alignItems: 'center',
   textAlign: 'center',
  },
  sx: { padding: (0, 2), border: 'lightgray solid 1px' },
 };

 return (
  <Accordion>
   <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls='panel1a-content' id='panel1a-header'>
    <Typography variant='h5'>{administrateur.prenom + ' ' + administrateur.nom}</Typography>
   </AccordionSummary>
   <AccordionDetails>
    <Grid container>
     <Grid item xs={7} sm={9} sx={componentStyle.sx}>
      <EditerAdministrateur administrateur={administrateur} />
     </Grid>
    </Grid>
   </AccordionDetails>
  </Accordion>
 );
};

export default AdministrateurAccordeon;
