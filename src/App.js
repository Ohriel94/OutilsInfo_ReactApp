import React, { useState, Fragment } from 'react';
import CSS from './App.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import MainPage from './Places/MainPage/MainPage';
import Inscription from './Places/Inscription/Inscription';
import Connexion from './Places/Connexion/Connexion';

const App = () => {
 const navigate = useNavigate();
 const [isLoggedIn, setIsLoggedIn] = useState(true);
 const [token, setToken] = useState('');
 const [administrateur, setAdministrateur] = useState({});

 return (
  <Fragment>
   <Routes>
    <Route path='/*' element={token ? <MainPage token={token} /> : <Connexion token={setToken} />} />
    <Route path='/connexion' element={<Connexion token={setToken} administrateur={setAdministrateur} />} />
    <Route path='/inscription' element={<Inscription />} />
   </Routes>
  </Fragment>
 );
};

export default App;
