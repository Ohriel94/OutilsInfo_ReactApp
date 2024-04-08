import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Axios from 'axios';

const Connexion = (props) => {
 const navigate = useNavigate();
 const AuthContext = React.createContext();

 const { setToken, setAdmin } = props;

 const handleSubmit = async (event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  console.log(data.get('email'), data.get('password'));
  const f = async () => {
   try {
    await Axios({
     method: 'post',
     url: 'http://localhost:3001/connexion',
     data: {
      email: data.get('email'),
      password: data.get('password'),
     },
    }).then((response) => {
     setToken(response.data.token);
     setAdmin(response.data.userInfo);
     navigate('/mainpage');
    });

    // const connexionRequest = await Axios.get('http://localhost:3001/connexion', {
    //  data: {
    //   email: data.get('email'),
    //   password: data.get('password'),
    //  },
    // });
   } catch (e) {
    console.log('Failed to connect ' + e);
   }
  };
  f();
 };

 return (
  <Container component='main' maxWidth='xs'>
   <Box
    sx={{
     marginTop: 8,
     display: 'flex',
     flexDirection: 'column',
     alignItems: 'center',
    }}>
    <Typography component='h1' variant='h5'>
     Connexion
    </Typography>
    <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
     <TextField
      margin='normal'
      required
      fullWidth
      id='email'
      label='Email'
      name='email'
      autoComplete='email'
      autoFocus
     />
     <TextField
      margin='normal'
      required
      fullWidth
      name='password'
      label='Password'
      type='password'
      id='password'
      autoComplete='current-password'
     />
     <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
      Connexion
     </Button>
     <Button fullWidth variant='contained' sx={{ mt: 3, mb: 2 }} onClick={() => navigate('/inscription')}>
      Dont't have an account ? Sign Up !
     </Button>
    </Box>
   </Box>
  </Container>
 );
};

export default Connexion;
