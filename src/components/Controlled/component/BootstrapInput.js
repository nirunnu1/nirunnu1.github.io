import App from "components";
import { styled } from "@mui/material/styles";
import {
    InputBase,
} from "@mui/material";
const BootstrapInput = styled(InputBase)(({ theme }) => ({
    "label + &": {
        marginTop: theme.spacing(3),
    },
    width: "inherit",
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
        fontSize: 16,
        width: "inherit",
        padding: "10px 12px",
        "&:focus": {
        },
        "&.Mui-disabled": {
            backgroundColor: App.color.gray,
        },
    },
}));

