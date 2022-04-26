import Axios from "axios";
import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Autocomplete from "@mui/material/Autocomplete";
import { NoMeetingRoomTwoTone } from "@mui/icons-material";
import DragAndDrop from "../../Components/DragAndDrop";
import { ToastContainer, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
      if (ordinateur.etatDisponible === true) newEtat[1].push(ordinateur);
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
      <ToastContainer
        position="top-left"
        autoClose={2000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        transition={Flip}
      />
      <Box
        sx={{
          padding: "10px",
          heigth: "400px",
          margin: "10px",
          marginTop: "100px",
        }}
      >
        <Grid container spacing={2} display="flex" alignItems="center">
          <Grid item xs={6}>
            <Autocomplete
              blurOnSelect
              disableClearable
              onChange={(event, value) => setUsagerChoisi(value)}
              id="choixUsager"
              options={usagers}
              getOptionLabel={(option) => option.prenom + " " + option.nom}
              width={300}
              renderInput={(params) => (
                <TextField {...params} label="Choisissez un usager" />
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <Button
              variant="contained"
              onClick={() => setUsagerChoisi(usagers[0])}
            >
              Rechercher
            </Button>
          </Grid>
        </Grid>
        {ordinateurs.length !== 0 ? (
          <DragAndDrop usagerChoisi={usagerChoisi} ordinateurs={ordinateurs} />
        ) : (
          <br />
        )}
      </Box>
    </React.Fragment>
  );
};

export default Affectation;
