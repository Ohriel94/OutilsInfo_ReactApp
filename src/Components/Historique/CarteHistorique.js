import * as React from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

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

  const getUsagerInfo = (idUsager) => {
    const f = async () => {
      try {
        const getUsagerInfo = await axios({
          method: "get",
          url: "http://localhost:3001/recupererUsager",
          data: { id: idUsager },
        });
        setUsagerInfos(getUsagerInfo.data);
      } catch (e) {
        console.log("Failed to connect " + e);
      }
    };
    f();
  };

  const [usagerInfos, setUsagerInfos] = React.useState({});

  React.useEffect(() => {
    // getUsagerInfo(entree.idUsager);
  }, [usagerInfos]);

  return (
    <Paper
      key={entreeKey}
      elevation={6}
      sx={{
        padding: "3vh",
        margin: "0.5vh",
        backgroundColor: BGCouleurListe(entree.type),
      }}
      style={paperTheme.style}
    >
      <Typography
        variant={"h5"}
      >{`${usagerInfos.prenom} ${usagerInfos.nom}`}</Typography>
      <hr />
      <Grid
        container
        style={{
          flexDirection: "row",
        }}
        sx={{
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Grid
          textAlign={"center"}
          sx={componentStyle.sx}
          style={{ height: "auto" }}
        >
          <Typography variant={"h5"}>{entree.time}</Typography>
        </Grid>
        <Grid>
          <Typography variant="subtitle2">XXX XXX XXX</Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default CarteHistorique;
