import PropTypes from "prop-types";
import { alpha, styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import Label from "../Base/Label";
import color from "../color";
import { Box } from "@mui/material";
import service from "undefined-service-web";
import InputLabel from "@mui/material/InputLabel";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import { FileUploader } from "react-drag-drop-files";
import App from "components";
const BootstrapInput = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(3),
  },
  "& .MuiInputBase-input": {
    height: "20px",
    padding: "5px 5px",
    boxSizing: "content-box",

    borderRadius: 4,
    position: "relative",
    color: color.main,
    border: "1px solid " + color.main,
    backgroundColor: "#FFF",
    fontSize: 16,
    transition: theme.transitions.create([
      "border-color",
      "background-color",
      "box-shadow",
    ]),
    "& .MuiInputBase-input.Mui-disabled.View-image": {
      WebkitTextFillColor: "blue",
    },
    // Use, the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
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
  },
  "& textarea": {
    height: "60px !important",
  },
}));
const inputUC = (props) => {
  const {
    title,
    name,
    isTitle,
    onChange,
    value,
    helperText,
    type,
    maxlength = 4000,
    multiline,
    maxRows,
    // disabled,
    isLabel,
  } = props;
  const Change = (e) => {
    onChange({
      name: name,
      value: e.target.value,
      // type === "tel"
      //   ? service.FormatPhone(e.target.value)
      //   :
      // type === "Identity"
      // ? service.FormatThaiNationalID(e.target.value)
      // : e.target.value,
    });
    // console.log(formatPhoneNumber(e.target.value));
  };
  return (
    <FormControl variant="standard" fullWidth>
      {isLabel !== false ? (
        <InputLabel shrink htmlFor={name} style={{ transform: "none" }}>
          <Label
            text={isTitle !== false ? title : ""}
            size={16}
            fontWeight="bold"
            color={helperText !== null && helperText !== undefined ? "red" : ""}
          />
        </InputLabel>
      ) : null}
      <BootstrapInput
        className={service.isNullOrEmpty(value) ? "" : " View-image "}
        placeholder={title}
        id={name}
        onChange={Change}
        value={service.isNullOrEmpty(value) ? "" : "View"}
        type={type || "text"}
        error={helperText !== null && helperText !== undefined}
        maxlength={maxlength || 4000}
        multiline={multiline || false}
        maxRows={maxRows || 1}
        disabled={true}
        endAdornment={
          <FileUploader
            multple={false}
            handleChange={(e) => {
              if (
                e.type.toLowerCase().includes("png") ||
                e.type.toLowerCase().includes("jpeg")
              ) {
                // console.log(e);
                service.getBase64(e, (result) => {
                  console.log(result);
                  onChange({ name: name, value: result });
                });
              } else {
              }
            }}
            name="image"
            types={["JPGE", "PNG"]}
          >
            <Box
              sx={{
                height: "32px",
                width: "100px",
                borderRadius: "10px",
                marginLeft: 1,
                backgroundColor: color.main,
                // borderRadius: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Label text="Browse" size={App.text.size.xl} color={"#FFF"} />
            </Box>
          </FileUploader>
        }
      />

      <FormHelperText id="component-error-text" style={{ color: "red" }}>
        {helperText}
      </FormHelperText>
    </FormControl>
  );
};

inputUC.propTypes = {
  title: PropTypes.string,
  name: PropTypes.string,
  isTitle: PropTypes.bool,
  onChange: PropTypes.func,
  value: PropTypes.any,
  maxRows: PropTypes.number,
  disabled: PropTypes.bool,
  multiline: PropTypes.bool,
  maxlength: PropTypes.number,
  type: PropTypes.string,
};
export default inputUC;
