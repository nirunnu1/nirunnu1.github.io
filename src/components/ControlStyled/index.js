import App from "components";
import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
const BootstrapInput = styled(InputBase)(({ theme }) => ({
    "label + &": {
        // marginTop: theme.spacing(3),
        transform: "unset",
    },
    width: "inherit",
    backgroundColor: App.color.white,
    borderRadius: "40px",
    border: "1px solid #BBBFCC",
    "&.Mui-disabled": {
        borderColor: App.color.disabled,
        backgroundColor: App.color.disabled,
    },
    "& .MuiInputBase-input": {
        borderRadius: "40px !important",
        position: "relative",
        fontSize: 14,
        width: "inherit",
        padding: "10px 12px",
        "&:focus": {},
        "&.Mui-disabled": {
            "-webkit-text-fill-color": App.color.grayFont,
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

export default BootstrapInput