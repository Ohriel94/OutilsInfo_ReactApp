import * as React from 'react';
import Modal from 'react-modal';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
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
 style: {
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
 },
 padding: (0, 2),
 border: 'lightgray solid 1px',
 margin: { mt: '3vh' },
};

const EditerAdministrateur = (props) => {
 const { administrateur, handleSubmit, notifier } = props;
 let subtitle = { style: { color: 'ffffff' } };
 const [modalIsOpen, setIsOpen] = React.useState(false);

 const label = { inputProps: { 'aria-label': 'Switch demo' } };

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
    ariaHideApp={false}
    style={customStyles}
    contentLabel='Example Modal'
   >
    <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
     <Grid container style={{ flexDirection: 'column' }} sx={{ width: '100vh', my: '5vh' }}>
      <Typography variant='h6'>Mode édition</Typography>
      <br />
      <Typography variant='body1' sx={customStyles.margin}>
       Informations génerales
      </Typography>
      <Grid container style={{ flexDirection: 'row' }}>
       <Grid item xs={4}>
        <TextField
         InputLabelProps={{ shrink: true }}
         margin='normal'
         fullWidth
         required
         label='Username'
         name='Username'
         id='Username'
         defaultValue={administrateur.username}
        />
       </Grid>
       <Grid item xs={4}>
        <TextField
         InputLabelProps={{ shrink: true }}
         margin='normal'
         fullWidth
         required
         label='Prenom'
         name='Prenom'
         id='Prenom'
         defaultValue={administrateur.prenom}
        />
       </Grid>
       <Grid item xs={4}>
        <TextField
         InputLabelProps={{ shrink: true }}
         margin='normal'
         fullWidth
         required
         label='Nom'
         name='Nom'
         id='Nom'
         defaultValue={administrateur.nom}
        />
       </Grid>
       <Typography variant='body1' sx={customStyles.margin}>
        Status
       </Typography>
       <Grid container>
        <Grid item xs={2}>
         <Typography variant='caption' align='center' fullwidth='true'>
          Actif
         </Typography>
         <Switch {...label} defaultChecked={true} />
        </Grid>
        <Grid item xs={2}>
         <Typography variant='caption' align='center' fullwidth='true'>
          Admin
         </Typography>
         <Switch {...label} defaultChecked={true} />
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
          close
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

export default EditerAdministrateur;
