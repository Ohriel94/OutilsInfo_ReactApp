import * as React from 'react';
import Box from '@mui/material/Box';
import Axios from 'axios';
import Button from '@mui/material/Button';
import UsagerAccordeon from '../../../../Components/UsagerAccordeon';

const Usagers = (props) => {
 const [appareils, setAppareils] = React.useState([]);
 const [usagers, setUsagers] = React.useState([]);
 const { token, niveau, setNiveau } = props;

 React.useEffect(() => {
  getUsers();
 }, []);

 const getUsers = () => {
  const f = async () => {
   try {
    const getUsersRequest = await Axios({
     method: 'get',
     url: 'http://localhost:3001/usagers',
    });
    setUsagers(getUsersRequest.data);
   } catch (e) {
    console.log('Failed to connect ' + e);
   }
  };
  f();
 };

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
  <React.Fragment>
   <Box>
    <Button
     variant='contained'
     size='small'
     onClick={() => {
      addUsager();
     }}>
     Ajouter Usager
    </Button>
    {usagers.map((usager, usagerKey) => (
     <UsagerAccordeon usager={usager} key={usagerKey} />
    ))}
   </Box>
  </React.Fragment>
 );
};

export default Usagers;
