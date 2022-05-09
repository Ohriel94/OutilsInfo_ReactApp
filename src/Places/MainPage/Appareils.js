import * as React from "react";
import { Routes, Route } from "react-router-dom";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Axios from "axios";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import OrdinateurAccordeon from "../../Components/OrdinateurAccordeon";
import { NoMeetingRoomTwoTone } from "@mui/icons-material";

const Ordinateurs = (props) => {
  const [ordinateurs, setOrdinateurs] = React.useState([]);
  const { token, niveau, setNiveau } = props;

  React.useEffect(() => {
    getOrdinateurs();
  }, []);

  const getOrdinateurs = () => {
    const f = async () => {
      try {
        const getOrdinateursRequest = await Axios({
          method: "get",
          url: "http://localhost:3001/ordinateurs",
        });
        setOrdinateurs(getOrdinateursRequest.data);
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
          width: "auto",
        }}
      >
        {ordinateurs.map((ordinateur, ordinateurKey) => (
          <OrdinateurAccordeon ordinateur={ordinateur} key={ordinateurKey} />
        ))}
      </Box>
    </React.Fragment>
  );
};

export default Ordinateurs;
