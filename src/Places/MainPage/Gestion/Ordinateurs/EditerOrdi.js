import * as React from 'react';
import axios from 'axios';
import AWN from 'awesome-notifications';
import Modal from 'react-modal';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';

const customStyles = {
 content: {
  top: '50%',
  left: '50%',
  right: 'auto',
  bottom: 'auto',
  marginRight: '-50%',
  transform: 'translate(-50%, -50%)',
 },
 style: {
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  zIndex: 99,
 },
 padding: (0, 2),
 border: 'lightgray solid 1px',
 margin: { mt: '3vh' },
};

const EditerOrdinateur = (props) => {
 const { ordinateur, handleSubmit, notifier } = props;
 let subtitle = { style: { color: 'ffffff' } };
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
  <div>
   <IconButton variant='outlined' color='primary' size='small' onClick={openModal}>
    <EditIcon />
   </IconButton>
   <Modal
    isOpen={modalIsOpen}
    onAfterOpen={afterOpenModal}
    onRequestClose={closeModal}
    style={customStyles}
    contentLabel='Example Modal'>
    <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
     <Grid container style={{ flexDirection: 'column' }} sx={{ width: '100vh', my: '5vh' }}>
      <Typography variant='h4'>Mode édition</Typography>
      <br />
      <Typography variant='h6' sx={customStyles.margin}>
       Informations génerales
      </Typography>
      <Grid container style={{ flexDirection: 'row' }}>
       <Grid item xs={2}>
        <TextField
         InputLabelProps={{ shrink: true }}
         margin='normal'
         fullWidth
         required
         label='S/N'
         name='S/N'
         id='S/N'
         defaultValue={ordinateur.serialNumber}
        />
       </Grid>
       <Grid item xs={4}>
        <TextField
         InputLabelProps={{ shrink: true }}
         margin='normal'
         fullWidth
         required
         label='Marque'
         name='Marque'
         id='Marque'
         defaultValue={ordinateur.details.marque}
        />
       </Grid>
       <Grid item xs={6}>
        <TextField
         InputLabelProps={{ shrink: true }}
         margin='normal'
         fullWidth
         required
         label='Modele'
         name='Modele'
         id='Modele'
         defaultValue={ordinateur.details.modele}
        />
       </Grid>
       <Typography variant='h6' sx={customStyles.margin}>
        Spécifications
       </Typography>
       <Grid container style={{ flexDirection: 'row' }}>
        <Grid item xs={6}>
         <TextField
          InputLabelProps={{ shrink: true }}
          margin='normal'
          fullWidth
          required
          label='Processeur'
          name='Processeur'
          id='Processeur'
          defaultValue={ordinateur.details.configuration.processeur}
         />
        </Grid>
        <Grid item xs={6}>
         <TextField
          InputLabelProps={{ shrink: true }}
          margin='normal'
          fullWidth
          required
          name='Systeme'
          label='Système'
          id='Systeme'
          defaultValue={ordinateur.details.configuration.systeme}
         />
        </Grid>
        <Grid item xs={6}>
         <TextField
          InputLabelProps={{ shrink: true }}
          margin='normal'
          fullWidth
          required
          name='Memoire'
          label='Memoire'
          id='Memoire'
          defaultValue={ordinateur.details.configuration.memoire}
         />
        </Grid>
        <Grid item xs={6}>
         <TextField
          InputLabelProps={{ shrink: true }}
          margin='normal'
          fullWidth
          required
          name='Disque'
          label='Disque'
          id='Disque'
          defaultValue={ordinateur.details.configuration.disque}
         />
        </Grid>
       </Grid>
       <Grid container>
        <Typography variant='h6' sx={customStyles.margin}>
         Notes
        </Typography>
        <Grid item xs={12}>
         <TextField
          InputLabelProps={{ shrink: true }}
          margin='dense'
          fullWidth
          multiline
          required
          name='Notes'
          id='Notes'
          defaultValue={ordinateur.details.notes}
         />
        </Grid>
       </Grid>
       <Grid container>
        <Grid item xs={6} style={customStyles.style} sx={customStyles.margin}>
         <Button variant='contained' color='success' type='submit' size='small'>
          Soumettre
         </Button>
        </Grid>
        <Grid item xs={6} style={customStyles.style} sx={customStyles.margin}>
         <Button variant='contained' color='error' size='small' onClick={closeModal}>
          Quitter
         </Button>
        </Grid>
       </Grid>
      </Grid>
     </Grid>
    </Box>
   </Modal>
  </div>
 );
};

export default EditerOrdinateur;
