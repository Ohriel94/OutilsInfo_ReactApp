import * as React from "react";
import axios from "axios";
import { Grid, Button, Typography, Paper } from "@mui/material";
import { InfoTwoToneIcon } from "@mui/icons-material";

const BGCouleurListe = (etat) => {
  let couleur = "";
  if (etat === "affectation") couleur = "#67b56f";
  else couleur = "#b55353";
  return couleur;
};

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

const componentStyle = {
  style: {
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  sx: { padding: (0, 2) },
};

const CarteHistorique = (props) => {
  const { entree, entreeKey } = props;

  const getInfos = (idUsager, idAppareil) => {
    const f = async () => {
      try {
        const getUsager = await axios({
          method: "get",
          url: `http://localhost:3001/usagers`,
        });
        getUsager.data.map((usr, ind) => {
          if (usr._id === idUsager) {
            setUsager(usr);
          }
        });

        const getOrdinateur = await axios({
          method: "get",
          url: "http://localhost:3001/ordinateurs",
        });
        getOrdinateur.data.map((app, ind) => {
          if (app._id === idAppareil) {
            setOrdinateur({
              serialNumber: app.serialNumber,
              nom: `${app.details.marque} ${app.details.modele}`,
              systeme: app.details.configuration.systeme,
              processeur: app.details.configuration.processeur,
              memoire: app.details.configuration.memoire,
              disque: app.details.configuration.disque,
            });
          }
        });
      } catch (e) {
        console.log("Failed to connect " + e);
      }
    };
    f();
  };

  const [usager, setUsager] = React.useState({});
  const [ordinateur, setOrdinateur] = React.useState({});

  React.useEffect(() => {
    getInfos(entree.idUsager, entree.idAppareil);
  }, []);

  return (
    <Paper
      key={entreeKey}
      elevation={6}
      sx={{
        padding: "1vh",
        margin: "0.5vh",
        backgroundColor: BGCouleurListe(entree.type),
      }}
      style={paperTheme.style}
    >
      <Typography variant={"h6"}>{`${usager.prenom} ${usager.nom}`}</Typography>
      <hr />
      <Grid
        container
        style={{
          flexDirection: "row",
        }}
        sx={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid
          textAlign={"center"}
          style={{ height: "auto", width: "9vh" }}
          xs={4}
          sx={{
            textAlign: "left",
          }}
        >
          <Typography variant={"h6"}>{entree.time}</Typography>
        </Grid>
        <Grid
          xs={8}
          sx={{
            textAlign: "right",
          }}
        >
          <Typography variant="subtitle2">
            {`${ordinateur.serialNumber} - ${ordinateur.nom}`}
          </Typography>
          <Typography variant="subtitle2">{`${ordinateur.systeme}`}</Typography>
          <Typography variant="subtitle2">{`${ordinateur.processeur}`}</Typography>
          <Grid container>
            <Grid item xs={6}>
              <Typography variant="subtitle2">
                {ordinateur.disque} Go
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle2">
                {ordinateur.memoire} Go
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default CarteHistorique;
