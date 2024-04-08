import * as React from 'react';
import Axios from 'axios';
import AWN from 'awesome-notifications';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import OrdinateurAccordeon from '../../../../Components/Ordinateurs/OrdinateurAccordeon';

const EcranOrdinateurs = (props) => {
 const navigate = useNavigate();
 const [ordinateurs, setOrdinateurs] = React.useState([]);
 const { token, notifier } = props;

<<<<<<< HEAD
	const componentStyle = {
		style: {
			background: '#0971f1',
		},
		sx: { padding: 1, marginBottom: 0.5, zIndex: 1 },
	};
=======
 const componentStyle = {
  style: {
   background: '0971f1',
  },
  sx: { padding: 1, marginBottom: 0.5, zIndex: 1 },
 };
>>>>>>> parent of 4f9fd83 (update)

 const getOrdinateursRequest = Axios.get('http://localhost:3001/ordinateurs');

 React.useEffect(() => {
  notifier.asyncBlock(getOrdinateursRequest, (resp) => {
   setOrdinateurs(resp.data);
  });
 }, []);

<<<<<<< HEAD
	return (
		<React.Fragment>
			<Box sx={componentStyle.sx}>
				<Button
					onClick={() => navigate('/gestion/ordinateurs/ajouter')}
					variant="contained"
					color="primary"
					size="small">
					Ajouter
				</Button>
			</Box>
			<Box sx={{ marginTop: 2 }}>
				{ordinateurs.map((ordinateur, ordinateurKey) => (
					<OrdinateurAccordeon
						ordinateur={ordinateur}
						key={ordinateurKey}
						notifier={notifier}
					/>
				))}
			</Box>
		</React.Fragment>
	);
=======
 return (
  <React.Fragment>
   <Box sx={componentStyle.sx}>
    <Button
     onClick={() => navigate('/gestion/ordinateurs/ajouter')}
     variant='contained'
     color='primary'
     size='small'>
     Ajouter
    </Button>
   </Box>
   <Box sx={{ marginTop: 2 }}>
    {ordinateurs.map((ordinateur, ordinateurKey) => (
     <OrdinateurAccordeon ordinateur={ordinateur} key={ordinateurKey} notifier={notifier} />
    ))}
   </Box>
  </React.Fragment>
 );
>>>>>>> parent of 4f9fd83 (update)
};

export default EcranOrdinateurs;
