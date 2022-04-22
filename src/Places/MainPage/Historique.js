import * as React from "react";
import { Routes, Route } from "react-router-dom";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import axios from "axios";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import UsagerAccordeon from "../../Components/UsagerAccordeon";
import { NoMeetingRoomTwoTone } from "@mui/icons-material";

const Usagers = (props) => {
  const [historique, setHistorique] = React.useState([]);
  const { token, niveau, setNiveau } = props;

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

  return (
    <React.Fragment>
      <Box
        sx={{
          padding: "10px",
          heigth: "400px",
          margin: "10px",
          marginTop: "100px",
        }}
      >
        {historique.map((affectation, affectationKey) => (
          <UsagerAccordeon affectation={affectation} key={affectationKey} />
        ))}
      </Box>
    </React.Fragment>
  );
};

export default Usagers;
