import * as React from 'react';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import AdminAccordeon from '../../../Components/Administrateurs/AdminAccordeon';

const EcranAdmin = (props) => {
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

 const getAdminsRequest = axios.get('http://localhost:3001/administrateurs');

 React.useEffect(() => {
  notifier.asyncBlock(getAdminsRequest, (resp) => {
   setAdmins(resp.data);
  });
 }, []);

 return (
  <React.Fragment>
   {admins.map((administrateur, administrateurKey) => (
    <Grid
     container
     key={administrateurKey}
     style={{
      flexDirection: 'column',
     }}>
     <AdminAccordeon administrateur={administrateur} key={administrateurKey} />
    </Grid>
   ))}
  </React.Fragment>
 );
};

export default EcranAdmin;
