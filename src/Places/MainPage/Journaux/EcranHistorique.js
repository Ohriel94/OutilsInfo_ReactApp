import * as React from 'react';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import HistoriqueAccordeon from '../../../Components/Historique/HistoriqueAccordeon';

const Usagers = (props) => {
 const [historiques, setHistoriques] = React.useState([]);
 const { token } = props;

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
    const getHistoriquesRequest = await axios.get('http://localhost:3001/historiques').then((response) => {
     console.log(response.data);
     setHistoriques(response.data);
    });
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
