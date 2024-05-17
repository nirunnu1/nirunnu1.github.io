import * as React from "react";
import PropTypes from "prop-types";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { styled } from "@mui/material/styles";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import {
  IconButton,
  InputAdornment,
  FormControl,
  InputBase,
  Box
} from "@mui/material";

// import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import component from "../Controlled/component";
import color from "../color";
// import FormHelperText from "@mui/material/FormHelperText";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Controlled from "../Controlled";
import App from "components";
import locale from "dayjs/locale/th";
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { useEffect } from "react";

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  "label + &": {
    // marginTop: theme.spacing(3),
  },
  width: "",
  backgroundColor: App.color.white,
  borderRadius: "40px",
  border: "1px solid " + App.color.disabled,
  "&.Mui-disabled": {
    borderColor: App.color.disabled,
    backgroundColor: App.color.disabled,
  },
  "& .MuiInputBase-input": {
    borderRadius: "40px",
    position: "relative",
    fontSize: 14,
    width: "",
    padding: "10px 12px",
    "&:focus": {},
    "&.Mui-disabled": {
      backgroundColor: App.color.disabled,
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
    form,
    isStatic = false
  } = props;
  const handleChange = (newValue) => {
    onChange({
      target: { name: name, value: newValue },
      name: name, value: newValue
    });
  };
  const [open, setOpen] = React.useState(false);
  const [Disabled, setDisabled] = React.useState(disabled);
  useEffect(() => {
    setDisabled(disabled);
  }, [disabled]);
  const dateTimePaperPropsStyles = {
    sx: {
      ".MuiPickersCalendarHeader-root": {
        display: "flex",
        alignItems: "center",
        justifyItems: "center",
      },
      ".MuiPickersCalendarHeader-root:first-child": {
        order: 0,
        paddingRight: "20px",
        paddingLeft: "20px",
      },
      ".MuiPickersArrowSwitcher-root": {
        display: "inline-flex",
        // visibility: "hidden"
      },
      ".MuiPickersCalendarHeader-label": {
        textAlign: "center",
      },
      ".MuiPickersArrowSwitcher-spacer": {
        width: "220px",
      },
      ".MuiPickersCalendarHeader-labelContainer": {
        display: "flex",
        position: "absolute",
        paddingLeft: "100px",
      },
      ".MuiPickersArrowSwitcher-root": {
        marginLeft: "-2px",
      },
      ".MuiPickersArrowSwitcher-button": {
        paddingRight: "7px",
      },
      ".MuiButtonBase-root.Mui-selected": {
        backgroundColor: App.color.main + " !important",
      },
      ".MuiPickersArrowSwitcher-button": {
        backgroundColor: App.color.main,
        ".MuiSvgIcon-root": {
          fill: "#FFF",
        },
      },
    },
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"th"}>
      <FormControl
        variant="standard"
        fullWidth
        sx={{
          "& .MuiFormLabel-root": {
            transform: "unset",
          },
          // marginTop: isGap ? "10px" : "0px",
          mt: 0,
          ...(Disabled
            ? {
              "& label": {
                color: App.color.textCaption,
              },
              "& .MuiInputAdornment-positionEnd button svg": {
                fill: "#d9d9d9 !important",
                color: "#d9d9d9 !important",
              }
            }
            : {}),
          "& input": {
            width: {
              sm: "110px",
              md: "110px",
              lg: "100%",
              xl: "150px",
              xxl: "180px",
            },
          },
          ...sx,
          "& .MuiPickersPopper-root": {},
          "& label": {
            position: "unset"
          },
        }}
      >
        {isLabel !== false ? (
          <Controlled.BootstrapInputLabel
            htmlFor={name}
            title={label || title}
            isRequired={isRequired}
            titleProp={titleProp}
          />
        ) : null}
        {isStatic ?
          <Box sx={{
            "& .MuiPickersToolbar-root , .MuiDialogActions-root  ": {
              display: "none !important"
            },
            "& .MuiPickersCalendarHeader-root": {
              display: "flex",
              alignItems: "center",
              justifyItems: "center",
            },
            "& .MuiPickersCalendarHeader-root:first-child": {
              order: 0,
              paddingRight: "20px",
              paddingLeft: "20px",
            },
            "& .MuiPickersArrowSwitcher-root": {
              display: "inline-flex",
              marginLeft: "-2px",
            },
            "& .MuiPickersCalendarHeader-label": {
              textAlign: "center",
            },
            "& .MuiPickersArrowSwitcher-spacer": {
              width: "220px",
            },
            "& .MuiPickersCalendarHeader-labelContainer": {
              display: "flex",
              position: "absolute",
              paddingLeft: "100px",
            },
            "& .MuiButtonBase-root.Mui-selected": {
              backgroundColor: App.color.main + " !important",
            },
            "& .MuiPickersArrowSwitcher-button": {
              paddingRight: "7px",
              backgroundColor: App.color.main,
              ".MuiSvgIcon-root": {
                fill: "#FFF",
              },
            },
            "& .MuiIconButton-edgeStart": {
              backgroundColor: Disabled ? "transparent" : App.color.main,
              "& svg": {
                display: Disabled ? "none" : ""
              }

            }
          }}>
            <StaticDatePicker
              width={"200px"}
              open={open}
              onOpen={() => setOpen(true)}
              onClose={() => setOpen(false)}
              label={title}
              inputFormat={inputFormat || "DD/MM/YYYY"}
              value={value || null}
              onChange={handleChange}
              maxDate={maxDate}
              minDate={minDate}
              disablePast={disablePast}
              disabled={Disabled || false}

            />
          </Box> :
          <DesktopDatePicker
            width={"200px"}
            open={open}
            onOpen={() => setOpen(true)}
            onClose={() => setOpen(false)}
            label={title}
            inputFormat={inputFormat || "DD/MM/YYYY"}
            value={value || null}
            onChange={handleChange}
            maxDate={maxDate}
            minDate={minDate}
            disablePast={disablePast}
            renderInput={(params) => (
              <BootstrapInput
                name={name}
                id={name}
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
            PaperProps={dateTimePaperPropsStyles}
            className={
              helperText !== null && helperText !== undefined ? "Mui-error" : ""
            }
            disabled={Disabled || false}
          />
        }


        <component.HelperText
          helperText={helperText}
          form={form}
          name={name}
        />

      </FormControl>
    </LocalizationProvider >
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
