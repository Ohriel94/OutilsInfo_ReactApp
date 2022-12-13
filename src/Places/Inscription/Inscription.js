import * as React from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

const Inscription = () => {
 const navigate = useNavigate();

 const handleSubmit = async (event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const f = async () => {
   try {
    const connexionRequest = await axios({
     method: 'post',
     url: 'http://localhost:3001/inscription',
     data: {
      prenom: data.get('prenom'),
      nom: data.get('nom'),
      email: data.get('email'),
      password: data.get('password'),
     },
    }).then(navigate('login'));
   } catch (e) {
    console.log(e);
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
     Inscription
    </Typography>
    <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
     <TextField margin='normal' required fullWidth name='prenom' label='Prenom' type='prenom' id='prenom' />
     <TextField margin='normal' required fullWidth id='nom' label='Nom' name='nom' type='nom' />
     <TextField margin='normal' required fullWidth id='email' label='Email' name='email' type='email' />
     <TextField
      margin='normal'
      required
      fullWidth
      id='password'
      label='Password'
      name='password'
      type='password'
     />
     <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
      Submit
     </Button>
     <Button fullWidth variant='contained' sx={{ mt: 3, mb: 2 }} onClick={() => navigate('/connexion')}>
      Already have an account ? Sign In !
     </Button>
    </Box>
   </Box>
  </Container>
 );
};

export default Inscription;
