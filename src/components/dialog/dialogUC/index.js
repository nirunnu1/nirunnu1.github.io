import * as React from "react";
import PropTypes from "prop-types";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import App from "components";
import Slide from '@mui/material/Slide';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const TransitionR = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
});


const DialogUC = (props) => {
    const { onClose, open, label, sx, children, maxWidth,
        fullWidth = false, transition = "up",
        isTitle = true } = props;
    return (
        <Dialog
            onClose={onClose}
            open={open}
            sx={sx}
            maxWidth={maxWidth}
            fullWidth={fullWidth}
            TransitionComponent={transition === "up" ? Transition : TransitionR}

        >
            {isTitle && <DialogTitle
                sx={{
                    width: "100%",
                    height: "60px",
                    backgroundColor: App.color.main,
                    zIndex: 99
                }}
            >
                <App.Label text={label}
                    size={App.text.size.xl}
                    fontWeight="500"
                    color={App.color.white} />
            </DialogTitle>}
            {children}
        </Dialog>
    );
}

DialogUC.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    label: PropTypes.string,
    sx: PropTypes.object,
    maxWidth: PropTypes.string,
    fullWidth: PropTypes.bool
};
export default DialogUC;
