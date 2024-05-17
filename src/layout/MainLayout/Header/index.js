import PropTypes from "prop-types";

import App from "components";

// material-ui
import { useTheme } from "@mui/material/styles";
import { AppBar, IconButton, Toolbar, useMediaQuery } from "@mui/material";

// project import
import AppBarStyled from "./AppBarStyled";
import HeaderContent from "./HeaderContent";

// assets
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
const Header = ({ open, handleDrawerToggle }) => {
  const theme = useTheme();
  const matchDownMD = useMediaQuery(theme.breakpoints.down("lg"));

  // common header
  const mainHeader = (
    <Toolbar style={{ justifyContent: "space-between" }}>
      <IconButton
        disableRipple
        aria-label="open drawer"
        onClick={handleDrawerToggle}
        edge="start"
        color="secondary"
        sx={{
          color: "#FFF"
          // bgcolor: open ? iconBackColorOpen : iconBackColor, ml: { xs: 0, lg: -2 }
        }}
      >
        <MenuOpenIcon />
      </IconButton>
      <HeaderContent />
    </Toolbar>
  );

  // app-bar params
  const appBar = {
    position: "fixed",
    color: "inherit",
    elevation: 0,
    sx: {
      borderBottom: `1px solid ${theme.palette.divider}`,
      background: App.color.main,
      height: "60px",
      zIndex: 1200,
      boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.25)",
    },
  };

  return (
    <>
      {!matchDownMD ? (
        <AppBarStyled open={open} {...appBar}>
          {mainHeader}
        </AppBarStyled>
      ) : (
        <AppBar {...appBar}>{mainHeader}</AppBar>
      )}
    </>
  );
};

Header.propTypes = {
  open: PropTypes.bool,
  handleDrawerToggle: PropTypes.func,
};

export default Header;
