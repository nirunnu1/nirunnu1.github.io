
import {
    Radio, FormControlLabel, RadioGroup, Box,
} from "@mui/material";
import App from "components";
import color from "components/color";
const RadioGroupUC = ({ option, value, name,
    onChange, optionSetting, isEditOption = false,
    optionEdit, isEditlabel
}) => {
    return (
        <RadioGroup sx={{ mt: isEditlabel ? "55px" : 2 }}
            value={value}
            onChange={(e) => {
                onChange({
                    target: {
                        name: name,
                        value: e.target.value
                    }
                })
            }}
        >
            {option.map((o, i) => {
                return <FormControlLabel
                    key={i}
                    sx={{
                        ml: 0,
                        ...App.service.isNullOrEmpty(optionSetting) ? {} : {
                            "& .MuiTypography-root ": {
                                width: "100%"
                            }
                        }
                    }}
                    value={(o.value).toString()}
                    control={<Radio
                        sx={{
                            "& .icon": {
                                color: color.main,
                                borderColor: color.gray + "!important",
                            },
                            "&.MuiButtonBase-root:hover": {
                                bgcolor: "unset !important",
                            },
                            "&.Mui-checked .icon": {
                                borderColor: color.main + "!important",
                            },
                            "& .dot": {
                                bgcolor: color.main + "!important",
                            }
                        }} />}
                    label={App.service.isNullOrEmpty(optionSetting) ? o.label : <Box
                        display={"flex"} justifyContent={"space-between"}
                        width={"100%"}>
                        <Box display={"flex"} alignItems={"center"}>

                            {isEditOption ?
                                <App.Input
                                    name={(o.value).toString()}
                                    value={o.label}
                                    onChange={(e) => {
                                        optionEdit({
                                            name: o.value,
                                            value: e.value
                                        })
                                    }}
                                    placeholder="option"
                                />
                                : o.label}
                        </Box>
                        <Box display={"flex"} alignItems={"center"}>
                            {optionSetting(o.value)}
                        </Box>
                    </Box>}

                />
            })}
        </RadioGroup>
    )
}



export default RadioGroupUC