import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

// material-ui
import MuiBreadcrumbs from "@mui/material/Breadcrumbs";
import { Grid, Typography } from "@mui/material";
import Label from "../Base/Label";
// project imports
import MainCard from "../MainCard";
import App from "components";

// ==============================|| BREADCRUMBS ||============================== //

const Breadcrumbs = ({ navigation, title, ...others }) => {
  const location = useLocation();
  const [main, setMain] = useState();
  const [item, setItem] = useState();
  const [text, settext] = useState();
  // set active item state
  const getCollapse = (menu) => {
    if (menu.children) {
      menu.children.filter((collapse) => {
        if (collapse.type && collapse.type === "collapse") {
          getCollapse(collapse);
        } else if (
          (collapse.type && collapse.type === "item") ||
          (collapse.type && collapse.type === "sub")
        ) {
          if (location.pathname === collapse.url) {
            setMain(menu);
            setItem(collapse);
            // console.log(collapse)
          }
        }
        return false;
      });
    }
  };

  // const settext =(text)=>{

  // }
  useEffect(() => {
    navigation?.items?.map((menu) => {
      if (menu.type && menu.type === "group") {
        getCollapse(menu);
      }
      return false;
    });
    if (location.pathname.toLowerCase().includes("/info/")) {
      settext(
        location.pathname.toLowerCase().includes("/member/") ? "View " : "Edit "
      );
    } else if (location.pathname.toLowerCase().includes("/info")) {
      settext("New ");
    } else {
      settext("");
    }
  });

  // only used for component demo breadcrumbs
  if (location.pathname === "/breadcrumbs") {
    location.pathname = "/dashboard/analytics";
  }

  let mainContent;
  let itemContent;
  let itemSubContent;
  let breadcrumbContent = <Typography />;
  let itemTitle = "";

  // collapse item
  if (main && main.type === "collapse") {
    mainContent = (
      <Typography
        component={Link}
        to={document.location.pathname}
        variant="h6"
        sx={{ textDecoration: "none" }}
        color="#DDD"
      >
        {main.title}
      </Typography>
    );
  }

  // items
  if ((item && item.type === "item") || (item && item.type === "sub")) {
    itemTitle = item.title;
    // itemTitle =
    if (location.pathname.toLowerCase().includes("/info")) {
      itemContent = (
        <Typography
          // variant="subtitle1"
          // color="textPrimary"
          component={Link}
          to={item.url}
          color="textSecondary"
          sx={{ textDecoration: "none" }}
        >
          {/* {itemTitle} */}
          <Label text={itemTitle} size={App.text.size.xl} color="#000" />
        </Typography>
      );
      itemSubContent = (
        <Typography
          variant="subtitle1"
          color="textPrimary"
          // component={Link}
          // to={item.url}
          sx={{ textDecoration: "none" }}
        >
          {/* {itemTitle} */}
          <Label
            text={
              text +
              (location.pathname.includes("/privilege/")
                ? "Privilege"
                : location.pathname.includes("/service/")
                  ? "Service"
                  : itemTitle)
            }
            size={App.text.size.xl}
            color="#000"
          />
        </Typography>
      );
    } else {
      itemContent = (
        <Typography variant="subtitle1" color="textPrimary">
          {/* {itemTitle} */}
          <Label text={itemTitle} size={App.text.size.xl} color="#000" />
        </Typography>
      );
    }

    // main
    if (item.breadcrumbs !== false) {
      breadcrumbContent = (
        <MainCard
          border={false}
          sx={{ mb: 0, bgcolor: "transparent" }}
          {...others}
          content={false}
        >
          <Grid
            container
            direction="column"
            justifyContent="flex-start"
            alignItems="flex-start"
            spacing={1}
          >
            <Grid item>
              <MuiBreadcrumbs aria-label="breadcrumb">
                <Typography
                  component={Link}
                  to="/"
                  color="textSecondary"
                  variant="h6"
                  sx={{ textDecoration: "none" }}
                >
                  <Label text={"Home"} size={App.text.size.xl} />
                </Typography>

                {mainContent}
                {itemContent}
                {itemSubContent}
              </MuiBreadcrumbs>
            </Grid>
            {title && (
              <Grid item sx={{ mt: 0 }}>
                <Label
                  text={
                    text +
                    (location.pathname.includes("/privilege/")
                      ? "Privilege"
                      : location.pathname.includes("/service/")
                        ? "Service"
                        : item.title)
                  }
                  size={36}
                  color="#000"
                />
              </Grid>
            )}
          </Grid>
        </MainCard>
      );
    }
  }

  return breadcrumbContent;
};

Breadcrumbs.propTypes = {
  navigation: PropTypes.object,
  title: PropTypes.bool,
};

export default Breadcrumbs;
