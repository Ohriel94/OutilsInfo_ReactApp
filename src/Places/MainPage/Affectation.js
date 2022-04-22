import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import axios from "axios";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import DragAndDrop from "../../Components/DragAndDrop";
import { NoMeetingRoomTwoTone } from "@mui/icons-material";

const Affectation = (props) => {
  const [ordinateurs, setOrdinateurs] = useState([]);
  const [usagers, setUsagers] = useState([]);
  const [appareils, setAppareils] = React.useState([]);
  const { token, niveau, setNiveau } = props;

  React.useEffect(() => {
    getUsers();
    getOrdinateurs();
  }, []);

  const getUsers = () => {
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

  const getOrdinateurs = () => {
    const f = async () => {
      try {
        const getOrdinateursRequest = await axios({
          method: "get",
          url: "http://localhost:3001/appareils",
        });
        setOrdinateurs(getOrdinateursRequest.data[0].ordinateurs);
      } catch (e) {
        console.log("Failed to connect " + e);
      }
    };
    f();
    console.log(ordinateurs[0]);
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
        <DragAndDrop
          ordinateurs={ordinateurs}
          usagers={usagers}
          setOrdinateurs={setOrdinateurs}
          setUsagers={setUsagers}
        />
      </Box>
    </React.Fragment>
  );
};

export default Affectation;
