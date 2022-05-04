import Usagers from "./Usagers";
import Appareils from "./Appareils";
import Historique from "./Historique";
import Affectation from "./Affectation";
import axios from "axios";
import * as React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import AddCircleTwoToneIcon from "@mui/icons-material/AddCircleTwoTone";
import RemoveCircleTwoToneIcon from "@mui/icons-material/RemoveCircleTwoTone";
import DevicesTwoToneIcon from "@mui/icons-material/DevicesTwoTone";
import GroupsTwoToneIcon from "@mui/icons-material/GroupsTwoTone";
import GroupAddTwoToneIcon from "@mui/icons-material/GroupAddTwoTone";
import GroupRemoveTwoToneIcon from "@mui/icons-material/GroupRemoveTwoTone";
import BuildCircleTwoToneIcon from "@mui/icons-material/BuildCircleTwoTone";
import CreateTwoToneIcon from "@mui/icons-material/CreateTwoTone";
import { ToastContainer, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const drawerWidth = 250;

const MainPage = (props) => {
  const navigate = useNavigate();
  const [technicien, setTechnicien] = React.useState({
    pseudo: "GDERIV",
    prenom: "Geralt",
    nom: "DeRiv",
  });

  return (
    <Box sx={{ display: "flex" }}>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        transition={Flip}
      />
      <AppBar
        position="fixed"
        sx={{
          width: `calc(100% - ${drawerWidth}px)`,
          ml: `${drawerWidth}px`,
        }}
      >
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Main Page
          </Typography>
          <Typography>Connecté en tant que {technicien.pseudo}</Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Divider />
        <List>
          <ListItem
            button
            key={"Devices"}
            onClick={() => navigate("appareils")}
          >
            <ListItemIcon>
              <DevicesTwoToneIcon />
            </ListItemIcon>
            <ListItemText primary={"Liste des appareils"} />
          </ListItem>
          <ListItem button key={"Users"} onClick={() => navigate("usagers")}>
            <ListItemIcon>
              <GroupsTwoToneIcon />
            </ListItemIcon>
            <ListItemText primary={"Liste des usagers"} />
          </ListItem>
          <ListItem
            button
            key={"AddDevices"}
            onClick={() => navigate("affectation")}
          >
            <ListItemIcon>
              <AddCircleTwoToneIcon />
            </ListItemIcon>
            <ListItemText primary={"Affecter un appareil"} />
          </ListItem>
        </List>
      </Drawer>
      <Box component="main">
        <Routes sx={{ flexGrow: 1, p: 3, marginTop: "64px" }}>
          <Route path="/usagers" element={<Usagers />} />
          <Route path="/appareils" element={<Appareils />} />
          <Route path="/historique" element={<Historique />} />
          <Route path="/affectation" element={<Affectation />} />
        </Routes>
      </Box>
    </Box>
  );
};

export default MainPage;
