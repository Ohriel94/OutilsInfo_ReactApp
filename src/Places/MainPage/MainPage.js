import axios from 'axios';
import * as React from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { ToastContainer, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import EcranUsagers from './EcranUsagers';
import EcranOrdinateurs from './Ordinateurs/EcranOrdinateurs';
import EcranHistorique from './EcranHistorique';
import EcranAffectations from './EcranAffectations';
import EcranAdministrateurs from './EcranAdministrateurs';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import AddCircleIcon from '@mui/icons-material/AddCircle';
import HistoryIcon from '@mui/icons-material/History';
import DevicesIcon from '@mui/icons-material/Devices';
import GroupsIcon from '@mui/icons-material/Groups';
import BadgeIcon from '@mui/icons-material/Badge';

const drawerWidth = 250;
const drawerZIndex = 0;

const MainPage = (props) => {
 const navigate = useNavigate();
 const [administrateur, setAdministrateur] = React.useState({
  prenom: 'Adam',
  nom: 'Bernard',
 });

 const logout = () => {
  navigate('/connexion');
 };

 return (
  <Box
   sx={{
    display: 'flex',
    heigth: window.innerHeight * 0.2,
    marginTop: '70px',
    marginLeft: '-15px',
    width: window.innerWidth * 0.997,
   }}
  >
   <ToastContainer
    position='top-center'
    autoClose={2000}
    hideProgressBar={true}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    transition={Flip}
   />
   <AppBar
    position='fixed'
    sx={{
     zIndex: drawerZIndex + 1,
    }}
   >
    <Toolbar>
     <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
      Bonjour {administrateur.prenom} {administrateur.nom}
     </Typography>
     <Button color='inherit' onClick={logout}>
      Logout
     </Button>
    </Toolbar>
   </AppBar>
   <Drawer
    sx={{
     zIndex: drawerZIndex,
     width: drawerWidth,
     flexShrink: 0,
    }}
    variant='permanent'
    anchor='left'
   >
    <Toolbar />
    <Divider />
    <List>
     <ListItem button key={'EcranOrdinateurs'} onClick={() => navigate('appareils')}>
      <ListItemIcon>
       <DevicesIcon />
      </ListItemIcon>
      <ListItemText primary={'Liste des appareils'} />
     </ListItem>
     <ListItem button key={'EcranUsager'} onClick={() => navigate('usagers')}>
      <ListItemIcon>
       <GroupsIcon />
      </ListItemIcon>
      <ListItemText primary={'Liste des usagers'} />
     </ListItem>
     <ListItem button key={'EcranAffectation'} onClick={() => navigate('affectation')}>
      <ListItemIcon>
       <AddCircleIcon />
      </ListItemIcon>
      <ListItemText primary={'Affecter un appareil'} />
     </ListItem>
     <Divider />
     <ListItem button key={'EcranHistorique'} onClick={() => navigate('historique')}>
      <ListItemIcon>
       <HistoryIcon />
      </ListItemIcon>
      <ListItemText primary={'Afficher historique'} />
     </ListItem>
     <Divider />
     <ListItem button key={'EcranAdministrateurs'} onClick={() => navigate('administrateurs')}>
      <ListItemIcon>
       <BadgeIcon />
      </ListItemIcon>
      <ListItemText primary={'Gerer les droits admins'} />
     </ListItem>
    </List>
   </Drawer>
   <Box component='main' sx={{ marginY: 0, marginX: 2 }}>
    <Routes>
     <Route path='/usagers' element={<EcranUsagers />} />
     <Route path='/appareils' element={<EcranOrdinateurs />} />
     <Route path='/historique' element={<EcranHistorique />} />
     <Route path='/affectation' element={<EcranAffectations />} />
     <Route path='/administrateurs' element={<EcranAdministrateurs />} />
    </Routes>
   </Box>
  </Box>
 );
};

export default MainPage;
