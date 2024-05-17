import * as React from "react";
import PropTypes from "prop-types";
import App from "components";
import { FileUploader } from "react-drag-drop-files";
import { Box } from "@mui/material";

function DialogFile(props) {
  const { onClose, open, size_image } = props;
  const FileUploaderRef = React.useRef(null);
  const [alert, setAlert] = React.useState({ open: false });
  React.useEffect(() => {
    if (open) {
      FileUploaderRef.current.children[0].click();
    }
  }, [open]);

  return (
    <>
      <Box ref={FileUploaderRef} display={"none"}>
        <FileUploader
          multple={false}
          handleChange={(e) => {
            console.log(e);
            if (size_image) {
              if (e.size <= size_image) {
                App.service.getBase64(e, (result) => {
                  onClose(result);
                });
              } else {
                setAlert({
                  label: "ไม่สามารถอัปโหลดได้เนื่องจากไฟล์มีขนาดใหญ่",
                  open: true,
                  icon: App.Dialog.Icon.exclamationRed,
                  callback: () => setAlert({ ...alert, open: false }),
                });
              }
            } else {
              App.service.getBase64(e, (result) => {
                onClose(result);
              });
            }
          }}
          name="image"
        />
      </Box>
      <App.Dialog.Alert
        open={alert.open}
        callback={alert.callback}
        label={alert.label}
        icon={alert.icon}
      />
    </>
  );
}

DialogFile.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};
export default DialogFile;
