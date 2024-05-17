/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from "prop-types";
import { useRef, useState } from "react";
// material-ui
import { useTheme } from "@mui/material/styles";
import {
  Box,
  ButtonBase,
  ClickAwayListener,
  Paper,
  Popper,
  Stack,
} from "@mui/material";

// project import
// import MainCard from "components/MainCard";
import Transitions from "components/@extended/Transitions";
import Avatar from "@mui/material/Avatar";

import { BorderColor, Logout } from '@mui/icons-material';



import { setAuthUser } from "store/reducers/actions.js";
import App from "components";
import { useEffect } from "react";

// import { w3cwebsocket as W3CWebSocket } from 'websocket';

// tab panel wrapper
function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`profile-tabpanel-${index}`}
      aria-labelledby={`profile-tab-${index}`}
      {...other}
    >
      {value === index && children}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const Profile = () => {
  const dispatch = App.Redux.Dispatch();
  const navigate = App.Dom.Navigate();
  const theme = useTheme();

  const handleLogout = async () => {
    // logout
    localStorage.removeItem("token");
    localStorage.removeItem("Username");
    dispatch(setAuthUser(null));
    navigate("/login", { replace: true });
  };

  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };
  const [form, setForm] = useState({});
  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };
  const GetProfile = async () => {
    const res = await App.service.getHttp(
      "/backend/setting/getAccount"
    );
    // console.log("Data", res)
    if (res.status) {
      let isRole = "";
      if (res.data.role === "admin") {
        isRole = 0;
      } else if (res.data.role === "mkt") {
        isRole = 1;
      } else if (res.data.role === "fa") {
        isRole = 2;
      } else if (res.data.role === "wh") {
        isRole = 3;
      }
      localStorage.setItem("admin", JSON.stringify(res.data))
      setForm(res.data);
      dispatch({
        type: "PermissionMenu",
        payload: isRole,
        // Data.data.role === "admin" ? 0 : Data.data.role === "mkt" ? 1 : 2,
      });
    }
  };
  const gotoProfile = () => {
    navigate("/main/setting/user/info/" + form.id);
  };
  useEffect(() => {
    GetProfile();
  }, []);

  // useEffect(() => {
  //   let client
  //   if (!App.service.isNullOrEmpty(form?.id)) {
  //     // เชื่อมต่อกับ WebSocket server
  //     client = new W3CWebSocket('ws://localhost:9000');
  //     // เมื่อเชื่อมต่อสำเร็จ
  //     client.onopen = () => {
  //       console.log('WebSocket client connected');
  //       // ส่ง user id ไปยัง WebSocket server
  //       client.send(JSON.stringify({ type: 'user_id', data: form?.id }));
  //     };

  //     // เมื่อมีข้อมูลเข้ามาจากเซิร์ฟเวอร์
  //     client.onmessage = (message) => {
  //       console.log('Received message:', message.data);
  //     };

  //     // เมื่อเกิดข้อผิดพลาดในการเชื่อมต่อ
  //     client.onerror = (error) => {
  //       console.error('WebSocket error:', error);
  //     };

  //     // เมื่อเชื่อมต่อถูกปิด
  //     client.onclose = () => {
  //       console.log('WebSocket client closed');
  //     };
  //   }
  //   // คืนค่าฟังก์ชันเพื่อทำการยกเลิกเมื่อ component ถูก unmounted
  //   return () => {
  //     client?.close();
  //   };
  // }, [form]);
  return (
    <Box sx={{ flexShrink: 0, ml: 0.75 }}>
      <ButtonBase
        sx={{
          p: 0.25,
          bgcolor: open ? "transparent" : "transparent",
          borderRadius: 1,
          // "&:hover": { bgcolor: "secondary.lighter" },
        }}
        aria-label="open profile"
        ref={anchorRef}
        aria-controls={open ? "profile-grow" : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      >
        <Stack direction="row" spacing={2} alignItems="center" sx={{ p: 0.5 }}>
          <Box
            sx={{
              borderRadius: "40px",
              bgcolor: App.color.white,
              height: "100%",
              p: .5,
              pl: 1,
              pr: 1,
              display: "flex",
              alignItems: "center"
            }}
          >
            <Box>
              <Avatar alt="user-image" src={form.image} />
            </Box>
            <Box pr={3} pl={3}>
              <App.Label
                text={form.full_name}
                size={14}
                fontWeight="500"
              />
              <App.Label
                text={form.role}
                size={12}
                fontWeight="400"
              />
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <svg
                width="30"
                height="30"
                viewBox="0 0 24 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  y="0.492188"
                  width="24"
                  height="24"
                  rx="12"
                  fill={App.color.main}
                />
                <path
                  d="M15.7166 9.72422C15.858 9.57557 16.049 9.49219 16.248 9.49219C16.4471 9.49219 16.6381 9.57557 16.7795 9.72422C16.8493 9.79722 16.9048 9.88422 16.9427 9.98018C16.9805 10.0761 17 10.1791 17 10.2832C17 10.3872 16.9805 10.4902 16.9427 10.5861C16.9048 10.6821 16.8493 10.7691 16.7795 10.8421L12.532 15.2605C12.3903 15.409 12.1991 15.4922 12 15.4922C11.8009 15.4922 11.6097 15.409 11.468 15.2605L7.22049 10.8421C7.15065 10.7691 7.0952 10.6821 7.05735 10.5861C7.01949 10.4902 7 10.3872 7 10.2832C7 10.1791 7.01949 10.0761 7.05735 9.98018C7.0952 9.88422 7.15065 9.79722 7.22049 9.72422C7.36192 9.57557 7.55292 9.49219 7.75197 9.49219C7.95101 9.49219 8.14201 9.57557 8.28345 9.72422L12.0016 13.3478L15.7166 9.72422Z"
                  fill={App.color.white}
                />
              </svg>
            </Box>
          </Box>
        </Stack>
      </ButtonBase>
      <Popper
        placement="bottom-end"
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        popperOptions={{
          modifiers: [
            {
              name: "offset",
              options: {
                offset: [0, 9],
              },
            },
          ],
        }}
      >
        {({ TransitionProps }) => (
          <Transitions type="fade" in={open} {...TransitionProps}>
            {open && (
              <Paper
                sx={{
                  boxShadow: theme.customShadows.z1,
                  width: 290,
                  minWidth: 240,
                  maxWidth: 290,
                  [theme.breakpoints.down("md")]: {
                    maxWidth: 250,
                  },
                  "& .MuiCardHeader-root": {
                    display: "none",
                  },
                }}
              >
                <ClickAwayListener onClickAway={handleClose}>
                  <App.Card >
                    <Box p={2} sx={{ cursor: "pointer" }}>
                      <Box mb={2} >
                        <Box display={"flex"} justifyContent={"center"}>
                          <Avatar alt="user-image" src={form.image} />
                        </Box>
                        <App.Label
                          text={form.full_name}
                          size={App.text.size.smm}
                          fontWeight="500"
                          textAlign="center"
                        />
                        <App.Label
                          text={form.role}
                          size={App.text.size.sm}
                          fontWeight="400"
                          textAlign="center"
                        />
                      </Box>
                      <Box sx={{ mb: 1 }}>
                        <App.Button
                          label={
                            <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
                              <Box display={"center"} alignItems={"center"}>
                                <Box pr={1} display={"center"} alignItems={"center"}>
                                  <BorderColor sx={{ fontSize: "16px" }} />
                                </Box>
                                <App.Label text={"แก้ไขโปรไฟล์"} size={14} />
                              </Box>
                            </Box>
                          }
                          isOutlined={true}
                          fullWidth
                          onClick={() => {
                            gotoProfile()
                            setOpen(false);
                          }}
                          sx={{ mb: 1 }}
                        />
                      </Box>
                      <App.Button
                        label={
                          <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
                            <Box display={"center"} alignItems={"center"}>
                              <Box pr={1} display={"center"} alignItems={"center"}>
                                <Logout sx={{ fontSize: "16px" }} />
                              </Box>
                              <App.Label text={"ออกจากระบบ"} size={14} color={App.color.white} />
                            </Box>
                          </Box>
                        }
                        fullWidth
                        onClick={handleLogout}
                      />
                    </Box>
                  </App.Card>
                </ClickAwayListener>
              </Paper>
            )}
          </Transitions>
        )}
      </Popper>
    </Box>
  );
};

export default Profile;
