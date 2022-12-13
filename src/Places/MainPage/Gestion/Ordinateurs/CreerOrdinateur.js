import * as React from 'react';
import Axios from 'axios';
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

const CreerOrdinateur = (props) => {
 const { handleSubmit, notifier } = props;
 let subtitle;
 const [modalIsOpen, setIsOpen] = React.useState(false);

 const openModal = () => {
  setIsOpen(true);
 };

 const afterOpenModal = () => {
  // references are now sync'd and can be accessed.
  subtitle.style.color = '#f00';
 };

 const closeModal = () => {
  setIsOpen(false);
 };

 return (
  <React.Fragment>
   <Box sx={componentStyle.sx} position='fixed' component='form' onSubmit={handleSubmit} noValidate>
    <Grid container style={{ flexDirection: 'column' }} sx={{ my: '5vh' }}>
     <Typography variant='h4'>Mode création</Typography>
     <br />
     <Typography variant='h6'>Informations génerales</Typography>
     <Grid container style={{ flexDirection: 'row' }}>
      <Grid item xs={2}>
       <TextField margin='normal' fullWidth required id='S/N' label='S/N' name='S/N' autoComplete='S/N' />
      </Grid>
      <Grid item xs={4}>
       <TextField
        margin='normal'
        fullWidth
        required
        id='Marque'
        label='Marque'
        name='Marque'
        autoComplete='Marque'
       />
      </Grid>
      <Grid item xs={6}>
       <TextField
        margin='normal'
        fullWidth
        required
        id='Modele'
        label='Modele'
        name='Modele'
        autoComplete='Modele'
       />
      </Grid>
      <Typography variant='h6'>Spécifications</Typography>
      <Grid container style={{ flexDirection: 'row' }}>
       <Grid item xs={6}>
        <TextField
         margin='normal'
         fullWidth
         required
         id='Processeur'
         label='Processeur'
         name='Processeur'
         autoComplete='Processeur'
        />
       </Grid>
       <Grid item xs={6}>
        <TextField
         margin='normal'
         fullWidth
         required
         name='Systeme'
         label='Système'
         type='Systeme'
         id='Systeme'
         autoComplete='Systeme'
        />
       </Grid>
       <Grid item xs={6}>
        <TextField
         margin='normal'
         fullWidth
         required
         name='Memoire'
         label='Memoire'
         type='number'
         id='Memoire'
        />
       </Grid>
       <Grid item xs={6}>
        <TextField
         margin='normal'
         fullWidth
         required
         name='Disque'
         label='Disque'
         type='number'
         id='Disque'
        />
       </Grid>
      </Grid>
      <Grid container>
       <Grid item xs={6}>
        <TextField
         margin='normal'
         fullWidth
         required
         name='Quantite'
         label='Quantité'
         type='number'
         id='Quantite'
        />
       </Grid>
      </Grid>
      <Grid container>
       <Button variant='contained' color='success' type='submit' size='small'>
        Soumettre
       </Button>
       <Button variant='contained' color='error' size='small' onClick={closeModal}>
        close
       </Button>
      </Grid>
     </Grid>
    </Grid>
   </Box>
  </React.Fragment>
 );
};

export default CreerOrdinateur;
