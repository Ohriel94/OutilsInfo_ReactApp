import * as React from 'react';
import { Routes, Route } from 'react-router-dom';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import UsagerAccordeon from '../../Components/UsagerAccordeon';
import { NoMeetingRoomTwoTone } from '@mui/icons-material';
import HistoriqueAccordeon from '../../Components/Historique/HistoriqueAccordeon';

const Usagers = (props) => {
 const [historiques, setHistoriques] = React.useState([]);
 const { token, niveau, setNiveau } = props;

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

 React.useEffect(() => {
  getHistoriques();
 }, []);

 const getHistoriques = () => {
  const f = async () => {
   try {
    const getHistoriquesRequest = await axios({
     method: 'get',
     url: 'http://localhost:3001/historiques',
    });
    setHistoriques(getHistoriquesRequest.data);
   } catch (e) {
    console.log('Failed to connect ' + e);
   }
  };
  f();
 };

 const BGCouleurListe = (etat) => {
  let couleur = '';
  if (etat === 'affectation') couleur = '#67b56f';
  else couleur = '#b55353';
  return couleur;
 };

 return (
  <React.Fragment>
   {historiques.map((historique, historiqueKey) => (
    <Grid
     container
     key={historiqueKey}
     style={{
      flexDirection: 'column',
     }}>
     <HistoriqueAccordeon historique={historique} key={historiqueKey} />
    </Grid>
   ))}
  </React.Fragment>
 );
};

export default Usagers;
