import PropTypes from "prop-types";
import App from "components";
import React, { Fragment } from "react";
import { FormHelperText, } from "@mui/material";
const HelperText = ({ helperText, form, name }) => {
    return (
        <Fragment>
            <FormHelperText id={`label-error-${name}`}
                data-testid={`label-error-${name}`}
                sx={{ color: "red", ml: 0 }}>
                {form?.error?.[name]}
            </FormHelperText>
            {!App.service.isNullOrEmpty(helperText) &&
                App.service.isNullOrEmpty(form?.error?.[name]) ? (
                <FormHelperText
                    id="component-error-text"
                    sx={{ color: App.color.textCaption, ml: 0 }}
                >
                    {helperText}
                </FormHelperText>
            ) : null}
        </Fragment>
    )
}
HelperText.propTypes = {
    helperText: PropTypes.string,
    form: PropTypes.object,
    name: PropTypes.string,
};
export default HelperText