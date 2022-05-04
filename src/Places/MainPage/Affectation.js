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

const Affectation = (props) => {
  const [ordinateurs, setOrdinateurs] = useState([]);
  const [usagers, setUsagers] = useState([]);
  const [usagerChoisi, setUsagerChoisi] = useState([]);
  const [refreshState, setRefreshState] = useState(false);

  const getUsers = () => {
    const f = async () => {
      try {
        const getUsersRequest = await Axios({
          method: "get",
          url: "http://localhost:3001/usagers",
        });
        getUsersRequest.data.map((usager) => {
          usager.label = usager.prenom + " " + usager.nom;
        });
        setUsagers(getUsersRequest.data);
      } catch (e) {
        console.log("Failed to connect " + e);
      }
    };
    f();
  };

  const getOrdinateurs = () => {
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
  };

  const triggerRefresh = () => {
    refreshState === false ? setRefreshState(true) : setRefreshState(false);
  };

  React.useEffect(() => {
    getUsers();
    getOrdinateurs();
    console.log(refreshState);
    setRefreshState(false);
    console.log(refreshState);
  }, [refreshState]);

  // const listerNomsUsagers = () => {
  //   let listeNoms = [];
  //   usagers.map((usager) => {
  //     listeNoms.push(usager.nom + " " + usager.prenom);
  //   });
  //   return listeNoms;
  // };

  return (
    <React.Fragment>
      <Box
        sx={{
          padding: "10px",
          heigth: "400px",
          margin: "10px",
          marginTop: "100px",
          width: window.innerWidth * 0.7,
        }}
      >
        <Grid container spacing={2} display="flex" alignItems="center">
          <Grid item xs={12}>
            <Autocomplete
              blurOnSelect
              disableClearable
              onChange={(event, value) => {
                setUsagerChoisi(value);
                triggerRefresh();
              }}
              id="choixUsager"
              options={usagers}
              getOptionLabel={(option) => option.label}
              isOptionEqualToValue={(option, value) => option._id === value._id}
              width={300}
              renderInput={(params) => (
                <TextField {...params} label="Choisissez un usager" />
              )}
            />
          </Grid>
        </Grid>
        {refreshState === false ? (
          <DragAndDrop
            usagerChoisi={usagerChoisi}
            ordinateurs={ordinateurs}
            refreshState={refreshState}
          />
        ) : (
          <br />
        )}
      </Box>
    </React.Fragment>
  );
};

export default Affectation;
