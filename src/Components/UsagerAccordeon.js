import * as React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const UsagerAccordeon = (props) => {
  const { usager } = props;
  if (usager.nom === "Cordova")
    usager.appareilsAffectes.map((appareil) => {
      console.log(appareil.serialNumber);
    });

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography variant="h5">{usager.prenom + " " + usager.nom}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box>
          <Typography variant="h6">Appareils assignés</Typography>
          {usager.appareilsAffectes.map((appareil) => {
            return (
              <Typography variant="sutitle2">
                {appareil.serialNumber}
              </Typography>
            );
          })}
        </Box>
        <Box>
          <Typography variant="h6">Appareils révoqué</Typography>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default UsagerAccordeon;
