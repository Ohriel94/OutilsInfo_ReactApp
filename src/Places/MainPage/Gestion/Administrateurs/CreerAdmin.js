import * as React from 'react';
import axios from 'axios';
import AWN from 'awesome-notifications';
import { useNavigate } from 'react-router-dom';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import Theme from '../../../../Ressources/Theme';
import { ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import Switch from '@mui/material/Switch';

const customStyles = {
 content: {
  top: '50%',
  left: '50%',
  right: 'auto',
  bottom: 'auto',
  marginRight: '-50%',
  transform: 'translate(-50%, -50%)',
 },
};

const componentStyle = {
 style: {
  background: '0971f1',
 },
 sx: { padding: 1, marginBottom: 0.5, zIndex: 1 },
};

const CreerAdmin = (props) => {
 const { notifier } = props;
 let subtitle;
 const [modalIsOpen, setIsOpen] = React.useState(false);

 const navigate = useNavigate();

 const label = { inputProps: { 'aria-label': 'Switch' } };

 let administrateur = {
  prenom: '',
  nom: '',
  email: '',
  password: '',
  flags: {
   actif: true,
   admin: false,
  },
 };

 const handleSubmit = async (event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const f = async () => {
   try {
    const inscrireAdministrateurRequest = await axios({
     method: 'post',
     url: 'http://localhost:3001/creerAdmin',
     data: {
      prenom: data.get('prenom'),
      nom: data.get('nom'),
      email: data.get('email'),
      motDePasse: data.get('password'),
      flags: administrateur.flags,
     },
    });
   } catch (e) {
    console.log('Failed to connect ' + e);
   }
  };
  f();
 };

 React.useEffect(() => {
  administrateur = {
   prenom: '',
   nom: '',
   email: '',
   password: '',
   flags: {
    actif: true,
    admin: false,
   },
  };
 }, []);

 return (
  <React.Fragment>
   <Box sx={componentStyle.sx} position='fixed' component='form' onSubmit={handleSubmit} noValidate>
    <Grid container style={{ flexDirection: 'column' }} sx={{ my: '5vh' }}>
     <Typography variant='h4'>Créer un administrateur</Typography>
     <br />
     <Typography variant='h6'>Informations génerales</Typography>
     <Grid container style={{ flexDirection: 'row' }}>
      <Grid item xs={6}>
       <TextField margin='normal' fullWidth required label='Prenom' name='prenom' />
      </Grid>
      <Grid item xs={6}>
       <TextField margin='normal' fullWidth required label='Nom' name='nom' />
      </Grid>
      <Typography variant='h6'>Identifications</Typography>
      <Grid container style={{ flexDirection: 'row' }}>
       <Grid item xs={6}>
        <TextField margin='normal' fullWidth required label='Courriel' name='email' />
       </Grid>
       <Grid item xs={6}>
        <TextField margin='normal' fullWidth required label='Password' name='password' type='password' />
       </Grid>
       <br />
       <Typography variant='h6'>Flags</Typography>
       <Grid container item xs={12}>
        <Grid item xs={4} md={2}>
         <Typography variant='caption' align='center'>
          Actif
         </Typography>
         <Switch
          {...label}
          defaultChecked={administrateur.flags.actif}
          onChange={(event) => (administrateur.flags.actif = event.target.checked)}
         />
        </Grid>
        <Grid item xs={4} md={2}>
         <Typography variant='caption' align='center'>
          Admin
         </Typography>
         <Switch
          {...label}
          defaultChecked={administrateur.flags.admin}
          onChange={(event) => (administrateur.flags.admin = event.target.checked)}
         />
        </Grid>
       </Grid>
      </Grid>
      <Grid container>
       <Button variant='contained' color='success' type='submit' size='small'>
        Soumettre
       </Button>
       <Button
        variant='contained'
        color='error'
        size='small'
        onClick={() => navigate('/gestion/administrateurs')}>
        Quitter
       </Button>
      </Grid>
     </Grid>
    </Grid>
   </Box>
  </React.Fragment>
 );
};

export default CreerAdmin;
