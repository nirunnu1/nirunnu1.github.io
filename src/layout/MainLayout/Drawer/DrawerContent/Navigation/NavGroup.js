import PropTypes from "prop-types";
import { useSelector } from "react-redux";

// material-ui
import { Box, List, Typography } from "@mui/material";
import NavItem from "./NavItem";
import NavCollapse from "./NavCollapse";
import App from "components";
// ==============================|| NAVIGATION - LIST GROUP ||============================== //

const NavGroup = ({ item }) => {
  const menu = useSelector((state) => state.menu);
  const { drawerOpen } = menu;

  const navCollapse = item.children?.map((menuItem) => {
    switch (menuItem.type) {
      case "collapse":
        return <NavCollapse key={menuItem.id} menu={menuItem} level={1} />;
      case "item":
        return <NavItem key={menuItem.id} item={menuItem} level={1} />;
      case "sub":
        return (
          <NavItem key={menuItem.id} item={menuItem} level={1} isShow={false} />
        );
      default:
        return (
          <Typography
            key={menuItem.id}
            variant="h6"
            color="error"
            align="center"
          >
            Fix - Group Collapse or Items
          </Typography>
        );
    }
  });

  return (
    <List
      subheader={
        item.title &&
        drawerOpen && (
          <Box sx={{ pl: 3, mb: 0 }}>
            {item.id === "admin" ? <Box mt={1}><App.Divider /> </Box> : null}
            {/* <Typography variant="subtitle2" color="textSecondary">
              <Label text={item.title} size={28} color="#000" />
            </Typography> */}
            {/* only available in paid version */}
          </Box>
        )
      }
      sx={{ mb: drawerOpen ? 0 : 0, py: 0, zIndex: 0 }}
    >
      {navCollapse}
    </List>
  );
};

NavGroup.propTypes = {
  item: PropTypes.object,
};

export default NavGroup;
