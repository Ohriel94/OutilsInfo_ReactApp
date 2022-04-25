import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Axios from "axios";
import Paper from "@mui/material/Paper";
import Autocomplete from "@mui/material/Autocomplete";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import DragAndDrop from "../../Components/DragAndDrop";
import { NoMeetingRoomTwoTone } from "@mui/icons-material";

const Affectation = (props) => {
  const [ordinateurs, setOrdinateurs] = useState([]);
  const [usagers, setUsagers] = useState([]);
  const [usagerChoisi, setUsagerChoisi] = useState([]);

  const getUsers = () => {
    console.log("getUsers -----");
    const f = async () => {
      try {
        const getUsersRequest = await Axios({
          method: "get",
          url: "http://localhost:3001/usagers",
        });
        setUsagers(getUsersRequest.data);
      } catch (e) {
        console.log("Failed to connect " + e);
      }
    };
    f();
    console.log(usagers);
  };

  const getOrdinateurs = () => {
    console.log("getOrdinateurs -----");
    const g = async () => {
      try {
        const getOrdinateursRequest = await Axios({
          method: "get",
          url: "http://localhost:3001/appareils",
        });
        setOrdinateurs(getOrdinateursRequest.data[0].ordinateurs);
      } catch (e) {
        console.log("Failed to connect " + e);
      }
    };
    g();
    console.log(ordinateurs);
  };

  const creerEtatPourDND = (usagers, ordinateurs) => {
    console.log("creerEtatPourDND -----");
    var newEtat = [];
    newEtat.push([]);
    usagers.map((usager, indUsager) => {
      newEtat[0].push(usager);
    });
    newEtat.push([]);
    ordinateurs.map((ordinateur, indOrdinateur) => {
      newEtat[1].push(ordinateur);
    });
    console.log(newEtat);
    return newEtat;
  };

  React.useEffect(() => {
    getUsers();
    getOrdinateurs();
    creerEtatPourDND(usagers, ordinateurs);
  }, []);

  const listerNomsUsagers = () => {
    let listeNoms = [];
    usagers.map((usager) => {
      listeNoms.push(usager.nom + " " + usager.prenom);
    });
    return listeNoms;
  };

  return (
    <React.Fragment>
      <Box
        sx={{
          padding: "10px",
          heigth: "400px",
          margin: "10px",
          marginTop: "100px",
        }}
      >
        <Autocomplete
          blurOnSelect
          onChange={(event, value) => setUsagerChoisi(value)}
          id="choixUsager"
          options={usagers}
          getOptionLabel={(option) => option.nom + " " + option.prenom}
          sx={{ width: 300 }}
          renderInput={(params) => (
            <TextField {...params} label="Choisissez un usager" />
          )}
        />
        {ordinateurs.length !== 0 && usagers.length !== 0 ? (
          <DragAndDrop usagers={usagers} ordinateurs={ordinateurs} />
        ) : (
          <br />
        )}
      </Box>
    </React.Fragment>
  );
};

export default Affectation;
