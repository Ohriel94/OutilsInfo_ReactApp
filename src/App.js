import CSS from './App.css';
import AWNStyle from './awn-style.css';
import React, { useState, Fragment } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import MainPage from './Places/MainPage/MainPage';
import Inscription from './Places/Inscription/Inscription';
import Connexion from './Places/Connexion/Connexion';
import EcranOrdinateurs from './Places/MainPage/Gestion/Ordinateurs/EcranOrdinateurs';

const App = () => {
 const navigate = useNavigate();
 const [isLoggedIn, setIsLoggedIn] = useState(true);
 const [token, setToken] = useState('');
 const [admin, setAdmin] = useState({});

 return (
  <Fragment>
   <head>
    <link rel='stylesheet' href='path/to/style.css'></link>
    <script src='path/to/index.var.js'></script>
   </head>
   <Routes>
    <Route
     path='/*'
     element={
      token ? <MainPage token={token} admin={admin} /> : <Connexion setToken={setToken} setAdmin={setAdmin} />
     }
    />
    <Route path='/connexion' element={<Connexion setToken={setToken} setAdmin={setAdmin} />} />
    <Route path='/inscription' element={<Inscription />} />
   </Routes>
  </Fragment>
 );
};

export default App;
