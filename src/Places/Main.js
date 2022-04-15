import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

const Main = () => {
  return (
    <div>
      <Typography variant="h2" component="div">
        Page principal
      </Typography>
      <Grid sx={{ backgroundColor: "steelblue" }}></Grid>
    </div>
  );
};

export default Main;
