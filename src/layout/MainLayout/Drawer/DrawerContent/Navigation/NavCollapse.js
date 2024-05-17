import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import App from "components";
// material-ui
import { styled, useTheme } from "@mui/material/styles";
import {
  Box,
  Collapse,
  ClickAwayListener,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Popper,
  Typography,
} from "@mui/material";

// project import
import NavItem from "./NavItem";
import Transitions from "components/@extended/Transitions";

// assets

import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// mini-menu - wrapper
const PopperStyled = styled(Popper)(({ theme }) => ({
  overflow: "visible",
  zIndex: 1202,
  minWidth: 180,
  "&:before": {
    content: '""',
    display: "block",
    position: "absolute",
    top: 38,
    left: -5,
    width: 10,
    height: 10,
    backgroundColor: theme.palette.background.paper,
    transform: "translateY(-50%) rotate(45deg)",
    zIndex: 120,
    // borderLeft: `1px solid ${theme.palette.grey.A800}`,
    // borderBottom: `1px solid ${theme.palette.grey.A800}`,
  },
}));

// ==============================|| NAVIGATION - LIST COLLAPSE ||============================== //

const NavCollapse = ({ menu, level }) => {

  const theme = useTheme();

  const menuState = useSelector((state) => state.menu);
  const { drawerOpen } = menuState;

  const [open, setOpen] = useState(false);
  const [use, setUse] = useState(false);
  const [selected, setSelected] = useState(null);

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(null);
    if (drawerOpen) {
      setOpen(!open);
      setSelected(!selected ? menu.id : null);
    } else {
      setAnchorEl(event?.currentTarget);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const pathname = document.location.pathname;

  useEffect(() => {
    const childrens = menu.children ? menu.children : [];
    setUse(false)
    childrens.forEach((item) => {
      if (pathname.includes(item.url)) {
        setOpen(true);
        setUse(true)
        setSelected(menu.id);
      }
    });
  }, [pathname, menu]);


  const openMini = Boolean(anchorEl);

  const navCollapse = menu.children?.map((item) => {
    switch (item.type) {
      case "collapse":
        return <NavCollapse key={item.id} menu={item} level={level + 1} />;
      case "item":
        return <NavItem key={item.id} item={item} level={level + 1} />;
      default:
        return (
          <Typography key={item.id} variant="h6" color="error" align="center">
            Fix - Collapse or Item
          </Typography>
        );
    }
  });


  const menuIcon = menu.icon;
  const iconSelectedColor =
    theme.palette.mode === "dark" && drawerOpen
      ? theme.palette.text.primary
      : theme.palette.primary.main;

  return (
    <>
      <ListItemButton
        disableRipple
        selected={selected === menu.id}
        {...(!drawerOpen && {
          onMouseEnter: handleClick,
          onMouseLeave: handleClose,
        })}
        onClick={handleClick}
        // style={{
        //   paddingTop: "14px",
        //   paddingBottom: "14px",
        // }}
        sx={{
          borderRadius: "40px",

          mt: 1,
          pl: drawerOpen ? `${level * 14}px` : 1.5,
          py: !drawerOpen && level === 1 ? 1.25 : 1,
          pt: "10px",
          pb: "10px",
          ...(drawerOpen && {
            "& .MuiSvgIcon-root ": {
              color: App.color.main
            },
            "&:hover": {
              bgcolor: App.color.main,
              color: "#FFF",
              "& path": {
                fill: "#FFF !important",
              },
            },
            "&:hover .MuiTypography-root span": {
              color: "#FFF !important",
            },
            "&.Mui-selected": {
              bgcolor: use ? "#DDD" : "#FFF",
              color: iconSelectedColor,
              "&:hover": {
                color: iconSelectedColor,
                bgcolor: App.color.main,
              },
            },
          }),
          ...(!drawerOpen && {
            "&:hover": {
              bgcolor: "transparent",
              color: "#FFF",
            },
            "&:hover .MuiTypography-root span": {
              color: "#FFF !important",
            },
            "&.Mui-selected": {
              "&:hover": {
                bgcolor: "transparent",
              },
              bgcolor: "transparent",
              "& path": {
                fill: "#FFF !important",
              },
            },
          }),
        }}
      >
        {menuIcon && (
          <ListItemIcon
            sx={{
              minWidth: 28,
              color: "#FFF",
              ...(!drawerOpen && {
                borderRadius: 1.5,
                width: 36,
                height: 36,
                alignItems: "center",
                justifyContent: "center",
                "&:hover": {
                  bgcolor: App.color.main,
                },
              }),
              ...(!drawerOpen &&
                selected === menu.id && {
                bgcolor:
                  theme.palette.mode === "dark"
                    ? "primary.900"
                    : App.color.main,
                "&:hover": {
                  bgcolor: App.color.main,
                },
              }),
            }}
          >
            {menuIcon}
          </ListItemIcon>
        )}
        {(drawerOpen || (!drawerOpen && level !== 1)) && (
          <ListItemText
            primary={
              <App.Label
                text={menu.title}
                fontWeight="400"
                size={App.text.size.md}
                color={"#000"}
              />
            }
            secondary={
              menu.caption && (
                <Typography variant="caption" color="#FFF">
                  {menu.caption}
                </Typography>
              )
            }
          />
        )}
        {(drawerOpen || (!drawerOpen && level !== 1)) &&
          (openMini || open ? (
            <ExpandLessIcon />
          ) : (
            <ExpandMoreIcon />
          ))}

        {!drawerOpen && (
          <PopperStyled
            open={openMini}
            anchorEl={anchorEl}
            placement="right-start"
            style={{
              zIndex: 2001,
            }}
            popperOptions={{
              modifiers: [
                {
                  name: "offset",
                  options: {
                    offset: [-12, 1],
                  },
                },
              ],
            }}
          >
            {({ TransitionProps }) => (
              <Transitions in={openMini} {...TransitionProps}>
                <Paper
                  sx={{
                    overflow: "hidden",
                    mt: 1.5,
                    boxShadow: theme.customShadows.z1,
                    backgroundImage: "none",
                    border: `1px solid ${theme.palette.divider}`,
                  }}
                >
                  <ClickAwayListener onClickAway={handleClose}>
                    <Box>{navCollapse}</Box>
                  </ClickAwayListener>
                </Paper>
              </Transitions>
            )}
          </PopperStyled>
        )}
      </ListItemButton>
      {drawerOpen && (
        <Collapse in={open} timeout="auto"  >
          <List sx={{ p: 0 }}>{navCollapse}</List>
        </Collapse>
      )}
    </>
  );
};

NavCollapse.propTypes = {
  menu: PropTypes.object,
  level: PropTypes.number,
};

export default NavCollapse;
