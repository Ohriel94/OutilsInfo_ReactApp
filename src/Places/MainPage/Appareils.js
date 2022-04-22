import * as React from "react";
import { Routes, Route } from "react-router-dom";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import axios from "axios";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import AppareilAccordeon from "../../Components/AppareilAccordeon";
import { NoMeetingRoomTwoTone } from "@mui/icons-material";

const Appareils = (props) => {
  const [ordinateurs, setOrdinateurs] = React.useState([]);
  const { token, niveau, setNiveau } = props;

  React.useEffect(() => {
    getOrdinateurs();
  }, []);

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
          width: "auto",
        }}
      >
        {ordinateurs.map((ordinateur, ordinateurKey) => (
          <AppareilAccordeon appareil={ordinateur} key={ordinateurKey} />
        ))}
      </Box>
    </React.Fragment>
  );
};

export default Appareils;
