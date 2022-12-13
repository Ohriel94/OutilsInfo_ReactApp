import axios from 'axios';
import * as React from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import EcranOrdinateurs from './Gestion/Ordinateurs/EcranOrdinateurs';
import CreerOrdinateur from './Gestion/Ordinateurs/CreerOrdinateur';
import EcranUsagers from './Gestion/EcranUsagers';
import EcranHistorique from './Gestion/EcranHistorique';
import EcranAffectations from './Gestion/EcranAffectations';
import EcranAdmin from './Gestion/EcranAdmin';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';

import AddCircleIcon from '@mui/icons-material/AddCircle';
import HistoryIcon from '@mui/icons-material/History';
import DevicesIcon from '@mui/icons-material/Devices';
import GroupsIcon from '@mui/icons-material/Groups';
import BadgeIcon from '@mui/icons-material/Badge';
import EditerOrdinateur from './Gestion/Ordinateurs/EditerOrdinateur';

const drawerWidth = 250;
const drawerZIndex = 0;

const MainPage = (props) => {
 const token = props.token;
 const admin = props.admin;
 const [selectedIndex, setSelectedIndex] = React.useState(0);

 const navigate = useNavigate();

 const deconnexion = async () => {
  await axios({
   method: 'post',
   url: 'http://localhost:3001/deconnexion',
   headers: {
    authorization: 'BEARER ' + token,
   },
  }).then(navigate('/connexion'));
 };

 const handleListItemClick = (event, index) => {
  console.log('handleListItemClick : ', index);
  setSelectedIndex(index);
  switch (index) {
   case 1:
    navigate('appareils');
    break;
   case 2:
    navigate('usagers');
    break;
   case 3:
    navigate('administrateurs');
    break;
   case 4:
    navigate('affectation');
    break;
   case 5:
    navigate('historique');
    break;
   default:
    break;
  }
 };

 return (
  <Box
   sx={{
    display: 'flex',
    heigth: window.innerHeight * 0.2,
    marginTop: '70px',
    marginLeft: '-15px',
    width: window.innerWidth * 0.997,
   }}>
   <AppBar
    position='fixed'
    sx={{
     zIndex: drawerZIndex + 1,
    }}>
    <Toolbar>
     <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
      Bonjour {admin.prenom} {admin.nom}
     </Typography>
    </Toolbar>
   </AppBar>
   <Drawer
    sx={{
     zIndex: drawerZIndex,
     width: drawerWidth,
     flexShrink: 0,
    }}
    variant='permanent'
    anchor='left'>
    <Toolbar />
    <Divider />
    <List>
     <Divider>Gestion</Divider>
     <ListItemButton
      key={'EcranOrdinateurs'}
      selected={selectedIndex === 1}
      onClick={(event) => handleListItemClick(event, 1)}>
      <ListItemIcon>
       <DevicesIcon />
      </ListItemIcon>
      <ListItemText primary={'Liste des appareils'} />
     </ListItemButton>
     <ListItemButton
      key={'EcranUsager'}
      selected={selectedIndex === 2}
      onClick={(event) => handleListItemClick(event, 2)}>
      <ListItemIcon>
       <GroupsIcon />
      </ListItemIcon>
      <ListItemText primary={'Liste des usagers'} />
     </ListItemButton>
     <ListItemButton
      key={'EcranAdmin'}
      selected={selectedIndex === 3}
      onClick={(event) => handleListItemClick(event, 3)}>
      <ListItemIcon>
       <BadgeIcon />
      </ListItemIcon>
      <ListItemText primary={'Gerer les droits admins'} />
     </ListItemButton>
    </List>
    <List>
     <Divider>Affectation</Divider>
     <ListItemButton
      key={'EcranAffectation'}
      selected={selectedIndex === 4}
      onClick={(event) => handleListItemClick(event, 4)}>
      <ListItemIcon>
       <AddCircleIcon />
      </ListItemIcon>
      <ListItemText primary={'Affecter appareil'} />
     </ListItemButton>
    </List>
    <List>
     <Divider>Journaux</Divider>
     <ListItemButton
      key={'EcranHistorique'}
      selected={selectedIndex === 5}
      onClick={(event) => handleListItemClick(event, 5)}>
      <ListItemIcon>
       <HistoryIcon />
      </ListItemIcon>
      <ListItemText primary={'Afficher historique'} />
     </ListItemButton>
     <Divider />
     <ListItemButton key={'Deconnexion'} size='small' onClick={deconnexion}>
      <ListItemText primary={'Déconnexion'} />
     </ListItemButton>
    </List>
   </Drawer>
   <Box component='main' sx={{ marginY: 0.5, marginLeft: 3.5, marginRight: 0.5 }}>
    <Routes>
     <Route path='/usagers' element={<EcranUsagers />} />
     <Route path='/appareils' element={<EcranOrdinateurs />} />
     <Route path='/gestion/ordinateurs/editer?sn=*' element={<EditerOrdinateur />} />
     <Route path='/gestion/ordinateurs/ajouter/*' element={<CreerOrdinateur />} />
     <Route path='/historique' element={<EcranHistorique />} />
     <Route path='/affectation' element={<EcranAffectations />} />
     <Route path='/administrateurs' element={<EcranAdmin />} />
    </Routes>
   </Box>
  </Box>
 );
};

export default MainPage;
