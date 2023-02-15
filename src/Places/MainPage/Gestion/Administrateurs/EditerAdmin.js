import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import Modal from 'react-modal';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
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
 box: {
  border: 'gray solid 1px',
  justifyContent: 'center',
  textAlign: 'center',
  padding: '1vh',
 },
};

const EditerAdministrateur = (props) => {
 const { administrateur, notifier } = props;
 const label = { inputProps: { 'aria-label': 'Switch demo' } };
 let subtitle = { style: { color: 'ffffff' } };
 const [modalIsOpen, setIsOpen] = React.useState(false);

 const [newAdminInfo, setNewAdminInfo] = React.useState({
  prenom: '',
  nom: '',
  username: '',
  flags: { actif: false, admin: false },
 });

 const navigate = useNavigate();

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

 const handleOnChange = (event) => {
  console.log('handleOnChange : ', event);
  let data = { ...newAdminInfo };
  switch (event.target.id) {
   case 'Prenom':
    data.prenom = event.target.value;
    break;
   case 'Nom':
    data.nom = event.target.value;
    break;
   case 'Username':
    data.username = event.target.value;
    break;
   case 'swActif':
    data.status.actif = event.target.value;
    break;
   case 'swAdmin':
    data.status.admin = event.target.value;
    break;
  }
  setNewAdminInfo(data);
 };

 const deleteAdmin = async (id) => {
  console.log(id);
  const deleteRequest = await Axios({
   method: 'post',
   url: 'http://localhost:3001/administrateur/supprimer',
   params: { id: id },
  });
 };

 const handleSubmit = () => {
  const f = async () => {
   try {
    const postEditerAdminRequest = await Axios({
     method: 'post',
     url: 'http://localhost:3001/administrateurs/editerAdmin',
     data: { newAdminInfo },
    });
    console.log(postEditerAdminRequest.data);
   } catch (e) {
    console.log('Failed to connect ' + e);
   }
  };
  f();
 };

 return (
  <Grid>
   <IconButton variant='outlined' color='primary' size='small' onClick={openModal}>
    <EditIcon />
   </IconButton>
   <Modal
    isOpen={modalIsOpen}
    onAfterOpen={afterOpenModal}
    onRequestClose={closeModal}
    ariaHideApp={false}
    style={customStyles}
    contentLabel='Example Modal'>
    <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }} style={customStyles.style}>
     <Grid container style={{ flexDirection: 'column' }} sx={{ width: '80vh', minWidth: '40vh', my: '5vh' }}>
      <Grid container style={{ flexDirection: 'row' }}>
       <Grid item xs={10}>
        <Typography variant='h6'>Mode édition</Typography>
       </Grid>
       <Grid item xs={2}>
        <IconButton
         color='error'
         onClick={() => {
          deleteAdmin(administrateur._id);
          closeModal();
          navigate('/gestion/administrateurs');
         }}>
         <DeleteForeverIcon />
        </IconButton>
       </Grid>
      </Grid>
      <br />
      <Grid container style={customStyles.box}>
       <Typography variant='body1' sx={customStyles.margin}>
        Informations génerales
       </Typography>
       <br />
       <Grid container style={{ flexDirection: 'row' }}>
        <Grid item xs={4} style={{ padding: '1vh' }}>
         <TextField
          InputLabelProps={{ shrink: true }}
          margin='normal'
          fullWidth
          required
          disabled
          label='Username'
          name='Username'
          id='Username'
          defaultValue={administrateur.username}
          onChange={handleOnChange}
         />
        </Grid>
        <Grid item xs={4} style={{ padding: '1vh' }}>
         <TextField
          InputLabelProps={{ shrink: true }}
          margin='normal'
          fullWidth
          required
          label='Prenom'
          name='Prenom'
          id='Prenom'
          defaultValue={administrateur.prenom}
          onChange={handleOnChange}
         />
        </Grid>
        <Grid item xs={4} style={{ padding: '1vh' }}>
         <TextField
          InputLabelProps={{ shrink: true }}
          margin='normal'
          fullWidth
          required
          label='Nom'
          name='Nom'
          id='Nom'
          defaultValue={administrateur.nom}
          onChange={handleOnChange}
         />
        </Grid>
       </Grid>
      </Grid>
      <br />
      <Grid container style={customStyles.box}>
       <Typography variant='body1' sx={customStyles.margin}>
        Status
       </Typography>
       <br />
       {administrateur.flags !== undefined ? (
        <Grid container>
         <Grid item xs={4} md={2}>
          <Typography variant='caption' align='center'>
           Actif
          </Typography>
          <Switch
           {...label}
           id='swActif'
           defaultChecked={administrateur.flags.actif}
           onChange={handleOnChange}
          />
         </Grid>
         <Grid item xs={4} md={2}>
          <Typography variant='caption' align='center'>
           Admin
          </Typography>
          <Switch
           {...label}
           id='swAdmin'
           defaultChecked={administrateur.flags.admin}
           onChange={handleOnChange}
          />
         </Grid>
        </Grid>
       ) : (
        <br />
       )}
       <Grid container>
        <Grid item xs={6} style={customStyles.style} sx={customStyles.margin}>
         <Button variant='contained' color='success' size='small' type='submit' onClick={handleSubmit}>
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
  </Grid>
 );
};

export default EditerAdministrateur;
