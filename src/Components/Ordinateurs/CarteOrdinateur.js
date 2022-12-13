import * as React from 'react';
import Axios from 'axios';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

const CarteOrdinateur = (props) => {
 const [ordinateur, setOrdinateur] = React.useState({});
 const { appareil } = props;

 const paperTheme = {
  color: 'success',
  sx: {
   padding: '2vh',
   fontSize: 18,
  },
  style: {
   width: 'auto',
   justifyContent: 'left',
   alignItems: 'left',
   textAlign: 'left',
  },
  variant: 'contained',
 };

 const recupererDetailsOrdi = (appareil) => {
  const f = async () => {
   try {
    const getOrdinateursRequest = await Axios({
     method: 'get',
     url: 'http://localhost:3001/recupererOrdinateur/' + appareil._id,
    });
    appareil = getOrdinateursRequest.data;
   } catch (e) {
    console.log('Failed to connect ' + e);
   }
  };
  f();
 };

 React.useEffect(() => {
  if (appareil !== undefined) recupererDetailsOrdi(appareil);
 }, []);

 return (
  <Paper elevation={6} sx={paperTheme.sx} key={Math.random() * 9000000}>
   <Typography>
    {appareil.serialNumber} - {appareil.details.marque} {appareil.details.modele}
   </Typography>
  </Paper>
 );
};

export default CarteOrdinateur;
