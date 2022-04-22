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
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography variant="h4">{usager.nom + " " + usager.prenom}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box>
          <Typography variant="h5">Appareils assignés</Typography>
        </Box>
        <hr />
        <Box>
          <Typography variant="h5">Appareils révoqué</Typography>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default UsagerAccordeon;
