
import {
    Checkbox,
} from "@mui/material";
import color from "components/color";
const CheeckBoxUC = ({ checked }) => {
    return (
        <Checkbox
            checked={checked}
            sx={{
                "& .icon": {
                    color: color.main,
                    borderColor: color.gray + "!important",
                    borderRadius: "4px !important"
                },
                "&.Mui-checked .icon": {
                    borderColor: color.main + "!important",
                }
            }}
        />
    )
}



export default CheeckBoxUC