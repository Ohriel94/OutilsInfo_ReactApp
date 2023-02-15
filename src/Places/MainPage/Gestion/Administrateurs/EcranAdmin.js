import * as React from 'react';
import Axios from 'axios';
import AWN from 'awesome-notifications';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import AdminAccordeon from '../../../../Components/Administrateurs/AdminAccordeon';

const EcranAdmin = (props) => {
 const navigate = useNavigate();
 const [admins, setAdmins] = React.useState([]);
 const { token, notifier } = props;

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

 const getAdminsRequest = Axios.get('http://localhost:3001/administrateurs');

 React.useEffect(() => {
  notifier.asyncBlock(getAdminsRequest, (resp) => {
   setAdmins(resp.data);
  });
 }, []);

 return (
  <React.Fragment>
   <Button
    onClick={() => navigate('/gestion/administrateurs/ajouter')}
    variant='contained'
    color='primary'
    size='small'>
    Ajouter
   </Button>
   {admins.map((administrateur, administrateurKey) => (
    <AdminAccordeon administrateur={administrateur} key={administrateurKey} />
   ))}
  </React.Fragment>
 );
};

export default EcranAdmin;
