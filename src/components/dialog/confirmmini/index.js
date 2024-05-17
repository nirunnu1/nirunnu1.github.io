import * as React from "react";
import PropTypes from "prop-types";
import Dialog from "@mui/material/Dialog";
import App from "components";
import { Box } from "@mui/material";
import icon from "../icon";
const defaulticon = icon.closeRed;
const DialogConfirmMini = (props) => {
  const {
    open,
    icon,
    label,
    callbackDisagree,
    callbackAgree,
    disagreeText,
    agreeText,
    content,
    content1,
    isDisagree,
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
            textAlign={"center"}
          >
            <Box
              pr={1}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              {_icon}
            </Box>
            <Box>
              <App.Label
                text={label || "บันทึกเรียบร้อย"}
                size={App.text.size.lg}
                textAlign="left"
                fontWeight={"500"}
              />
              <App.Label
                mt={1}
                text={content || "บันทึกเรียบร้อย"}
                size={App.text.size.smm}
                textAlign="left"
                fontWeight={"300"}
              />
              {!App.service.isNullOrEmpty(content1) ? (
                <App.Label text={content1} size={App.text.size.smm}
                  textAlign="left"
                  fontWeight={"300"} />
              ) : null}
            </Box>
          </Box>
          <Box
            mb={1}
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
            width={"100%"}
          >
            {isDisagree !== false ? (
              <Box width={"48%"}>
                <App.Button
                  label={disagreeText || "ละทิ้ง"}
                  fullWidth
                  onClick={Disagree}
                  sx={{
                    backgroundColor: App.color.white,
                    color: App.color.main,
                    border: "1px solid " + App.color.main,
                    "&.MuiButton-root": {
                      "&:hover": {
                        bgcolor: App.color.white,
                      },
                    },
                  }}
                />
              </Box>
            ) : null}
            <Box width={isDisagree === false ? "100%" : "48%"}>
              <App.Button
                label={agreeText || "ยืนยัน"}
                fullWidth
                onClick={Agree}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </Dialog>
  );
};

DialogConfirmMini.propTypes = {
  open: PropTypes.bool.isRequired,
  icon: PropTypes.any,
  label: PropTypes.string,
  callbackDisagree: PropTypes.func,
  callbackAgree: PropTypes.func,
  disagreeText: PropTypes.string,
  agreeText: PropTypes.string,
};
export default DialogConfirmMini;
