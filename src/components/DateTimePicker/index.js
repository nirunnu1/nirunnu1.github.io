import * as React from "react";
import PropTypes from "prop-types";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { alpha, styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { IconButton, InputAdornment } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import Label from "../Base/Label";
import color from "../color";
import FormHelperText from "@mui/material/FormHelperText";

import App from "../index";
import locale from "dayjs/locale/th";

import { DesktopDateTimePicker } from "@mui/x-date-pickers/DesktopDateTimePicker";
import { useEffect } from "react";
const BootstrapInput = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(3),
  },
  width: "",
  backgroundColor: App.color.white,
  borderRadius: "4px",
  border: "1px solid #BBBFCC",
  "&.Mui-disabled": {
    borderColor: App.color.gray,
    backgroundColor: App.color.gray,
  },
  "& .MuiInputBase-input": {
    borderRadius: 4,
    position: "relative",
    fontSize: 14,
    width: "",
    padding: "10px 12px",
    "&:focus": {},
    "&.Mui-disabled": {
      backgroundColor: App.color.gray,
    },
    fontWeight: 300,
  },
  "& .MuiInputAdornment-positionStart": {
    margin: "0",
    paddingLeft: "8px",
  },
  "& .MuiInputAdornment-positionEnd": {
    margin: 0,
    paddingRight: "10px",
  },
}));
const BootstrapInputLabel = ({ htmlFor, title, isRequired, titleProp }) => {
  return (
    <InputLabel
      shrink={true}
      htmlFor={htmlFor}
      sx={{
        color: App.color.black,
        fontSize: "14px",
        display: "flex",
        fontWeight: "500",
        height: 26,
      }}
    >
      {title}
      {isRequired ? (
        <p
          style={{ color: App.color.main, fontSize: "14px", marginTop: "2px" }}
        >
          *
        </p>
      ) : null}
      {titleProp}
    </InputLabel>
  );
};

function MaterialUIPickers(props) {
  const {
    title,
    label,
    name,
    maxDate,
    minDate,
    onChange,
    value,
    disabled,
    helperText,
    isLabel,
    inputFormat,
    isGap = true,
    titleProp,
    isRequired,
    disablePast = false,
    sx,
  } = props;
  const handleChange = (newValue) => {
    onChange({ name: name, value: newValue });
  };
  const [open, setOpen] = React.useState(false);
  const [Disabled, setDisabled] = React.useState(disabled);

  const myRef = React.useRef();
  let rect_x = "";
  if (myRef.current) {
    const rect = myRef.current.getBoundingClientRect();
    let rect_x = rect.left;
    // console.log("Element position (X, Y):", rect.left, rect.top);
  }

  useEffect(() => {
    setDisabled(disabled);
  }, [disabled]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"th"}>
      <FormControl
        variant="standard"
        fullWidth
        sx={{
          "& .MuiFormLabel-root": {
            transform: "unset",
          },
          marginTop: isGap ? "10px" : "0px",
          ...(Disabled
            ? {
              "& label": {
                color: App.color.textCaption,
              },
            }
            : {}),
          "& input": {
            width: {
              sm: "110px",
              md: "110px",
              lg: "110px",
              xl: "150px",
              xxl: "180px",
            },
          },
          ...sx,
        }}
      >
        {isLabel !== false ? (
          <BootstrapInputLabel
            htmlFor={name}
            title={label || title}
            isRequired={isRequired}
            titleProp={titleProp}
          />
        ) : null}
        <DesktopDateTimePicker
          sx={{
            "& .MuiPickersPopper-root": {
              transform: `translate3d(${rect_x}, -268px, 0px) !important`,
            },
            transform: `translate3d(${rect_x}, -268px, 0px) !important`,

            ".css-1anqmj6-MuiPopper-root-MuiPickersPopper-root": {
              transform: `translate3d(${rect_x}, -268px, 0px) !important`,
            },
          }}
          id="t1"
          ref={myRef}
          width={"200px"}
          open={open}
          onOpen={() => setOpen(true)}
          onClose={() => setOpen(false)}
          label={title}
          //   inputFormat={inputFormat || "DD/MM/YYYY"}
          value={value || null}
          //   defaultValue={("2022-04-17T15:30")}
          onChange={handleChange}
          maxDate={maxDate}
          minDate={minDate}
          disablePast={disablePast}
          renderInput={(params) => (
            <BootstrapInput
              {...params}
              placeholder={title}
              endAdornment={
                <InputAdornment
                  position="end"
                  style={{
                    position: "absolute",
                    right: 10,
                  }}
                >
                  <IconButton
                    aria-label="CalendarMonthIcon"
                    edge="end"
                    disabled={Disabled || false}
                  >
                    <CalendarMonthIcon sx={{ color: color.main }} />
                  </IconButton>
                </InputAdornment>
              }
              onClick={(e) => setOpen(true)}
            />
          )}
          className={
            helperText !== null && helperText !== undefined ? "Mui-error" : ""
          }
          disabled={Disabled || false}
        />
        <FormHelperText id="component-error-text" style={{ color: "red" }}>
          {helperText}
        </FormHelperText>
      </FormControl>
    </LocalizationProvider>
  );
}
MaterialUIPickers.propTypes = {
  title: PropTypes.string,
  name: PropTypes.string,
  maxDate: PropTypes.any,
  minDate: PropTypes.any,
  onChange: PropTypes.func,
  value: PropTypes.any,
  disabled: PropTypes.bool,
  helperText: PropTypes.string,
  isLabel: PropTypes.bool,
  inputFormat: PropTypes.string,
  isGap: PropTypes.bool,
};
export default MaterialUIPickers;
