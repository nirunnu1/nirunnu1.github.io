// material-ui
import { useMediaQuery, Container, Link, Typography, Box } from "@mui/material";

// ==============================|| FOOTER - AUTHENTICATION ||============================== //

const AuthFooter = () => {
  const matchDownSM = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  return (
    <Container maxWidth="xl">
      <Box style={{ textAlign: "center" }}>
        <Typography variant="subtitle2" color="secondary" component="span">
          2020 &copy; MANA Development All Rights Reserved
        </Typography>
      </Box>
    </Container>
  );
};

export default AuthFooter;
