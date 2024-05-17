import * as React from "react";
import PropTypes from "prop-types";
import Dialog from "@mui/material/Dialog";
import App from "components";
import { Box } from "@mui/material";
import icon from "../icon";
import Slide from '@mui/material/Slide';
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const defaulticon = icon.closeRed;
const DialogConfirm = (props) => {
  const {
    open,
    icon,
    label,
    callbackDisagree,
    callbackAgree,
    disagreeText,
    agreeText,
    label1,
    customLabel,
    themes = "default"
  } = props;
  const [Open, setOpen] = React.useState(false);
  const _icon = App.service.isNullOrEmpty(icon) ? defaulticon : icon;

  const Disagree = () => {
    setOpen(false);
    if (callbackDisagree !== undefined) {
      setTimeout(() => {
        callbackDisagree();
      }, 200);
    }
  };
  const Agree = () => {
    setOpen(false);
    if (callbackAgree !== undefined) {
      callbackAgree();
    }
  };

  React.useEffect(() => {
    setOpen(open);
  }, [open]);

  return (
    <Dialog
      onClose={Disagree}
      open={Open}
      sx={{
        "& .MuiPaper-root": {
          width: "100%",
          maxWidth: "300px",
          borderRadius: "10px",
        },
      }}
      TransitionComponent={Transition}
    >
      <Box
        width={"300px"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Box width={"320px"} p={2}>
          <Box
            mb={2}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            {_icon}
          </Box>
          <Box
            mb={2}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            textAlign={"center"}
          >
            <Box>
              <App.Label text={label || ""} size={24} />
              {!App.service.isNullOrEmpty(label1) ? (
                <App.Label text={label1} size={24} />
              ) : null}
              {customLabel}
            </Box>
          </Box>
          <Box
            mb={1}
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
            width={"100%"}
          >
            <Box width={"49%"}>
              <App.Button
                label={disagreeText || "ละทิ้ง"}
                fullWidth
                onClick={Disagree}
                sx={{
                  backgroundColor: App.color.white,
                  color: (themes === "default" ? App.color.main : App.color.error),
                  border: "1px solid " + (themes === "default" ? App.color.main : App.color.error),
                  "&.MuiButton-root": {
                    "&:hover": {
                      bgcolor: App.color.white,
                    },
                  },
                }}
              />
            </Box>
            <Box width={"49%"}>
              <App.Button
                label={agreeText || "ยืนยัน"}
                fullWidth
                onClick={Agree}
                sx={{
                  border: "1px solid " + (themes === "default" ? App.color.main : App.color.error),
                  backgroundColor: (themes === "default" ? App.color.main : App.color.error),
                  "&.MuiButton-root": {
                    "&:hover": {
                      bgcolor: (themes === "default" ? App.color.main : App.color.error),
                    },
                  },
                }}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </Dialog>
  );
};

DialogConfirm.propTypes = {
  open: PropTypes.bool.isRequired,
  icon: PropTypes.any,
  label: PropTypes.string,
  callbackDisagree: PropTypes.func,
  callbackAgree: PropTypes.func,
  disagreeText: PropTypes.string,
  agreeText: PropTypes.string,
};
export default DialogConfirm;
