import * as React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AWN from 'awesome-notifications';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import OrdinateurAccordeon from '../../../../Components/Ordinateurs/OrdinateurAccordeon';

const EcranOrdinateurs = (props) => {
 const navigate = useNavigate();
 const [ordinateurs, setOrdinateurs] = React.useState([]);
 const { token } = props;

 const componentStyle = {
  style: {
   background: '0971f1',
  },
  sx: { padding: 1, marginBottom: 0.5, zIndex: 1 },
 };

 let globalOptions = { icons: { enabled: false } };
 let nextCallOptions = {};

 let notifier = new AWN(globalOptions);

 const handleSubmit = async (event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);

  const f = async () => {
   try {
    const inscrireOrdinateurRequest = await axios({
     method: 'post',
     url: 'http://localhost:3001/inscrireOrdinateur',
     data: {
      id: parseInt(data.get('id')),
      prenom: data.get('prenom'),
      nom: data.get('nom'),
      adresse: data.get('adresse'),
      motDePasse: data.get('motDePasse'),
     },
    });
   } catch (e) {
    console.log('Failed to connect ' + e);
   }
  };
  f();
 };

 const getOrdinateursPromise = axios.get('http://localhost:3001/ordinateurs');

 React.useEffect(() => {
  notifier.asyncBlock(getOrdinateursPromise, (resp) => {
   console.log(`Nombre d'elements : ${resp.data.length}`);
   setOrdinateurs(resp.data);
   notifier.success(`Nombre d'elements : ${resp.data.length}`, nextCallOptions);
  });

  notifier.modal('test');
 }, []);

 return (
  <React.Fragment>
   <Box sx={componentStyle.sx} position='fixed'>
    <Button
     onClick={() => navigate('/gestion/ordinateurs/ajouter')}
     variant='contained'
     color='primary'
     size='small'
    >
     Ajouter
    </Button>
   </Box>
   <Box sx={{ marginTop: 8 }}>
    {ordinateurs.map((ordinateur, ordinateurKey) => (
     <OrdinateurAccordeon ordinateur={ordinateur} key={ordinateurKey} handleSubmit={handleSubmit} />
    ))}
   </Box>
  </React.Fragment>
 );
};

export default EcranOrdinateurs;
