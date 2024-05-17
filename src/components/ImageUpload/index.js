import { FileUploader } from "react-drag-drop-files";
import service from "undefined-service-web";
import { Box } from "@mui/material";
import Label from "../Base/Label";
import App from "components";

import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import EmptyPicture from "assets/images/empty/empty.jpg";

const FileUploaderUC = (props) => {

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
    // permission,
    boxWidth,
    boxHeight,
    onClickDelete,
    index,
    sizeText = "Maximum size is 285 x 719 px",
    maxSize = 10000000,
  } = props;
  const Img = (props) => {
    const [URI, setURI] = useState(props.value);
    return (
      <>
        <img loading="lazy"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "fill",
            borderRadius: "10px",
          }}
          src={URI}
          onError={(e) => {
            // "this.onerror=null;this.src='/images/Defult_Photo.png';"
            setURI(EmptyPicture);
          }}
          alt="Defult_Photo"
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
        ></img>
      </>
    );
  };

  const [isHovering, setIsHovering] = useState(false);

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };
  const [alert, setAlert] = useState({ open: false });
  return (
    <>
      <Box mx={mx} my={my} sx={{ height: "100%" }}>
        <Label text={title} size={16} fontWeight="bold" />
        <FileUploader
          multple={false}
          // disabled={permission === false}
          handleChange={(e) => {
            // console.log(e);
            // console.log(maxSize);

            if (e.size > maxSize && maxSize !== 0) {
              setAlert({
                open: true,
                icon: App.Dialog.Icon.exclamationRed,
                label:
                  "ไฟล์มีขนาดใหญ่เกินไป กรุณา Upload ไฟล์ที่มีขนาดไม่เกิน 285 * 719 px และไม่เกิน 5 MB",
                callback: () => setAlert({ ...alert, open: false }),
              });
            } else if (
              e.type.toLowerCase().includes("png") ||
              e.type.toLowerCase().includes("jpeg")
            ) {
              if (
                App.service.isNullOrEmpty(width) &&
                App.service.isNullOrEmpty(height)
              ) {
                service.getBase64(e, (result) => {
                  onChange({ name: name, value: result, index: index });
                });
              } else {
                let _URL = window.URL || window.webkitURL;
                let img = new Image();
                var objectUrl = _URL.createObjectURL(e);
                img.onload = function () {
                  if (this.width <= width) {
                    setAlert({
                      open: true,
                      icon: App.Dialog.Icon.exclamationRed,
                      label:
                        "ไฟล์มีขนาดใหญ่เกินไป กรุณา Upload ไฟล์ที่มีขนาดไม่เกิน 285 * 719 px และไม่เกิน 5 MB",
                      callback: () => setAlert({ ...alert, open: false }),
                    });
                  } else if (this.height <= height) {
                    // dispatch(
                    //   setDialog({
                    //     open: true,
                    //     title: "warning !",
                    //     description: "height " + height + "px",
                    //   })
                    // );
                    setAlert({
                      open: true,
                      icon: App.Dialog.Icon.exclamationRed,
                      label:
                        "ไฟล์มีขนาดใหญ่เกินไป กรุณา Upload ไฟล์ที่มีขนาดไม่เกิน 285 * 719 px และไม่เกิน 5 MB",
                      callback: () => setAlert({ ...alert, open: false }),
                    });
                  } else {
                    service.getBase64(e, (result) => {
                      onChange({ name: name, value: result, index: index });
                    });
                  }
                  _URL.revokeObjectURL(objectUrl);
                };
                img.src = objectUrl;
              }
            }

          }}
          name="image"
          types={["JPGE", "JPG", "WEBP", "PNG"]}
          disabled={service.isNullOrEmpty(value) ? false : true}
        >
          <Box
            className={"dropfile" + (value ? " error" : "")}
            style={{
              height: "310px",
            }}
          >
            <Box
              className={
                "dropfile-body " + (service.isNullOrEmpty(value) ? "" : "image")
              }
              style={{
                width: "100%",
                height: "100%",
                border: service.isNullOrEmpty(value)
                  ? "1px dashed  var(--text-color-text-caption, #B8B9BA)"
                  : "none",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "10px",
              }}
            >
              {service.isNullOrEmpty(value) ? (
                <Box
                  style={{
                    // width: boxWidth || "100px",
                    // height: boxHeight || "100px",
                    flexDirection: "column",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="57"
                    height="56"
                    viewBox="0 0 57 56"
                    fill="none"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M44.0782 19.0022H40.2657C39.7415 19.0022 39.3126 18.5733 39.3126 18.049V13.2834H37.7971C36.9488 13.2834 36.5295 12.254 37.1299 11.6536L41.5048 7.27874C41.5929 7.19038 41.6977 7.12028 41.813 7.07245C41.9283 7.02462 42.0519 7 42.1767 7C42.3015 7 42.4252 7.02462 42.5405 7.07245C42.6558 7.12028 42.7605 7.19038 42.8487 7.27874L47.2235 11.6536C47.824 12.254 47.3951 13.2834 46.5468 13.2834H45.0313V18.049C45.0313 18.5733 44.6024 19.0022 44.0782 19.0022ZM47.8907 20.9084H36.4532C35.929 20.9084 35.5001 21.3373 35.5001 21.8615C35.5001 22.3858 35.929 22.8147 36.4532 22.8147H47.8907C48.4149 22.8147 48.8438 22.3858 48.8438 21.8615C48.8438 21.3373 48.4149 20.9084 47.8907 20.9084ZM10.1229 12.2486H33.3946V22.476C33.3946 23.7647 34.4393 24.8093 35.7279 24.8093H49.4993V46.3748C49.4993 47.071 49.2227 47.7387 48.7304 48.231C48.2381 48.7233 47.5704 48.9999 46.8742 48.9999H10.1229C9.42668 48.9999 8.75898 48.7233 8.26667 48.231C7.77437 47.7387 7.4978 47.071 7.4978 46.3748V14.8737C7.4978 14.1775 7.77437 13.5097 8.26667 13.0174C8.75898 12.5251 9.42668 12.2486 10.1229 12.2486ZM16.5806 17.4988C17.3594 17.4988 18.1207 17.7297 18.7683 18.1624C19.4158 18.5951 19.9205 19.21 20.2185 19.9295C20.5166 20.649 20.5945 21.4408 20.4426 22.2046C20.2907 22.9684 19.9157 23.6701 19.365 24.2207C18.8143 24.7714 18.1127 25.1465 17.3488 25.2984C16.585 25.4503 15.7933 25.3723 15.0738 25.0743C14.3542 24.7763 13.7393 24.2716 13.3066 23.624C12.8739 22.9765 12.643 22.2152 12.643 21.4364C12.643 20.3921 13.0578 19.3905 13.7963 18.6521C14.5347 17.9136 15.5363 17.4988 16.5806 17.4988ZM12.748 42.4372V37.0557L20.6233 29.0754C20.8692 28.831 21.2019 28.6938 21.5486 28.6938C21.8954 28.6938 22.228 28.831 22.474 29.0754L25.8735 32.3962L15.7931 42.4372H12.748ZM44.2491 42.4372H19.5076L27.6848 34.26L34.7725 27.1722C35.0185 26.9278 35.3511 26.7906 35.6979 26.7906C36.0446 26.7906 36.3773 26.9278 36.6232 27.1722L44.2491 34.7981V42.4372Z"
                      fill="#B8B9BA"
                    />
                  </svg>
                  <Box sx={{ display: "flex" }}>
                    <Box sx={{ color: "#0066FF", marginRight: "5px" }}>
                      Choose a file{" "}
                    </Box>
                    <Box> or Drag it here.</Box>
                  </Box>
                  <Box sx={{ fontSize: "10px" }}>{sizeText}</Box>
                </Box>
              ) : (
                // eslint-disable-next-line jsx-a11y/img-redundant-alt
                <Box
                  sx={{
                    width: boxWidth || "100%",
                    height: boxHeight || "100%",
                    position: "relative",
                  }}
                >
                  <img loading="lazy"
                    boxWidth={boxWidth}
                    value={value}
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}
                  />

                  {isHovering === true ? (
                    <Box
                      onMouseOver={handleMouseOver}
                      onMouseOut={handleMouseOut}
                      sx={{ display: "flex", justifyContent: "center" }}
                    >
                      <Box
                        sx={{
                          width: "100%",
                          height: "100%",
                          position: "absolute",
                          top: 0,
                          zIndex: 10,
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          backgroundColor: "black",
                          opacity: "0.5",
                          borderRadius: "10px",
                        }}
                      ></Box>
                      <Box
                        sx={{
                          // width: "100%",
                          height: "100%",
                          position: "absolute",
                          top: 0,
                          zIndex: 20,
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          color: "white",
                          borderRadius: "10px",
                        }}
                      >
                        <Box
                          sx={{
                            cursor: "pointer",
                            marginRight: "15px",
                          }}
                        >
                          <FileUploader
                            multple={false}
                            handleChange={(e) => {
                              if (e.size > maxSize && maxSize !== 0) {
                                setAlert({
                                  open: true,
                                  icon: App.Dialog.Icon.exclamationRed,
                                  label:
                                    "ไฟล์มีขนาดใหญ่เกินไป กรุณา Upload ไฟล์ที่มีขนาดไม่เกิน 285 * 719 px และไม่เกิน 5 MB",
                                  callback: () => setAlert({ ...alert, open: false }),
                                });
                              } else if (
                                e.type.toLowerCase().includes("png") ||
                                e.type.toLowerCase().includes("jpeg")
                              ) {
                                if (
                                  App.service.isNullOrEmpty(width) &&
                                  App.service.isNullOrEmpty(height)
                                ) {
                                  service.getBase64(e, (result) => {
                                    onChange({ name: name, value: result, index: index });
                                  });
                                } else {
                                  let _URL = window.URL || window.webkitURL;
                                  let img = new Image();
                                  var objectUrl = _URL.createObjectURL(e);
                                  img.onload = function () {
                                    if (this.width <= width) {
                                      setAlert({
                                        open: true,
                                        icon: App.Dialog.Icon.exclamationRed,
                                        label:
                                          "ไฟล์มีขนาดใหญ่เกินไป กรุณา Upload ไฟล์ที่มีขนาดไม่เกิน 285 * 719 px และไม่เกิน 5 MB",
                                        callback: () => setAlert({ ...alert, open: false }),
                                      });
                                    } else if (this.height <= height) {
                                      // dispatch(
                                      //   setDialog({
                                      //     open: true,
                                      //     title: "warning !",
                                      //     description: "height " + height + "px",
                                      //   })
                                      // );
                                      setAlert({
                                        open: true,
                                        icon: App.Dialog.Icon.exclamationRed,
                                        label:
                                          "ไฟล์มีขนาดใหญ่เกินไป กรุณา Upload ไฟล์ที่มีขนาดไม่เกิน 285 * 719 px และไม่เกิน 5 MB",
                                        callback: () => setAlert({ ...alert, open: false }),
                                      });
                                    } else {
                                      service.getBase64(e, (result) => {
                                        onChange({ name: name, value: result, index: index });
                                      });
                                    }
                                    _URL.revokeObjectURL(objectUrl);
                                  };
                                  img.src = objectUrl;
                                }
                              }
                            }}
                            name="image"
                            types={["JPGE", "JPG", "WEBP", "PNG"]}
                          >
                            <EditIcon sx={{ cursor: "pointer" }} />
                          </FileUploader>
                        </Box>

                        <Box
                          onClick={() =>
                            onClickDelete({ index: index, name: name })
                          }
                        >
                          <DeleteIcon sx={{ cursor: "pointer" }} />
                        </Box>
                      </Box>
                    </Box>
                  ) : (
                    ""
                  )}
                </Box>
              )}
            </Box>
          </Box>
          <App.Label text={footerText} size={14} textAlign="center" />
        </FileUploader>
      </Box>
      <App.Dialog.Alert
        open={alert.open}
        callback={alert.callback}
        label={alert.label}
        icon={alert.icon}
      />
    </>
  );
};
export default FileUploaderUC;
