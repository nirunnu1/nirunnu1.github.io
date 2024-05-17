/* eslint-disable array-callback-return */
import PropTypes from "prop-types";
import App from "components";
import React, { useState, Fragment, useContext } from "react";
import {
  Box,
  FormControl,
  InputBase,
  Autocomplete,
  TextField,
  // styles as styled
} from "@mui/material";

import { styled } from "@mui/material/styles";
import DialogImage from "components/dialog/image";
import lib from "./lib";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import component from "./component";


const BootstrapInput = styled(InputBase)(({ theme }) => ({
  "label + &": {
    // marginTop: "32px",
  },
  width: "inherit",
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
    width: "inherit",
    padding: "9px 16px",
    fontWeight: 300,
    "&:focus": {},
    "&.Mui-disabled": {
      backgroundColor: App.color.disabled,
    },
  },
  "& .MuiSvgIcon-root": {
    width: "50px"
  }
}));

const FormControlUC = (props) => {
  const {
    form,
    name,
    label,
    placeholder,
    isRequired,
    onChange,
    onKeyDown,
    disabled,
    endAdornment,
    startAdornment,
    readOnly,
    onClick,
    value,
    Control,
    parentId,
    dialogLabel,
    inputProps,
    type,
    fileName,
    helperText,
    isEditFile,
    maxlength,
    mindate,
    option,
    sx,
    onBlur,
    multiline = false,
    minRows = 0,
    onFocus,
    ref

  } = props;
  const InfoContext = useContext(App.Info.InfoContext);
  const EndAdornment = lib.FuncEndAdornment(Control);
  const [openImage, setOpenImage] = useState(false);
  const Dialog = lib.FuncDialog(Control);
  const [openDialog, setOpenDialog] = useState(false);
  const _form = form || InfoContext?.FormControl?.form || {}
  return (
    <Fragment>
      <FormControl
        variant="filled"
        fullWidth
        sx={{
          ...{
            "& .Mui-focused.MuiFormLabel-root": {
              color: App.color.main + " !important",
            },
            "& .Mui-focused svg": {
              color: App.color.main + " !important",
            },
            "& .MuiInputBase-root": {
              boxShadow: "unset",
            },
            "& .Mui-focused.MuiInputBase-root": {
              boxShadow: "unset",
              border: "1px solid " + App.color.main + " !important",
            },


            "& .MuiInputBase-input::placeholder": {
              color: App.color.gray + " !important",
            },
            "& .MuiInputBase-input::-webkit-input-placeholder": {
              color: App.color.gray + " !important",
            },
          },
          ...(disabled
            ? {
              "& .MuiFormLabel-root": {
                color: App.color.gray + " !important",
              },
              "& .MuiAutocomplete-endAdornment svg": {
                fill: "#d9d9d9 !important",
              },

            }
            : {}),
          ...sx,
          ...((Control || "").includes("_file_") &&
            !App.service.isNullOrEmpty(value)
            ? {
              "& .MuiInputBase-root": {
                display: "none",
              },
            }
            : {}),
          ...multiline ? {
            "& textarea, .MuiInputBase-root ": {
              borderRadius: "10px"
            }
          } : {},
          "& label.MuiFormLabel-root": {
            transform: "unset"
          },
          "& label": {
            position: "unset"
          },
        }}
      >
        {App.service.isNullOrEmpty(label) ? null : (
          <component.BootstrapInputLabel
            htmlFor={name}
            title={label}
            isRequired={isRequired}
            multiline={multiline}
            maxLength={maxlength || 250}
            value={value || _form?.[name] || ""}
            name={name}
          />
        )}
        {(Control || "").includes("_file_") &&
          !App.service.isNullOrEmpty(value) ? (
          <Box
            mt={3}
            display={"flex"}
            height={50}
            alignItems={"center"}
            p={2}
            justifyContent={"space-between"}
          >
            <Box
              display={"flex"}
              alignItems={"center"}
              onClick={() => setOpenImage(true)}
            >
              <Box pr={1}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M21.5625 11.25H15C14.4033 11.25 13.831 11.0129 13.409 10.591C12.9871 10.169 12.75 9.59674 12.75 9V2.4375C12.75 2.38777 12.7302 2.34008 12.6951 2.30492C12.6599 2.26975 12.6122 2.25 12.5625 2.25H10.0664C9.97886 2.08788 9.87689 1.93397 9.76172 1.79016C9.22125 1.11937 8.41828 0.75 7.5 0.75C5.73375 0.75 4.5 2.13797 4.5 4.125V10.875C4.5 12.0469 5.45344 12.75 6.375 12.75C6.62198 12.7527 6.86701 12.706 7.09571 12.6128C7.32442 12.5195 7.53219 12.3815 7.70684 12.2068C7.88149 12.0322 8.0195 11.8244 8.11277 11.5957C8.20604 11.367 8.2527 11.122 8.25 10.875V3.75C8.25 3.55109 8.17098 3.36032 8.03033 3.21967C7.88968 3.07902 7.69891 3 7.5 3C7.30109 3 7.11032 3.07902 6.96967 3.21967C6.82902 3.36032 6.75 3.55109 6.75 3.75V10.875C6.75163 10.9247 6.74305 10.9742 6.72478 11.0204C6.70651 11.0666 6.67895 11.1086 6.64379 11.1438C6.60864 11.1789 6.56665 11.2065 6.52041 11.2248C6.47418 11.243 6.42469 11.2516 6.375 11.25C6.27047 11.25 6 11.1825 6 10.875V4.125C6 3.21844 6.39422 2.25 7.5 2.25C8.89172 2.25 9 3.66328 9 4.09594V10.5998C9 11.4178 8.74359 12.1575 8.27766 12.6839C7.80469 13.2188 7.14703 13.5 6.375 13.5C5.60297 13.5 4.94531 13.2188 4.47234 12.6839C4.00641 12.1575 3.75 11.4178 3.75 10.5998V6.75C3.75 6.55109 3.67098 6.36032 3.53033 6.21967C3.38968 6.07902 3.19891 6 3 6C2.80109 6 2.61032 6.07902 2.46967 6.21967C2.32902 6.36032 2.25 6.55109 2.25 6.75V10.5998C2.25 13.0144 3.80578 14.8012 6 14.9841V20.25C6 21.0456 6.31607 21.8087 6.87868 22.3713C7.44129 22.9339 8.20435 23.25 9 23.25H18.75C19.5456 23.25 20.3087 22.9339 20.8713 22.3713C21.4339 21.8087 21.75 21.0456 21.75 20.25V11.4375C21.75 11.3878 21.7302 11.3401 21.6951 11.3049C21.6599 11.2698 21.6122 11.25 21.5625 11.25Z"
                    fill="#0066FF"
                  />
                  <path
                    d="M15 9.74998H21.0848C21.1033 9.7499 21.1214 9.74436 21.1367 9.73405C21.1521 9.72375 21.164 9.70913 21.1711 9.69205C21.1781 9.67497 21.18 9.65618 21.1764 9.63805C21.1728 9.61991 21.164 9.60324 21.1509 9.59013L14.4098 2.84904C14.3967 2.83601 14.3801 2.82714 14.3619 2.82356C14.3438 2.81997 14.325 2.82183 14.3079 2.82889C14.2908 2.83595 14.2762 2.84791 14.2659 2.86326C14.2556 2.8786 14.2501 2.89665 14.25 2.91513V8.99998C14.25 9.19889 14.329 9.38966 14.4697 9.53031C14.6103 9.67096 14.8011 9.74998 15 9.74998Z"
                    fill="#0066FF"
                  />
                </svg>
              </Box>
              <Box>
                <App.Label
                  text={fileName}
                  size={App.text.size.md}
                  color={App.color.textCaption}
                />
              </Box>
            </Box>

            <Box
              display={"flex"}
              alignItems={"center"}
              onClick={
                isEditFile !== false
                  ? () => {
                    setOpenDialog(true);
                    setTimeout(() => {
                      setOpenDialog(false);
                    }, 500);
                  }
                  : null
              }
            >
              {isEditFile !== false ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="19"
                  height="19"
                  viewBox="0 0 19 19"
                  fill="none"
                >
                  <path
                    d="M16.3 6.925L12.05 2.725L13.45 1.325C13.8333 0.941667 14.3043 0.75 14.863 0.75C15.4217 0.75 15.8923 0.941667 16.275 1.325L17.675 2.725C18.0583 3.10833 18.2583 3.571 18.275 4.113C18.2917 4.655 18.1083 5.11733 17.725 5.5L16.3 6.925ZM14.85 8.4L4.25 19H0V14.75L10.6 4.15L14.85 8.4Z"
                    fill="#ED4040"
                  />
                </svg>
              ) : null}
            </Box>
          </Box>
        ) : null}


        {(Control || "").includes("checkbox_group") ?
          <component.CheckBox.CheckBoxGroup option={option} value={value}
            name={name}
            onChange={onChange} />
          :
          (Control || "").includes("radio_group") ?
            <component.Radio.RadioGroup option={option} value={value}
              name={name}
              onChange={onChange} />
            : (Control || "").includes("Autocomplete") ?
              <Autocomplete
                ref={ref}
                sx={{
                  // mt: 3,
                  "& .MuiInputBase-root ": {
                    borderRadius: "40px",
                    padding: "0px !important",
                    "& input": {
                      padding: "9px 16px !important",
                      borderRadius: "40px",
                      backgroundColor: (disabled ? App.color.disabled : App.color.white)
                    }
                  },
                  // "& .MuiAutocomplete-endAdornment ": {
                  //   mt: "-5px"
                  // },
                  "& .MuiOutlinedInput-root.Mui-focused ": {
                    boxShadow: "unset"
                  }
                  , "& .MuiOutlinedInput-root fieldset ": {
                    border: "1px solid " + App.color.disabled
                  }
                  , "& .MuiOutlinedInput-root:hover ": {
                    "& fieldset": {
                      border: "1px solid " + (disabled ? App.color.disabled : App.color.main)
                    }
                  }
                  , "& .MuiOutlinedInput-root.Mui-focused fieldset ": {
                    border: "1px solid " + (disabled ? App.color.disabled : App.color.main)
                  },
                  "& .MuiAutocomplete-clearIndicator ": {
                    display: "none"
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "1px solid " + App.color.disabled + "!important"
                  },
                  "& .MuiAutocomplete-endAdornment  svg": {
                    fill: App.color.black
                  }


                }}
                id={name}
                name={name}
                popupIcon={<KeyboardArrowDownIcon
                  sx={{
                    color: App.color.textCaption,

                  }}
                />}
                size="small"
                options={option}
                getOptionLabel={(option) => option.label}
                defaultValue={value || _form?.[name] || null}
                value={value || _form?.[name] || null}
                filterSelectedOptions
                onChange={(e, v) => {
                  onChange({

                    name: name, value: v,
                    target: {
                      name: name, value: v,
                    }
                  })
                }}
                renderInput={(params) => {
                  if (!App.service.isNullOrEmpty(params?.inputProps?.ref?.current)) {
                    params?.inputProps?.ref?.current.setAttribute("data-testid", `autocomplete-${name}`);
                  }
                  return <TextField {...params} placeholder={placeholder} />
                }}
                disabled={disabled}
                data-testid={`autocomplete-${name}`}
              />
              :
              <BootstrapInput
                ref={ref}
                id={name}
                name={name}
                value={value || _form?.[name] || ""}
                onChange={(e) => onChange({ ...e, name: name, value: e.target.value })}
                onKeyDown={onKeyDown}
                type={type || "text"}
                placeholder={
                  App.service.isNullOrEmpty(placeholder) ? label : placeholder
                }
                multiline={multiline}
                minRows={minRows}
                disabled={disabled || false}
                readOnly={readOnly || false}
                endAdornment={endAdornment || EndAdornment}
                startAdornment={startAdornment}
                inputProps={{ ...{ "data-testid": `input-${name}` }, ...inputProps }}
                maxLength={maxlength || 250}
                onBlur={onBlur}
                onFocus={onFocus}
                onClick={
                  !App.service.isNullOrEmpty(Control)
                    ? Control.includes("select_")
                      ? () => setOpenDialog(!openDialog)
                      : onClick
                    : onClick
                }


              />
        }

        <component.HelperText
          helperText={helperText}
          form={_form}
          name={name}
        />
      </FormControl>
      {App.service.isNullOrEmpty(Dialog) ? null : (
        <Dialog
          open={openDialog}
          selectedValue={_form[name]}
          onClose={(e) => {
            setOpenDialog(false);
            onChange({
              name: name,
              value: e,
              target: {
                name: name,
                value: e,
              },
            });
          }}
          dialogLabel={dialogLabel}
          parentId={parentId}
          mindate={mindate}
        // maxdate={maxdate}
        />
      )}
      {(Control || "").includes("_file_") &&
        !App.service.isNullOrEmpty(value) ? (
        <DialogImage
          onClose={() => setOpenImage(false)}
          open={openImage}
          url={value}
        />
      ) : null}
    </Fragment>
  );
};
FormControlUC.propTypes = {
  title: PropTypes.string,
  label: PropTypes.any,
  isLabel: PropTypes.bool,
  name: PropTypes.string,
  isTitle: PropTypes.bool,
  onChange: PropTypes.func,
  value: PropTypes.any,
  maxRows: PropTypes.number,
  disabled: PropTypes.bool,
  multiline: PropTypes.bool,
  maxlength: PropTypes.number,
  type: PropTypes.string,
  titleProp: PropTypes.element,
  placeholder: PropTypes.string,
  isRequired: PropTypes.bool,
  isGap: PropTypes.bool,
  onKeyDown: PropTypes.func,
  readOnly: PropTypes.bool,
  autoComplete: PropTypes.bool,
  sx: PropTypes.object,
  isNumber: PropTypes.bool,
  form: PropTypes.object,
  Control: PropTypes.any
};
const FocusError = (error) => {
  try {
    const _error = Object.keys(error)[0]
    Object.keys(error).map(e => {
      console.warn(`[undefined service] : An error occurred ${e} ${error[e]}`)
    })
    document.getElementById(_error).focus()
    document.getElementById(_error).click()
  } catch {
    console.warn(`[undefined service] : An error occurred func[FocusError]`)
  }
}
const All = {
  ...lib,
  ...component,
  FormControl: FormControlUC,
  FocusError
};
export default All;
