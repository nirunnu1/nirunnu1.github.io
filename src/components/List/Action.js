import { Box, } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Fragment, useState } from "react";
import App from "components";
import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import approve from "assets/images/icons/approve.png";
import reject from "assets/images/icons/reject.png";

const LightTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: theme.shadows[1],
    fontSize: 11,
  },
}));

const Action = (props) => {
  const {
    id,
    isDelete,
    isDeleteDisable,
    isEdit,
    isMenuItem,
    isView,
    name,
    Delete,
    CustomActionView,
    Agree,
    Disagree,
    CustomEdit,
    isExport = false,
    Export,
    startAction,
    endAction
  } = props;
  // const { MenuID } = useContext(ListContext);
  let navigate = useNavigate();
  // const dispatch = useDispatch();
  // const Permission = useSelector((state) => state.permission);
  const [PermissionMenu, setPermissionMenu] = useState({});

  // useEffect(() => {
  //   // setPermissionMenu(
  //   //   Permission.permissionmenu.find((m) => m.MenuID === MenuID)
  //   // );
  //   // console.log(PermissionMenu);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [Permission]);
  return (
    <Box style={{ display: "flex", justifyContent: "center" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          // "& svg": {
          //   fill: App.color.main
          // },
          // "& path": {
          //   fill: App.color.main
          // },
          "& svg:hover": {
            opacity: 0.85
          },
          "& path:hover": {
            opacity: 0.85
          },

        }}
      >
        {startAction}
        {isView !== false ? (
          <LightTooltip
            title={"เปิดเอกสาร"}>
            <Box
              onClick={() => {
                if (CustomActionView === undefined) {
                  navigate("/" + name + "/info/" + id);
                } else {
                  CustomActionView();
                }
              }}
              sx={{
                cursor: "pointer",
                color: App.color.main,
                display: "flex",
                alignItems: "center",
                "& svg": {
                  fill: App.color.main
                },
                "& path": {
                  fill: App.color.main
                },
              }}
              pr={1}
            >
              {App.icon.icon[App.icon.iconType.View]}
            </Box>
          </LightTooltip>
        ) : null}
        {isEdit !== false ? (
          <LightTooltip
            title={"แก้ไข"}>
            <Box
              onClick={() => {
                if (CustomEdit === undefined) {
                  navigate("/" + name + "/info/" + id);
                } else {
                  CustomEdit();
                }
              }}
              sx={{
                cursor: "pointer",
                color: App.color.main,
                display: "flex",
                alignItems: "center"
              }}
              pr={1}
            >
              {App.icon.icon[App.icon.iconType.Edit]}
            </Box>
          </LightTooltip>
        ) : null}
        {isDelete !== false ? (
          <LightTooltip
            title={"ลบ"}>
            <Box
              disabled={!PermissionMenu?.IsCanDelete}
              sx={{
                cursor: "pointer",
                color: App.color.main,
                display: "flex",
                alignItems: "center"
              }}
              onClick={() => {
                if (
                  isDeleteDisable !== true
                ) {
                  Delete(id);
                }
              }}
            >
              {isDeleteDisable !== true ? (
                App.icon.icon[App.icon.iconType.Delete]
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="25"
                  viewBox="0 0 24 25"
                  fill="none"
                >
                  <path
                    d="M6 19.7461C6 20.8461 6.9 21.7461 8 21.7461H16C17.1 21.7461 18 20.8461 18 19.7461V9.74609C18 8.64609 17.1 7.74609 16 7.74609H8C6.9 7.74609 6 8.64609 6 9.74609V19.7461ZM18 4.74609H15.5L14.79 4.03609C14.61 3.85609 14.35 3.74609 14.09 3.74609H9.91C9.65 3.74609 9.39 3.85609 9.21 4.03609L8.5 4.74609H6C5.45 4.74609 5 5.19609 5 5.74609C5 6.29609 5.45 6.74609 6 6.74609H18C18.55 6.74609 19 6.29609 19 5.74609C19 5.19609 18.55 4.74609 18 4.74609Z"
                    fill="#B8B9BA"
                  />
                </svg>
              )}
            </Box>
          </LightTooltip>
        ) : null}
        {isMenuItem !== false ? (
          <Fragment>
            <LightTooltip
              title={
                <Fragment>
                  <Box
                    p={0.5}
                    display={"flex"}
                    alignItems={"center"}
                    onClick={Agree}
                    sx={{ cursor: "pointer" }}
                  >
                    <img loading="lazy" src={approve} alt="approve" />
                    {/* <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18.0101 8.46799L18.0104 8.46776L18.0101 8.46799Z" fill="black" stroke="#76CA66" stroke-width="3" />
                    <rect x="1" y="1" width="22" height="22" rx="11" stroke="#76CA66" stroke-width="2" />
                  </svg> */}
                    <App.Label
                      pl={0.5}
                      text="อนุมัติ"
                      size={App.text.size.md}
                      fontWeight="300"
                      textAlign="center"
                    />
                  </Box>
                  <Box
                    p={0.5}
                    pt={1}
                    display={"flex"}
                    alignItems={"center"}
                    onClick={Disagree}
                    sx={{ cursor: "pointer" }}
                  >
                    <img loading="lazy" src={reject} alt="reject" />
                    {/* <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.04242 16.9085L7.03395 16.8889L7.04242 16.9085ZM7.34819 17.2573L7.34913 17.2564C7.34882 17.2567 7.3485 17.257 7.34819 17.2573ZM16.6563 6.73933L16.6535 6.74204L16.6563 6.73934L16.6563 6.73933Z" fill="#333436" stroke="#000" stroke-width="3" />
                    <rect x="1" y="1" width="22" height="22" rx="11" stroke="#000" strokeWidth="2" />
                  </svg> */}
                    <App.Label
                      pl={0.5}
                      text="ไม่อนุมัติ"
                      size={App.text.size.md}
                      fontWeight="300"
                      textAlign="center"
                    />
                  </Box>
                </Fragment>
              }
              placement="right"
            >
              <Box pl={1} sx={{ cursor: "pointer" }}>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 20C11.45 20 10.979 19.804 10.587 19.412C10.195 19.02 9.99934 18.5493 10 18C10 17.45 10.196 16.979 10.588 16.587C10.98 16.195 11.4507 15.9993 12 16C12.55 16 13.021 16.196 13.413 16.588C13.805 16.98 14.0007 17.4507 14 18C14 18.55 13.804 19.021 13.412 19.413C13.02 19.805 12.5493 20.0007 12 20ZM12 14C11.45 14 10.979 13.804 10.587 13.412C10.195 13.02 9.99934 12.5493 10 12C10 11.45 10.196 10.979 10.588 10.587C10.98 10.195 11.4507 9.99934 12 10C12.55 10 13.021 10.196 13.413 10.588C13.805 10.98 14.0007 11.4507 14 12C14 12.55 13.804 13.021 13.412 13.413C13.02 13.805 12.5493 14.0007 12 14ZM12 8C11.45 8 10.979 7.804 10.587 7.412C10.195 7.02 9.99934 6.54934 10 6C10 5.45 10.196 4.979 10.588 4.587C10.98 4.195 11.4507 3.99934 12 4C12.55 4 13.021 4.196 13.413 4.588C13.805 4.98 14.0007 5.45067 14 6C14 6.55 13.804 7.021 13.412 7.413C13.02 7.805 12.5493 8.00067 12 8Z"
                    fill="#0066FF"
                  />
                </svg>
              </Box>
            </LightTooltip>
          </Fragment>
        ) : null}

        {isExport !== false ? (
          <Box
            disabled={!PermissionMenu?.IsCanDelete}
            sx={{ cursor: "pointer" }}
            onClick={Export}
          >
            <svg
              width="24"
              height="25"
              viewBox="0 0 24 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 2.24609C5.46957 2.24609 4.96086 2.45681 4.58579 2.83188C4.21071 3.20695 4 3.71566 4 4.24609V20.2461C4 20.7765 4.21071 21.2852 4.58579 21.6603C4.96086 22.0354 5.46957 22.2461 6 22.2461H18C18.5304 22.2461 19.0391 22.0354 19.4142 21.6603C19.7893 21.2852 20 20.7765 20 20.2461V8.24609L14 2.24609M13 3.74609L18.5 9.24609H13M8.93 12.4661H16V19.5361L13.88 17.4161L11.05 20.2461L8.22 17.4161L11.05 14.5961"
                fill="#0066FF"
              />
            </svg>
          </Box>
        ) : null}

        {endAction}


      </Box>
    </Box>
  );
};
export default Action;
