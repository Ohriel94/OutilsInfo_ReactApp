import EditerOrdinateur from "../../../Components/Ordinateurs/EditerOrdinateur";
import OrdinateurAccordeon from "../../../Components/Ordinateurs/OrdinateurAccordeon";
import * as React from "react";
import Axios from "axios";
import { toast, ToastContainer, Flip } from "react-toastify";
import Theme from "../../../Ressources/Theme";
import { ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import { NoMeetingRoomTwoTone } from "@mui/icons-material";

const EcranOrdinateurs = (props) => {
  const [ordinateurs, setOrdinateurs] = React.useState([]);
  const { token, niveau, setNiveau } = props;

  React.useEffect(() => {
    getOrdinateurs();
  }, []);

  const notifier = (statusCode) => {
    console.log(statusCode);
    switch (statusCode) {
      case 200:
        toast.success("Inscription réussie...");
        break;
      case 400:
        toast.error("Ce membre existe déjà...");
        break;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const f = async () => {
      try {
        const inscrireMembreRequest = await Axios({
          method: "post",
          url: "http://localhost:3001/inscrireMembre",
          data: {
            id: parseInt(data.get("id")),
            prenom: data.get("prenom"),
            nom: data.get("nom"),
            adresse: data.get("adresse"),
            motDePasse: data.get("motDePasse"),
          },
        });
        notifier(200);
      } catch (e) {
        notifier(e.response.status);
        console.log("Failed to connect " + e);
      }
    };
    f();
  };

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
      <ToastContainer
        position="top-left"
        autoClose={2000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        transition={Flip}
      />
      <Box>
        {ordinateurs.map((ordinateur, ordinateurKey) => (
          <OrdinateurAccordeon
            ordinateur={ordinateur}
            key={ordinateurKey}
            handleSubmit={handleSubmit}
            notifier={notifier}
          />
        ))}
      </Box>
    </React.Fragment>
  );
};

export default EcranOrdinateurs;
