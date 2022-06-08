import * as React from "react";
import { Routes, Route } from "react-router-dom";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import axios from "axios";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import UsagerAccordeon from "../../Components/UsagerAccordeon";
import { NoMeetingRoomTwoTone } from "@mui/icons-material";

const Usagers = (props) => {
  const [historique, setHistorique] = React.useState([]);
  const { token, niveau, setNiveau } = props;

  const paperTheme = {
    color: "success",
    sx: {
      padding: "2vh",
      fontSize: 18,
    },
    style: {
      width: "auto",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
    },
    variant: "contained",
  };

  React.useEffect(() => {
    getHistorique();
  }, []);

  const getHistorique = () => {
    const f = async () => {
      try {
        const getHistoriqueRequest = await axios({
          method: "get",
          url: "http://localhost:3001/historique",
        });
        setHistorique(getHistoriqueRequest.data);
      } catch (e) {
        console.log("Failed to connect " + e);
      }
    };
    f();
  };

  const BGCouleurListe = (etat) => {
    let couleur = "";
    if (etat === "affectation") couleur = "#67b56f";
    else couleur = "#b55353";
    return couleur;
  };

  return (
    <React.Fragment>
      <Grid
        container
        style={{
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          flexDirection: "column",
          flexDirection: "row",
        }}
      >
        {historique.map((historique, historiqueKey) =>
          historique.entrees.map((entreeHistorique, entreeHistoriqueKey) => (
            <Paper
              key={entreeHistoriqueKey}
              elevation={6}
              sx={{
                padding: "2vh",
                margin: "0.3vh",
                backgroundColor: BGCouleurListe(entreeHistorique.type),
              }}
              style={paperTheme.style}
            >
              <Typography variant={"subtitle2"}>
                {entreeHistorique.type}
              </Typography>
              <Typography variant={"h5"}>{entreeHistorique.time}</Typography>
            </Paper>
          ))
        )}
      </Grid>
    </React.Fragment>
  );
};

export default Usagers;
