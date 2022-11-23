import * as React from 'react';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import AdministrateurAccordeon from '../../Components/Administrateurs/AdministrateurAccordeon';

const EcranAdmins = (props) => {
 const [admins, setAdmins] = React.useState([{ prenom: 'Alpha', nom: 'Beta' }]);

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
  getAdmins();
 }, []);

 const getAdmins = () => {
  const f = async () => {
   try {
    const getAdminsRequest = await axios({
     method: 'get',
     url: 'http://localhost:3001/administrateurs',
    });
    console.log(getAdminsRequest.data);
    setAdmins(getAdminsRequest.data);
    return getAdminsRequest.data;
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

 console.log(admins);

 return (
  <React.Fragment>
   {admins.map((administrateur, administrateurKey) => (
    <Grid
     container
     key={administrateurKey}
     style={{
      flexDirection: 'column',
     }}
    >
     <AdministrateurAccordeon administrateur={administrateur} key={administrateurKey} />
    </Grid>
   ))}
  </React.Fragment>
 );
};

export default EcranAdmins;
