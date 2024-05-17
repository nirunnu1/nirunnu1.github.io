import App from "components";
import React from "react";
import {
    Box,
    InputLabel,
} from "@mui/material";
import { Fragment } from "react";
const BootstrapInputLabel = ({ name = "", htmlFor, title, isRequired
    , isEditlabel, editlabel, multiline, maxLength, value }) => {
    return (
        <InputLabel
            shrink={true}
            htmlFor={htmlFor}
            id={`label-${name}`}
            data-testid={`label-${name}`}
            sx={{
                color: App.color.black + "!important",
                fontSize: 14,
                display: "flex",
                fontWeight: "500 !important",
                height: isEditlabel ? "55px" : 30,
                width: "100%",
                alignItems: "center",
                transform: "unset !important"
            }}
        >
            {
                isEditlabel ? <Box display={"flex"}>
                    {/* <Box display={"flex"} alignItems={"center"} pr={1}>
                    {title}</Box> */}
                    < App.Input
                        name={"edit-label"}
                        value={title}
                        onChange={(e) => {
                            editlabel(e.value.trim())
                        }}
                        placeholder="option"
                    />
                    {
                        isRequired ? (
                            <Box pl={1} style={{
                                color: "red",
                                fontSize: 14, marginTop: "2px",
                                display: "flex",
                                alignItems: "center"
                            }} >
                                *
                            </Box >
                        ) : null}
                </Box > :
                    <Fragment>

                        {title}
                        {isRequired ? (
                            <Box sx={{
                                color: "red",
                                fontSize: App.text.size.md,
                                ml: "2px"
                            }}
                                component={"p"}>
                                *
                            </Box>
                        ) : null}
                        {multiline ?

                            <Box sx={{ position: "absolute", right: 0 }}>
                                <App.Label text={value.length + "/" + maxLength} size={12}
                                    color={App.color.gray} />
                            </Box> : null}
                    </Fragment>}

        </InputLabel >
    );
};

export default BootstrapInputLabel