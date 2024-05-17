
import {
    Box,
    Checkbox, FormControlLabel, FormGroup,
} from "@mui/material";
import App from "components";
import color from "components/color";
const CheeckBoxGroupUC = ({ option, value, name,
    onChange, optionSetting, isEditOption = false,
    optionEdit, isEditlabel }) => {
    return (
        <FormGroup sx={{ mt: isEditlabel ? "55px" : 2 }}>
            {option.map((o, i) => {

                return o.type === "option" ? <FormControlLabel
                    key={i}
                    sx={{
                        ml: 0,
                        ...App.service.isNullOrEmpty(optionSetting) ? {} : {
                            "& .MuiTypography-root ": {
                                width: "100%"
                            }
                        }
                    }}
                    control={<Checkbox
                        checked={(value || [])
                            .includes(o.value)}
                        sx={{
                            "& .icon": {
                                color: color.main,
                                borderColor: color.gray + "!important",
                                borderRadius: "4px !important"
                            },
                            "&.Mui-checked .icon": {
                                borderColor: color.main + "!important",
                            }
                        }} />}
                    label={App.service.isNullOrEmpty(optionSetting) ? o.label : <Box
                        display={"flex"} justifyContent={"space-between"}
                        width={"100%"}>
                        <Box display={"flex"} alignItems={"center"}
                            width={"calc(100% - 50px)"}>

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
                        <Box display={"flex"} alignItems={"center"}
                            justifyContent={"end"} width={50}>
                            {optionSetting(o.value)}
                        </Box>
                    </Box>}
                    onChange={(e) => {
                        let _value = [...(value || [])]
                        if (e.target.checked) {
                            _value.push(o.value)
                        } else {
                            _value = _value.filter(v => v !== o.value)
                        }
                        onChange({
                            target: {
                                name: name,
                                value: _value
                            }
                        })
                    }}

                /> : (

                    !App.service.isNullOrEmpty(optionSetting) ?
                        <Box pl={1} display={"flex"} justifyContent={"space-between"}
                            width={"100%"}>
                            <Box width={"calc(100% - 65px)"}>
                                <App.Input
                                    name={(o.value).toString()}
                                    value={o.label}
                                    onChange={(e) => {
                                        optionEdit({
                                            name: o.value,
                                            value: e.value
                                        })
                                    }}
                                    placeholder="label"
                                />
                            </Box>
                            <Box display={"flex"} alignItems={"center"}
                                justifyContent={"center"} width={50}>
                                {optionSetting(o.value)}
                            </Box>
                        </Box> : <Box pl={1}>{o.label}</Box>
                )
            })}
        </FormGroup >
    )
}



export default CheeckBoxGroupUC