import * as React from 'react';
import CarteAdministrateur from './CarteAdministrateur';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const AdministrateurAccordeon = (props) => {
 let { administrateur } = props;
 if (administrateur === undefined) administrateur = [{ prenom: 'Alpha', nom: 'Beta' }];

 return (
  <Accordion>
   <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls='panel1a-content' id='panel1a-header'>
    <Typography variant='h5'>{administrateur.prenom + ' ' + administrateur.nom}</Typography>
   </AccordionSummary>
   <AccordionDetails>
    <Box>
     <Typography variant='h6'>Droits</Typography>
     {/* {administrateur.appareilsAffectes.map((appareil) => {
      if (appareil != undefined) return <CarteAdministrateur appareil={appareil} />;
     })} */}
    </Box>
    <Box>
     <Typography variant='h6'>Groupes</Typography>
    </Box>
   </AccordionDetails>
  </Accordion>
 );
};

export default AdministrateurAccordeon;
