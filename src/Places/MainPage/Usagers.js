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
  const [appareils, setAppareils] = React.useState([]);
  const [usagers, setUsagers] = React.useState([]);
  const { token, niveau, setNiveau } = props;

  React.useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = () => {
    const f = async () => {
      try {
        const getUsersRequest = await axios({
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

  return (
    <React.Fragment>
      <Paper
        elevation={10}
        sx={{
          padding: "10px",
          heigth: "400px",
          margin: "10px",
        }}
      >
        {usagers.map((usager, usagerKey) => (
          <UsagerAccordeon usager={usager} key={usagerKey} />
        ))}
      </Paper>
    </React.Fragment>
  );
};

export default Usagers;
