import * as React from "react";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { IconButton } from "@mui/material";
import { InputAdornment } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";
import Label from "../Base/Label";
import FormHelperText from "@mui/material/FormHelperText";
import color from "../color";
const BootstrapInput = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(3),
  },
  "& .MuiInputBase-input": {
    height: "20px",
    padding: "5px 5px",
    boxSizing: "content-box",

    borderRadius: 10,
    position: "relative",
    color: color.main,
    border: "1px solid #B8B9BA",
    backgroundColor: "#FFF",
    fontSize: 16,
    transition: theme.transitions.create([
      "border-color",
      "background-color",
      "box-shadow",
    ]),

    "&:focus": {
      borderColor: "#161e44",
    },
  },
  "& .MuiInputBase-input.Mui-disabled": {
    backgroundColor: "#ededee !important",
    border: "1px solid #ededee",
  },
  "&.Mui-error": {
    "& input": {
      border: "1px solid red",
      "&::placeholder": {
        color: "red",
      },
    },
    "& button ": {
      color: "red",
    },
  },
}));
export default function MaterialUIPickers(props) {
  const { title, name, onChange, value, disabled, helperText, placeholder } =
    props;
  const handleChange = (newValue) => {
    onChange({ name: name, value: newValue });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <FormControl variant="standard" fullWidth>
        <InputLabel shrink htmlFor={name} style={{ transform: "none" }}>
          <Label text={title} size={16} fontWeight="bold" />
        </InputLabel>
        <MobileTimePicker
          label={title}
          value={value || null}
          onChange={handleChange}
          ampm={false}
          renderInput={(params) => (
            <BootstrapInput
              {...params}
              placeholder={placeholder || title}
              endAdornment={
                <InputAdornment
                  position="end"
                  style={{
                    position: "absolute",
                    right: "10px",
                  }}
                >
                  <IconButton
                    aria-label="toggle password visibility"
                    edge="end"
                    disabled={disabled || false}
                  >
                    <AccessTimeIcon sx={{ color: color.main }} />
                  </IconButton>
                </InputAdornment>
              }
            />
          )}
          className={
            helperText !== null && helperText !== undefined ? "Mui-error" : ""
          }
          disabled={disabled || false}
          sx={{
            "& .MuiPickersToolbar-penIconButton": {
              display: "none",
            },
          }}
        />
        <FormHelperText id="component-error-text" style={{ color: "red" }}>
          {helperText}
        </FormHelperText>
      </FormControl>
    </LocalizationProvider>
  );
}
