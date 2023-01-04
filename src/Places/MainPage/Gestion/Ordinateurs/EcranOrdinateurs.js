import * as React from 'react';
import axios from 'axios';
import AWN from 'awesome-notifications';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import OrdinateurAccordeon from '../../../../Components/Ordinateurs/OrdinateurAccordeon';

const EcranOrdinateurs = (props) => {
 const navigate = useNavigate();
 const [ordinateurs, setOrdinateurs] = React.useState([]);
 const { token, notifier } = props;

 const componentStyle = {
  style: {
   background: '0971f1',
  },
  sx: { padding: 1, marginBottom: 0.5, zIndex: 1 },
 };

 const getOrdinateursRequest = axios.get('http://localhost:3001/ordinateurs');

 React.useEffect(() => {
  notifier.asyncBlock(getOrdinateursRequest, (resp) => {
   setOrdinateurs(resp.data);
  });
 }, []);

 return (
  <React.Fragment>
   <Box sx={componentStyle.sx} position='fixed'>
    <Button
     onClick={() => navigate('/gestion/ordinateurs/ajouter')}
     variant='contained'
     color='primary'
     size='small'>
     Ajouter
    </Button>
   </Box>
   <Box sx={{ marginTop: 8 }}>
    {ordinateurs.map((ordinateur, ordinateurKey) => (
     <OrdinateurAccordeon ordinateur={ordinateur} key={ordinateurKey} />
    ))}
   </Box>
  </React.Fragment>
 );
};

export default EcranOrdinateurs;
