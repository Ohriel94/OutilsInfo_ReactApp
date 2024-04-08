import Config from '../../config.json';
import Axios from 'axios';
import * as React from 'react';
import AWN from 'awesome-notifications';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { styled, ThemeProvider, createTheme } from '@mui/material/styles';

import EcranOrdi from './Gestion/Ordinateurs/EcranOrdi';
import CreerOrdi from './Gestion/Ordinateurs/CreerOrdi';
import EditerOrdi from './Gestion/Ordinateurs/EditerOrdi';

import EcranUsagers from './Gestion/Usagers/EcranUsagers';
import EcranHistorique from './Journaux/EcranHistorique';
import EcranAffectations from './Affectations/EcranAffectations';

import EcranAdmin from './Gestion/Administrateurs/EcranAdmin';
import CreerAdmin from './Gestion/Administrateurs/CreerAdmin';
import EditerAdmin from './Gestion/Administrateurs/EditerAdmin';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';

import AddCircleIcon from '@mui/icons-material/AddCircle';
import BadgeIcon from '@mui/icons-material/Badge';
import DevicesIcon from '@mui/icons-material/Devices';
import GroupsIcon from '@mui/icons-material/Groups';
import HistoryIcon from '@mui/icons-material/History';
import HomeIcon from '@mui/icons-material/Home';

import ArrowRight from '@mui/icons-material/ArrowRight';
import EditerOrdinateur from './Gestion/Ordinateurs/EditerOrdi';
import IconButton from '@mui/material/IconButton';
import Settings from '@mui/icons-material/Settings';
import Tooltip from '@mui/material/Tooltip';

const drawerWidth = 250;
const drawerZIndex = 0;

const MainPage = (props) => {
	const token = props.token;
	const admin = props.admin;

	const [selectedIndex, setSelectedIndex] = React.useState(0);

	let globalOptions = { icons: { enabled: false } };
	let nextCallOptions = {};

	let notifier = new AWN(globalOptions);

	const navigate = useNavigate();

	//  Axios.interceptors.request.use(
	//   (config) => {
	//    const { origin } = new URL(Config.url);
	//    const allowedOrigins = [Config.apiUrl];
	//    const token = localStorage.getItem('token');
	//    if (allowedOrigins.includes(origin)) {
	//     config.headers.authorization = `Bearer ${token}`;
	//    }
	//    return config;
	//   },
	//   (error) => {
	//    return Promise.reject(error);
	//   }
	//  );

	const deconnexion = async () => {
		await Axios({
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
				navigate('gestion/ordinateurs');
				break;
			case 2:
				navigate('gestion/usagers');
				break;
			case 3:
				navigate('gestion/administrateurs');
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
				position="fixed"
				color={'primary'}
				sx={{
					zIndex: drawerZIndex + 1,
				}}>
				<Toolbar>
					<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
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
				variant="permanent"
				anchor="left">
				<Toolbar />
				<Divider />
				<List>
					<ListItem component="div" disablePadding>
						<ListItemButton onClick={() => navigate('/')}>
							<ListItemIcon>
								<HomeIcon color="primary" />
							</ListItemIcon>
							<ListItemText
								primary="Menu principal"
								primaryTypographyProps={{
									color: 'primary',
									fontWeight: 'medium',
									variant: 'h6',
								}}
							/>
						</ListItemButton>
						<Tooltip title="Paramètres">
							<IconButton
								size="large"
								sx={{
									'& svg': {
										color: 'rgba(255,255,255,0.8)',
										transition: '0.2s',
										transform: 'translateX(0) rotate(0)',
									},
									'&:hover, &:focus': {
										bgcolor: 'unset',
										'& svg:first-of-type': {
											transform: 'translateX(-4px) rotate(-20deg)',
										},
										'& svg:last-of-type': {
											right: 0,
											opacity: 1,
										},
									},
									'&:after': {
										content: '""',
										position: 'absolute',
										height: '80%',
										display: 'block',
										left: 0,
										width: '1px',
										bgcolor: 'divider',
									},
								}}>
								<Settings />
								<ArrowRight
									sx={{ position: 'absolute', right: 4, opacity: 0 }}
								/>
							</IconButton>
						</Tooltip>
					</ListItem>
					<Divider>
						<ListItemText
							primaryTypographyProps={{
								color: 'primary',
								fontWeight: 'medium',
								variant: 'body2',
							}}>
							Gestion
						</ListItemText>
					</Divider>
					<ListItemButton
						key={'EcranOrdi'}
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
					<Divider>
						<ListItemText
							primaryTypographyProps={{
								color: 'primary',
								fontWeight: 'medium',
								variant: 'body2',
							}}>
							Affectations
						</ListItemText>
					</Divider>
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
					<Divider>
						<ListItemText
							primaryTypographyProps={{
								color: 'primary',
								fontWeight: 'medium',
								variant: 'body2',
							}}>
							Journaux
						</ListItemText>
					</Divider>
					<ListItemButton
						key={'EcranHistorique'}
						selected={selectedIndex === 5}
						onClick={(event) => handleListItemClick(event, 5)}>
						<ListItemIcon>
							<HistoryIcon />
						</ListItemIcon>
						<ListItemText primary={'Afficher historique'} />
					</ListItemButton>
					<br />
					<Divider />
					<br />
					<ListItem component="div" disablePadding>
						<ListItemButton sx={{ textAlign: 'center' }}>
							<ListItemText
								primary="DÉCONNEXION"
								onClick={deconnexion}
								primaryTypographyProps={{
									color: 'error',
									fontWeight: 'medium',
									variant: 'body2',
								}}
							/>
						</ListItemButton>
					</ListItem>
				</List>
			</Drawer>
			<Box
				component="main"
				sx={{ marginY: 0.5, marginLeft: 7, marginRight: 0.5 }}>
				<Routes>
					<Route
						path="/gestion/ordinateurs"
						element={<EcranOrdi notifier={notifier} token={token} />}
					/>
					<Route
						path="/gestion/ordinateurs/ajouter"
						element={<CreerOrdi notifier={notifier} token={token} />}
					/>
					<Route
						path="/gestion/usagers"
						element={<EcranUsagers notifier={notifier} token={token} />}
					/>
					<Route
						path="/gestion/administrateurs"
						element={<EcranAdmin notifier={notifier} token={token} />}
					/>
					<Route
						path="/gestion/administrateurs/ajouter"
						element={<CreerAdmin notifier={notifier} token={token} />}
					/>
					<Route
						path="/historique"
						element={
							<EcranHistorique notifier={notifier} token={token} />
						}
					/>
					<Route
						path="/affectation"
						element={
							<EcranAffectations notifier={notifier} token={token} />
						}
					/>
				</Routes>
			</Box>
		</Box>
	);
};

export default MainPage;
