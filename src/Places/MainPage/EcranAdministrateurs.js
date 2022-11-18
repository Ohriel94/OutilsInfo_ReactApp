import * as React from 'react';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import AdministrateurAccordeon from '../../Components/Administrateurs/AdministrateurAccordeon';

const Usagers = (props) => {
 const [Administrateurs, setAdministrateurs] = React.useState([{ prenom: 'Alpha', nom: 'Beta' }]);

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
  getAdministrateurs();
 }, []);

 const getAdministrateurs = () => {
  const f = async () => {
   try {
    const getAdministrateursRequest = await axios({
     method: 'get',
     url: 'http://localhost:3001/administrateurs',
    });
    setAdministrateurs(getAdministrateursRequest.data);
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
   {Administrateurs.map((Administrateur, AdministrateurKey) => (
    <Grid
     container
     key={AdministrateurKey}
     style={{
      flexDirection: 'column',
     }}
    >
     <AdministrateurAccordeon Administrateur={Administrateur} key={AdministrateurKey} />
    </Grid>
   ))}
  </React.Fragment>
 );
};

export default Usagers;
