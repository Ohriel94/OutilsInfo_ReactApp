import * as React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Axios from 'axios';

const Toolbar = (props) => {
 const addUsager = () => {
  const f = async () => {
   try {
    const getUsersRequest = await Axios({
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
 return (
  <Box
   sx={{
    margin: '10px',
    marginTop: '100px',
    width: '100%',
   }}
  >
   <Button
    onClick={() => {
     addUsager();
    }}
   >
    Ajouter Usager
   </Button>
  </Box>
 );
};

export default Toolbar;
