import App from "components";
import React from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

const funcEndAdornment = (Control) => {
    if (App.service.isNullOrEmpty(Control)) {
        return null
    } else {
        if (Control.includes("_address_")
            || Control.includes("_title_")
            || Control.includes("_titleDoctors_")
            || Control.includes("_bank_")) {
            return <KeyboardArrowDownIcon
            // sx={{
            //     color: App.color.textCaption,
            //     fontSize: "2rem",
            // }}
            />
        } else if (Control.includes("_date_")) {
            return <CalendarMonthIcon
                sx={{
                    color: App.color.textCaption,
                    fontSize: "2rem",
                }}
            />
        } else {
            return null
        }

    }
}
export default funcEndAdornment