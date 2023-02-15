import * as React from 'react';
import Theme from '../../Ressources/Theme';
import { ThemeProvider } from '@mui/material/styles';
import EditerAdmin from '../../Places/MainPage/Gestion/Administrateurs/EditerAdmin';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Switch from '@mui/material/Switch';

const AdministrateurAccordeon = (props) => {
 const { administrateur } = props;
 const label = { inputProps: { 'aria-label': 'Switch demo' } };

 const componentStyle = {
  style: {
   justifyContent: 'center',
   alignItems: 'center',
   textAlign: 'center',
  },
  sx: { padding: (0, 2), border: 'lightgray solid 1px' },
 };

 return (
  <ThemeProvider theme={Theme}>
   <Accordion>
    <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls='panel1a-content' id='panel1a-header'>
     <Grid container>
      <Grid item xs={8}>
       <Typography variant='h5'>{administrateur.prenom + ' ' + administrateur.nom}</Typography>
      </Grid>
      <Grid item xs={4}>
       <EditerAdmin administrateur={administrateur} />
      </Grid>
     </Grid>
    </AccordionSummary>
    <AccordionDetails>
     <Grid container>
      <Grid item xs={12} sx={componentStyle.sx}>
       {administrateur.flags !== undefined ? (
        <Grid container>
         <Grid item xs={4} md={2}>
          <Typography variant='caption' align='center'>
           Actif
          </Typography>
          <Switch
           {...label}
           id='swActif'
           defaultChecked={administrateur.flags.actif}
           onChange={(newState) => (administrateur.flags.actif = newState)}
          />
         </Grid>
         <Grid item xs={4} md={2}>
          <Typography variant='caption' align='center'>
           Admin
          </Typography>
          <Switch
           {...label}
           id='swAdmin'
           defaultChecked={administrateur.flags.admin}
           onChange={(newState) => (administrateur.flags.admin = newState)}
          />
         </Grid>
        </Grid>
       ) : (
        <br />
       )}
      </Grid>
     </Grid>
    </AccordionDetails>
   </Accordion>
  </ThemeProvider>
 );
};

export default AdministrateurAccordeon;
