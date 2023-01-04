import * as React from 'react';
import axios from 'axios';
import AWN from 'awesome-notifications';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import UsagerAccordeon from '../../../../Components/UsagerAccordeon';

const Usagers = (props) => {
 const { token, notifier } = props;
 const [appareils, setAppareils] = React.useState([]);
 const [usagers, setUsagers] = React.useState([]);

 const componentStyle = {
  style: {
   background: '0971f1',
  },
  sx: { padding: 1, marginBottom: 0.5, zIndex: 1 },
 };

 const getUsersRequest = axios.get('http://localhost:3001/usagers');

 const addUsager = () => {
  const f = async () => {
   try {
    const getUsersRequest = await axios({
     method: 'post',
     url: 'http://localhost:3001/usagers',
     data: { prenom: 'Test', nom: 'Test' },
    });
   } catch (e) {
    console.log('Failed to connect ' + e);
   }
  };
  f();
 };

 React.useEffect(() => {
  notifier.asyncBlock(getUsersRequest, (resp) => {
   setUsagers(resp.data);
  });
 }, []);

 return (
  <React.Fragment>
   <Box sx={componentStyle.sx} position='fixed'>
    <Button
     variant='contained'
     size='small'
     onClick={() => {
      addUsager();
     }}>
     Ajouter
    </Button>
   </Box>
   <Box sx={{ marginTop: 8 }}>
    {usagers.map((usager, usagerKey) => (
     <UsagerAccordeon usager={usager} key={usagerKey} />
    ))}
   </Box>
  </React.Fragment>
 );
};

export default Usagers;
