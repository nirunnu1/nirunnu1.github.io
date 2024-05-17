
import Radio from '@mui/material/Radio';
import color from "components/color";
const CheeckBoxUC = ({ checked }) => {
    return (
        <Radio
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