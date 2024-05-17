import { Box } from "@mui/material";
import { memo } from "react";
import PropTypes from "prop-types";
import App from "components";
import Label from "../Base/Label";

// import { SxProps } from '@mui/system';
const _default = {
  boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.15)",
  borderRadius: "10px",
};

const Card = (props) => {
  const { sx, children, title, border = true, subTitle } = props;
  return (
    <Box
      {...props}
      sx={{
        ..._default,
        ...sx,
      }}
      onClick={props.onClick}
    >
      {App.service.isNullOrEmpty(title) ? null : (
        <Box
          sx={{
            display: "flex",
            borderBottom: border
              ? "1px solid var(--nuetral-gray-7, #D6D6D8)"
              : "none",
            paddingBottom: "14px",

            flexDirection: "column",
          }}
          mb={2}
        >
          <Label text={title} size={32} color="#000" />
          <Label text={subTitle} size={16} color="#000" />
        </Box>
      )}
      {children}
    </Box>
  );
};
Card.propTypes = {
  onClick: PropTypes.func,
};
export default memo(Card);
