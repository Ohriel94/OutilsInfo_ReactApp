import React, { useState, Fragment } from 'react';
import CSS from './App.css';
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
   <Routes>
    <Route
     path='/*'
     element={
      token ? <MainPage token={token} admin={admin} /> : <Connexion setToken={setToken} setAdmin={setAdmin} />
     }
    />
    <Route path='/connexion' element={<Connexion setToken={setToken} setAdmin={setAdmin} />} />
    <Route path='/inscription' element={<Inscription />} />
    <Route path='/gestionOrdinateurs' element={<EcranOrdinateurs />} token={token} />
   </Routes>
  </Fragment>
 );
};

export default App;
