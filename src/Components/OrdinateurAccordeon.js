import * as React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { LocalFireDepartment } from "@mui/icons-material";

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
          <Grid item xs={5} sm={3} textAlign={"center"} sx={componentStyle.sx}>
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
            <Typography variant="h5" textAlign={"center"}>
              Notes
            </Typography>
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
              <Box>
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
              </Box>
            </AccordionDetails>
          </Accordion>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default OrdinateurAccordeon;
