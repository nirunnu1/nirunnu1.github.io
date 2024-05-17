// material-ui
import { Box, Typography } from "@mui/material";
import NavGroup from "./NavGroup";
import menuItem from "menu-items";
import { useSelector } from "react-redux";

const Navigation = () => {

  const { drawerOpen } = useSelector((state) => state.menu);

  const navGroups = menuItem.items.map((item, i) => {
    switch (item.type) {
      case "group":
        return <NavGroup key={item.id} item={item} />;
      default:
        return (
          <Typography key={item.id} variant="h6" color="error" align="center">
            Fix - Navigation Group
          </Typography>
        );
    }
  });

  return (
    <Box pl={drawerOpen ? 2.5 : 0} pr={2.5}>
      {navGroups}
    </Box>
  );
};

export default Navigation;
