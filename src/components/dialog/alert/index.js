/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react";
import PropTypes from "prop-types";
import Dialog from "@mui/material/Dialog";
import App from "components";
import { Box } from "@mui/material";
import Slide from '@mui/material/Slide';
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const DialogAlert = (props) => {
  const { open, icon, label, autoClose = true, callback,
    done = false,
    autoCloseTime = 3000,
    label1 } = props;
  const [Open, setOpen] = React.useState(open)
  const [Done, setdone] = React.useState(done)
  const _icon = App.service.isNullOrEmpty(icon) ? null : icon
  const handleLeaveTimeout = React.useRef();
  const AutoClose = () => {
    if (autoClose && Open) {
      handleLeaveTimeout.current = setTimeout(() => {
        setOpen(false)
        setdone(true)
        callback()
      }, autoCloseTime);
    }
  }
  const handleClose = () => {
    if (callback !== undefined) {
      callback()
    }
    clearTimeout(handleLeaveTimeout.current)
    setOpen(false)
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    // setdone
  }
  React.useEffect(() => {
    if (Done) {
      if (callback !== undefined) {
        callback()
      }
    }
  }, [Done])

  React.useEffect(() => {
    AutoClose()
  }, [Open])
  React.useEffect(() => {
    setOpen(open)
  }, [open])

  return (
    <Dialog
      onClose={handleClose}
      open={Open}
      TransitionComponent={Transition}
      sx={{ "& .MuiPaper-root": { width: "100%", maxWidth: "300px", borderRadius: "10px" } }}
    >
      <Box width={"300px"} height="250px" display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Box  >
          <Box mb={2} display={"flex"}
            justifyContent={"center"}
            alignItems={"center"} >
            {_icon}
          </Box>
          <Box p={2} sx={{ textAlign: "center" }}>
            <App.Label text={label || ""} size={App.text.size.xl} fontWeight="500" />
            {App.service.isNullOrEmpty(label1) ? null :
              <App.Label text={label1 || ""} size={14} fontWeight="300"
                color={App.color.gray} />}
          </Box>


        </Box>

      </Box>

    </Dialog>
  );
}


DialogAlert.propTypes = {
  open: PropTypes.bool.isRequired,
  icon: PropTypes.any,
  label: PropTypes.string,
  autoClose: PropTypes.bool,
  callback: PropTypes.func,
};
export default DialogAlert;
