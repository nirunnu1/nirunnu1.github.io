import PropTypes from "prop-types";
import { forwardRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  Avatar,
  Chip,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  // Typography,
} from "@mui/material";
import App from "components";
// project import
import { activeItem } from "store/reducers/menu";

const NavItem = ({ item, level, isShow }) => {
  const dispatch = useDispatch();
  const menu = useSelector((state) => state.menu);
  const { drawerOpen, openItem } = menu;

  let itemTarget = "_self";
  if (item.target) {
    itemTarget = "_blank";
  }

  let listItemProps = {
    component: forwardRef((props, ref) => (
      <Link ref={ref} {...props} to={item.url} target={itemTarget} />
    )),
  };
  if (item?.external) {
    listItemProps = { component: "a", href: item.url, target: itemTarget };
  }

  const itemHandler = (id) => {
    dispatch(activeItem({ openItem: [id] }));
  };

  const Icon = item.icon;
  const itemIcon = Icon;

  const isSelected = openItem.findIndex((id) => id === item.id) > -1;

  // active menu item on page load
  useEffect(() => {
    const currentIndex = document.location.pathname
      .toLowerCase()
      .toString()
      .split("/")
      .findIndex((id) => id.toLowerCase() === item.id.toLowerCase());

    if (currentIndex > -1) {
      dispatch(activeItem({ openItem: [item.id] }));
    }
    // eslint-disable-next-line
  }, [document.location.pathname]);

  const iconSelectedColor = "primary.main";
  // if (!PermissionMenu) {
  //   return null
  // }
  return (
    <ListItemButton
      {...listItemProps}
      disabled={item.disabled}
      onClick={() => itemHandler(item.id)}
      selected={isSelected}
      sx={{
        zIndex: 1201,
        display: isShow === false ? "none" : "",
        pl: drawerOpen ? `${level * 14}px` : 1.5,
        py: !drawerOpen && level === 1 ? 1.25 : 1,
        pt: "10px",
        pb: "10px",
        mt: 1,
        borderRadius: "40px",
        ...(drawerOpen && {
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
            bgcolor: App.color.main,
            color: "#FFF",
            "&:hover": {
              color: iconSelectedColor,
              bgcolor: App.color.main,
            },
            "& path": {
              fill: "#FFF !important",
            },
          },
        }),
        ...(!drawerOpen && {
          "&:hover .MuiTypography-root span": {
            color: "#000 !important",
          },
          "&:hover": {
            bgcolor: "transparent",
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
      {itemIcon && (
        <ListItemIcon
          sx={{
            minWidth: 28,
            color: isSelected ? iconSelectedColor : App.color.main,
            ...(!drawerOpen && {
              borderRadius: 1.5,
              width: 36,
              height: 36,
              alignItems: "center",
              justifyContent: "center",
              "&:hover": {
                bgcolor: "secondary.lighter",
              },
            }),
            ...(!drawerOpen &&
              isSelected && {
              bgcolor: App.color.main,
              "&:hover": {
                bgcolor: App.color.main,
              },
            }),
          }}
        >
          {itemIcon}
        </ListItemIcon>
      )}
      {(drawerOpen || (!drawerOpen && level !== 1)) && (
        <ListItemText
          primary={
            <App.Label
              text={item.title}
              size={App.text.size.md}
              fontWeight="400"
              color={!drawerOpen ? "#000" : isSelected ? "#FFF" : "#000"}
            />
          }
        />
      )}
      {(drawerOpen || (!drawerOpen && level !== 1)) && item.chip && (
        <Chip
          color={item.chip.color}
          variant={item.chip.variant}
          size={item.chip.size}
          label={item.chip.label}
          avatar={item.chip.avatar && <Avatar>{item.chip.avatar}</Avatar>}
        />
      )}
    </ListItemButton>
  );
};

NavItem.propTypes = {
  item: PropTypes.object,
  level: PropTypes.number,
};

export default NavItem;
