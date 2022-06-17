import * as React from "react";
import { ThemeProvider } from "@mui/material/styles";
import Theme from "../Ressources/Theme";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";

const BGCouleurListe = (etat) => {
  let couleur = "";
  if (etat === false) couleur = "#b55353";
  else couleur = "#67b56f";
  return couleur;
};

const componentStyle = {
  style: {
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  sx: { padding: (0, 2), border: "lightgray solid 1px" },
};

const OrdinateurAccordeon = (props) => {
  const { ordinateur } = props;
  return (
    <ThemeProvider theme={Theme}>
      <Accordion>
        <AccordionSummary
          sx={{ backgroundColor: BGCouleurListe(ordinateur.etatDisponible) }}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography variant="h5">
            {`${ordinateur.serialNumber} - ${ordinateur.details.marque} ${ordinateur.details.modele}`}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container>
            <Grid
              item
              xs={5}
              sm={3}
              textAlign={"center"}
              sx={componentStyle.sx}
            >
              <Typography variant="h5">Spécifications</Typography>
              <hr />
              <Typography variant="subtitle2">
                {ordinateur.details.configuration.processeur}
              </Typography>
              <Typography variant="subtitle2">
                {ordinateur.details.configuration.systeme}
              </Typography>
              <Grid container>
                <Grid item xs={6}>
                  <Typography variant="subtitle2">
                    {ordinateur.details.configuration.disque} Go
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle2">
                    {ordinateur.details.configuration.memoire} Go
                  </Typography>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2">
                  {ordinateur.details.dateAcquisition}
                </Typography>
              </Grid>
            </Grid>
            <Grid item xs={7} sm={9} sx={componentStyle.sx}>
              <Grid container>
                <Typography variant="h5" textAlign={"center"}>
                  Notes
                </Typography>
                <IconButton
                  variant="outlined"
                  color="primary"
                  sx={{ ml: "80%" }}
                >
                  <EditTwoToneIcon />
                </IconButton>
              </Grid>
              <hr />
              <Typography variant="subtitle2">
                {ordinateur.details.notes}
              </Typography>
            </Grid>
          </Grid>
          <Box>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography variant="h5">Historique des détenteurs</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid
                  container
                  style={{
                    flexDirection: "row",
                  }}
                >
                  <Grid
                    container
                    alignItems={"center"}
                    textAlign={"center"}
                    style={{
                      flexDirection: "column",
                    }}
                  >
                    <Grid item xs={3}>
                      <Typography variant="h6">Date</Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <Typography variant="h6">Time</Typography>
                    </Grid>
                  </Grid>
                  <Grid container alignItems={"center"} textAlign={"center"}>
                    <Grid item xs={3}>
                      <Typography variant="h6">Assigner à</Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <Typography variant="h6">Début du prêt</Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <Typography variant="h6">Fin du prêt</Typography>
                    </Grid>
                  </Grid>
                  <Grid container alignItems={"center"} textAlign={"center"}>
                    <Grid item xs={3}>
                      <Typography variant="h6">Detenteur 1</Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <Typography variant="subtitle2">00/00/00</Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <Typography variant="subtitle2">99/99/99</Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
          </Box>
        </AccordionDetails>
      </Accordion>
    </ThemeProvider>
  );
};

export default OrdinateurAccordeon;
