import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";

import { FormControlLabel, FormControl, FormHelperText }
  from "@mui/material";

import App from "components";
import InputLabel from "@mui/material/InputLabel";
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
export default function RowRadioButtonsGroup(props) {
  const { title, label, name, data, onChange, value, disabled,
    row, isLabel, isRequired, titleProp,
    form } = props;
  const handleChange = (event, value) => {
    onChange({ name: name, value: event.target.value });
  };
  return (
    <FormControl variant="standard"
      fullWidth
      sx={{
        "& .MuiFormLabel-root": {
          transform: "unset",
        },
        "& label": {

          position: "unset"
        },
        ...(disabled
          ? {
            "& label": {
              color: App.color.textCaption,
              position: "unset"
            },
          }
          : {}),
        "& .Mui-checked": {
          color: App.color.main + "!important"
        }
      }}>

      {isLabel !== false ? (
        <BootstrapInputLabel
          htmlFor={name}
          title={label || title}
          isRequired={isRequired}
          titleProp={titleProp}
        />
      ) : null}

      <RadioGroup
        row={row === false ? false : true}
        aria-labelledby="demo-row-radio-buttons-group-label"
        name={name}
        onChange={handleChange}
        value={value}
        disabled={disabled || false}
      >
        {[...data].map((e, i) => {
          return (
            <FormControlLabel
              key={i}
              value={e.value}
              control={<Radio />}
              label={e.text}
              disabled={disabled || false}
            />
          );
        })}
      </RadioGroup>
      <FormHelperText
        id="component-error-text"
        sx={{ color: "red", ml: 0, height: "15px", mt: "-5px" }}
      >
        {form?.error?.[name]}
      </FormHelperText>
    </FormControl>
  );
}
