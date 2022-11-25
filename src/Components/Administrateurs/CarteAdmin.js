import * as React from 'react';
import Axios from 'axios';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import Paper from '@mui/material/Paper';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const CarteAdministrateur = (props) => {
 const [administrateur, setAdministrateur] = React.useState({});
 const { appareil } = props;

 const paperTheme = {
  color: 'success',
  sx: {
   padding: '2vh',
   fontSize: 18,
  },
  style: {
   width: 'auto',
   justifyContent: 'left',
   alignItems: 'left',
   textAlign: 'left',
  },
  variant: 'contained',
 };

 const recupererDetailsOrdi = (appareil) => {
  const f = async () => {
   try {
    const getAdministrateursRequest = await Axios({
     method: 'get',
     url: 'http://localhost:3001/recupererAdministrateur/' + appareil._id,
    });
    appareil = getAdministrateursRequest.data;
   } catch (e) {
    console.log('Failed to connect ' + e);
   }
  };
  f();
 };

 React.useEffect(() => {
  if (appareil !== undefined) recupererDetailsOrdi(appareil);
 }, []);

 return (
  <Paper elevation={6} sx={paperTheme.sx} key={Math.random() * 9000000}>
   <Typography>
    {appareil.serialNumber} - {appareil.details.marque} {appareil.details.modele}
   </Typography>
  </Paper>
 );
};

export default CarteAdministrateur;
