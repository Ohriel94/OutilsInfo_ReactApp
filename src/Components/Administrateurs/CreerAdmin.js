import * as React from 'react';
import Modal from 'react-modal';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
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
  <div>
   <Button variant='outlined' color='primary' size='small' onClick={openModal}>
    <EditIcon />
   </Button>
   <Modal
    isOpen={modalIsOpen}
    onAfterOpen={afterOpenModal}
    onRequestClose={closeModal}
    style={customStyles}
    contentLabel='Example Modal'
   >
    <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
     <Grid container style={{ flexDirection: 'column' }} sx={{ width: '100vh', my: '5vh' }}>
      <Typography variant='h4'>Mode édition</Typography>
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
          type='Mémoire'
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
          type='Disque'
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
          type='Quantite'
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
   </Modal>
  </div>
 );
};

export default CreerOrdinateur;
