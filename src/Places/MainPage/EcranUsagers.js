import * as React from "react";
import { Routes, Route } from "react-router-dom";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Axios from "axios";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import UsagerAccordeon from "../../Components/UsagerAccordeon";
import Toolbar from "../../Components/Utilitaires/Toolbar";
import { NoMeetingRoomTwoTone } from "@mui/icons-material";

const Usagers = (props) => {
  const [appareils, setAppareils] = React.useState([]);
  const [usagers, setUsagers] = React.useState([]);
  const { token, niveau, setNiveau } = props;

  React.useEffect(() => {
    getUsers();
  }, []);

  const getUsers = () => {
    const f = async () => {
      try {
        const getUsersRequest = await Axios({
          method: "get",
          url: "http://localhost:3001/usagers",
        });
        setUsagers(getUsersRequest.data);
      } catch (e) {
        console.log("Failed to connect " + e);
      }
    };
    f();
  };

  const addUsager = () => {
    const f = async () => {
      try {
        const getUsersRequest = await Axios({
          method: "post",
          url: "http://localhost:3001/usagers",
          data: { prenom: "Test", nom: "Test" },
        });
      } catch (e) {
        console.log("Failed to connect " + e);
      }
    };
    f();
  };

  return (
    <React.Fragment>
      <Box>
        <Button
          variant="contained"
          size="small"
          onClick={() => {
            addUsager();
          }}
        >
          Ajouter Usager
        </Button>
        {usagers.map((usager, usagerKey) => (
          <UsagerAccordeon usager={usager} key={usagerKey} />
        ))}
      </Box>
    </React.Fragment>
  );
};

export default Usagers;
