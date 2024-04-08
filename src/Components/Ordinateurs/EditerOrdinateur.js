import * as React from 'react';
import Axios from 'axios';
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
 const { ordinateur, notifier } = props;
 let subtitle = { style: { color: 'ffffff' } };
 const [modalIsOpen, setIsOpen] = React.useState(false);

 const handleSubmit = async (event) => {
  console.log('Submit');
  event.preventDefault();
  const data = new FormData(event.currentTarget);

  const serialNumber = data.get('serialNumber');
  const marque = data.get('marque');
  const modele = data.get('modele');
  const processeur = data.get('processeur');
  const systeme = data.get('systeme');
  const memoire = data.get('memoire');
  const disque = data.get('disque');
  const dateAcqu = data.get('dateAcquisition');
  const notes = data.get('notes');

  console.log(serialNumber, marque, modele, processeur, systeme, memoire, disque, dateAcqu, notes);

  console.log(`editerAppareil()`);

  const f = async () => {
   try {
    const editDeviceRequest = await Axios({
     method: 'post',
     url: 'http://localhost:3001/editerAppareil',
     data: {
      id: ordinateur._id,
      serialNumber: serialNumber,
      marque: marque,
      modele: modele,
      processeur: processeur,
      systeme: systeme,
      memoire: memoire,
      disque: disque,
      dateAcquisition: dateAcqu,
      notes: notes,
     },
    });
    notifier.success();
   } catch (e) {
    console.log('Failed to connect ' + e);
   }
  };
  f();
 };

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
    ariaHideApp={false}
    contentLabel='EditerOrdinateur'>
    <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
     <Grid container style={{ flexDirection: 'column' }} sx={{ width: '80vh', margin: '1vh' }}>
      <Grid container style={{ flexDirection: 'row' }}>
       <Typography variant='h4'>Mode édition</Typography>
       <Typography variant='h4'> | </Typography>
       <Typography variant='subtitle2'>{ordinateur._id}</Typography>
      </Grid>
      <br />
      <Typography variant='h6' sx={customStyles.margin}>
       Informations génerales
      </Typography>
      <Grid container style={{ flexDirection: 'row' }}>
       <Grid item xs={2}>
        <TextField
         size='small'
         InputLabelProps={{ shrink: true }}
         margin='dense'
         fullWidth
         required
         label='Serial Number'
         name='serialNumber'
         id='serialNumber'
         defaultValue={ordinateur.serialNumber}
        />
       </Grid>
       <Grid item xs={4}>
        <TextField
         size='small'
         InputLabelProps={{ shrink: true }}
         margin='dense'
         fullWidth
         required
         label='Marque'
         name='marque'
         id='marque'
         defaultValue={ordinateur.details.marque}
        />
       </Grid>
       <Grid item xs={6}>
        <TextField
         size='small'
         InputLabelProps={{ shrink: true }}
         margin='dense'
         fullWidth
         required
         label='Modele'
         name='modele'
         id='modele'
         defaultValue={ordinateur.details.modele}
        />
       </Grid>
       <Grid item xs={4}>
        <TextField
         size='small'
         InputLabelProps={{ shrink: true }}
         margin='dense'
         fullWidth
         required
         label="Date d'aquisition"
         name='dateAcquisition'
         id='dateAqui'
         type='date'
         min='2001-01-01'
         value={ordinateur.details.dateAcquisition}
        />
       </Grid>
      </Grid>
      <Grid container style={{ flexDirection: 'row' }}>
       <Typography variant='h6' sx={customStyles.margin}>
        Spécifications
       </Typography>
       <Grid container style={{ flexDirection: 'row' }}>
        <Grid item xs={6}>
         <TextField
          size='small'
          InputLabelProps={{ shrink: true }}
          margin='dense'
          fullWidth
          required
          label='Processeur'
          name='processeur'
          id='processeur'
          defaultValue={ordinateur.details.configuration.processeur}
         />
        </Grid>
        <Grid item xs={6}>
         <TextField
          size='small'
          InputLabelProps={{ shrink: true }}
          margin='dense'
          fullWidth
          required
          label='Système'
          name='systeme'
          id='systeme'
          defaultValue={ordinateur.details.configuration.systeme}
         />
        </Grid>
        <Grid item xs={6}>
         <TextField
          size='small'
          InputLabelProps={{ shrink: true }}
          margin='dense'
          fullWidth
          required
          label='Memoire'
          name='memoire'
          id='memoire'
          defaultValue={ordinateur.details.configuration.memoire}
         />
        </Grid>
        <Grid item xs={6}>
         <TextField
          size='small'
          InputLabelProps={{ shrink: true }}
          margin='dense'
          fullWidth
          required
          label='Disque'
          name='disque'
          id='disque'
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
          size='small'
          InputLabelProps={{ shrink: true }}
          margin='dense'
          fullWidth
          multiline
          required
          name='notes'
          id='notes'
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
