import { FileUploader } from "react-drag-drop-files";
import service from "undefined-service-web";
import { Box } from "@mui/material";
import Label from "../Base/Label";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import App from "components";
import { useDispatch } from "react-redux";
import { setDialog } from "../../store/reducers/actions";
import { useState } from "react";
const FileUploaderUC = (props) => {
  const dispatch = useDispatch();
  const [confirm, setConfirm] = useState({ open: false });
  const {
    value,
    onChange,
    name,
    title,
    mx,
    my,
    footerText,
    width,
    height,
    permission,
    boxWidth,
    boxHeight,
    emptyView,
    imgView,
    disabled
  } = props;
  const Img = (props) => {
    const [URI, setURI] = useState(null)
    return (
      <img loading="lazy"
        style={{
          width: boxWidth || "100px",
          height: boxHeight || "100px",
          objectFit: "contain",
        }}
        src={URI}
        onError={(e) => {
          // "this.onerror=null;this.src='/images/Defult_Photo.png';"
          setURI("./images/Defult_Photo.png")

        }}
        alt="Defult_Photo"
      ></img>
    );
  };

  return (
    <Box mx={mx} my={my} sx={{
      position: "relative"
    }}>
      <Label text={title} size={16} fontWeight="bold" />
      <Box className="Tool" sx={{
        position: "absolute",
        borderRadius: "10px",
        display: App.service.isNullOrEmpty(value) ? "none" : "flex",
        zIndex: "9999",
        right: 0,
        "&:hover": {
          opacity: 0.8
        }
      }}>
        <Box sx={{ cursor: "pointer", p: 1 }} onClick={() => {
          setConfirm({
            open: true,
            label: "ยืนยันลบรูป",
            callbackAgree: async () => {
              setConfirm({ open: false })
              onChange({ name: name, value: null });
            },
          });

        }}>
          <svg width="25" height="25" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.5 29C9.5 30.65 10.85 32 12.5 32H24.5C26.15 32 27.5 30.65 27.5 29V11H9.5V29ZM29 6.5H23.75L22.25 5H14.75L13.25 6.5H8V9.5H29V6.5Z"
              fill={App.color.error} />
          </svg>
        </Box>
      </Box>
      <FileUploader
        multple={false}
        disabled={disabled || permission === false ||
          !App.service.isNullOrEmpty(value)}
        handleChange={(e) => {
          let size = e.size
          if (
            App.service.isNullOrEmpty(width) &&
            App.service.isNullOrEmpty(height)
          ) {

            let _URL = window.URL || window.webkitURL;
            let img = new Image();
            var objectUrl = _URL.createObjectURL(e);
            img.onload = function () {
              let width = this.width
              let height = this.height
              service.getBase64(e, (result) => {

                onChange({
                  name: name, value: result, ...e,
                  width,
                  height,
                  size
                });
              });
              _URL.revokeObjectURL(objectUrl);
            };
            img.src = objectUrl;
          } else {
            let _URL = window.URL || window.webkitURL;
            let img = new Image();
            var objectUrl = _URL.createObjectURL(e);

            img.onload = function () {
              if (this.width !== width) {
                dispatch(
                  setDialog({
                    open: true,
                    title: "warning !",
                    description: "width " + width + "px",
                  })
                );
              } else if (this.height !== height) {
                dispatch(
                  setDialog({
                    open: true,
                    title: "warning !",
                    description: "height " + height + "px",
                  })
                );
              } else {
                service.getBase64(e, (result) => {
                  onChange({ name: name, value: result, e });
                });
              }
              _URL.revokeObjectURL(objectUrl);
            };
            img.src = objectUrl;
          }
          // } else {
          // }
        }}

        name="image"
        types={["jpeg", "jpg", "png"]}
      // className="FileUploader"
      >
        <Box className={"dropfile" + (value ? " error" : "")}>
          <Box
            className={
              "dropfile-body " + (service.isNullOrEmpty(value) ? "" : "image")
            }
          >
            {service.isNullOrEmpty(value) ? (
              App.service.isNullOrEmpty(emptyView) ?
                <Box
                  style={{
                    border: "1px dashed " + App.color.main,
                    width: boxWidth || "100px",
                    height: boxHeight || "100px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <AddCircleOutlineIcon
                    style={{ fontSize: 35, color: App.color.main }}
                  />
                </Box> : emptyView
            ) : (

              App.service.isNullOrEmpty(imgView) ?
                <img loading="lazy" boxWidth={boxWidth} value={value} /> :
                imgView
            )}
          </Box>
        </Box>
        <App.Label text={footerText} size={14} textAlign="center" />
      </FileUploader>
      <App.Dialog.Confirm
        open={confirm.open}
        label={confirm.label}
        icon={App.Dialog.Icon.exclamationRed}
        callbackDisagree={() => setConfirm({ open: false })}
        callbackAgree={confirm.callbackAgree}
        disagreeText={"ปิด"}
        agreeText={"ยืนยัน"}
        customLabel={<App.Label text={
          "ต้องการลบรูปภาพหรือไม่"}
          size={14}
          color={App.color.gray} />}
        themes="error"
      />

    </Box >
  );
};
export default FileUploaderUC;
