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

const AppareilAccordeon = (props) => {
  const { appareil } = props;
  return (
    <Accordion>
      <AccordionSummary
        sx={{ backgroundColor: BGCouleurListe(appareil.etatDisponible) }}
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography variant="h5">
          {appareil.serialNumber +
            " - " +
            appareil.marque +
            " " +
            appareil.modele}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container>
          <Grid item xs={3} textAlign={"center"} padding={1} width="150vh">
            <Typography variant="h6">Spécifications</Typography>
            <Typography variant="subtitle2">{appareil.processeur}</Typography>
            <Typography variant="subtitle2">{appareil.systeme}</Typography>
            <Typography variant="subtitle2">{appareil.memoire} Go</Typography>
            <Typography variant="subtitle2">{appareil.disque} Go</Typography>
            <Typography variant="subtitle2">
              {appareil.dateAcquisition}
            </Typography>
          </Grid>
          <Grid item xs={9} padding={1}>
            <Typography variant="h6" textAlign={"center"}>
              Notes
            </Typography>
            <Typography variant="subtitle2">
              blablalbalbalblbablablalbalbalblbablablalbalbalblba
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
                <Grid item xs={4} padding={1}>
                  <Typography variant="h5">Assigner à :</Typography>
                </Grid>
                <Grid container padding={1} alignItems={"center"} width="100%">
                  <Grid item xs={2}>
                    <Typography variant="h6">Detenteur 1</Typography>
                  </Grid>
                  <Grid item xs={2} textAlign={"right"}>
                    <Typography variant="subtitle2">Début du prêt :</Typography>
                    <Typography variant="subtitle2">Fin du prêt :</Typography>
                  </Grid>
                  <Grid item xs={8} textAlign={"center"}>
                    <Typography variant="subtitle2">00/00/00</Typography>
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

export default AppareilAccordeon;
