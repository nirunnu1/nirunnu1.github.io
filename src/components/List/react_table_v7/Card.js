import PropTypes from "prop-types";
import React, { forwardRef, useRef } from "react";
// material-ui
import { useTheme } from "@mui/material/styles";
import { Card, CardContent, Button } from "@mui/material";
import * as XLSX from "xlsx";
// project import
import { Box } from "@mui/material";
import VerticalAlignTopIcon from "@mui/icons-material/VerticalAlignTop";
import Label from "../../Base/Label";

const MainCard = (
  ({
    border = true,
    boxShadow,
    children,
    content = true,
    contentSX = {},
    darkTitle,
    divider = true,
    elevation,
    secondary,
    shadow,
    sx = {},
    title,
    codeHighlight,
    selectedRowIds,
    name,
    Delete,
    Export,
    Impost,
    isImpost,
    IsDelete,
    IsAdd,
    ImpostName,
    toolBar,
    IsSelect,
    Permission,
    // ...others
  }) => {
    const theme = useTheme();
    // let navigate = useNavigate();
    // const dispatch = useDispatch();
    const BoxShadow = theme.palette.mode === "dark" ? boxShadow || true : boxShadow;

    return (
      <Card
        elevation={elevation || 0}
        // {...others}
        style={{
          boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)"
        }}
        sx={{
          ...sx,
          // border: border ? "1px solid" : "none",
          borderRadius: 2,
          // borderColor:
          //   theme.palette.mode === "dark"
          //     ? theme.palette.divider
          //     : theme.palette.grey.A800,
          boxShadow:
            boxShadow && (!border || theme.palette.mode === "dark")
              ? shadow || theme.customShadows.z1
              : "inherit",
          ":hover": {
            boxShadow: BoxShadow ? shadow || theme.customShadows.z1 : "inherit",
          },
          "& pre": {
            m: 0,
            p: "16px !important",
            fontFamily: theme.typography.fontFamily,
            fontSize: "0.75rem",
          },
          // minHeight: "600px",
        }}
      >
        <CardContent sx={contentSX} style={{ padding: "0 0", height: "100%" }}>
          {children}
        </CardContent>
      </Card>
    );
  }
);

MainCard.propTypes = {
  border: PropTypes.bool,
  boxShadow: PropTypes.bool,
  contentSX: PropTypes.object,
  darkTitle: PropTypes.bool,
  divider: PropTypes.bool,
  elevation: PropTypes.number,
  secondary: PropTypes.node,
  shadow: PropTypes.string,
  sx: PropTypes.object,
  title: PropTypes.string,
  codeHighlight: PropTypes.bool,
  content: PropTypes.bool,
  children: PropTypes.node,
};

export default MainCard;
