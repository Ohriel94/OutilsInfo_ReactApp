import React, { useState, Fragment } from "react";
import CSS from "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import MainPage from "./Places/MainPage/MainPage";
import Usagers from "./Places/MainPage/Usagers";

const App = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [token, setToken] = useState("");
  const [adventurer, setAdventurer] = useState({});

  return (
    <Fragment>
      <Routes>
        <Route path="/*" element={<MainPage />}></Route>
        <Route path="/usagers" element={<Usagers />}></Route>
      </Routes>
    </Fragment>
  );
};

export default App;
