/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from "prop-types";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import service from "undefined-service-web";
import { activeItem } from "store/reducers/menu";
import { useDispatch } from "react-redux";
import { setAuthUser } from "store/reducers/actions";

const GuestGuard = ({ children }) => {
  const dispatch = useDispatch();
  const { authUser } = useSelector(({ auth }) => auth);
  const navigate = useNavigate();
  const checkAuth = () => {
    if (window.location.href.toLowerCase().includes("AddPassword".toLowerCase()) ||
      window.location.href.toLowerCase().includes("ConfirmPassword".toLowerCase())
    ) {
      dispatch(setAuthUser(null));
      localStorage.removeItem("Username");
      localStorage.removeItem("token")
    } else {
      const token = localStorage.getItem("token")

      if (service.isNullOrEmpty(authUser) && service.isNullOrEmpty(token)) {

        if (!window.location.href.toLowerCase().includes("AddPassword".toLowerCase()) &&
          !window.location.href.toLowerCase().includes("ConfirmPassword".toLowerCase())
        ) {
          navigate("login", { replace: true });
        } else {
          dispatch(setAuthUser(null));
          localStorage.removeItem("Username");
        }

      } else if (!service.isNullOrEmpty(token)) {
        dispatch(setAuthUser(token));
        navigate("/main/dashboard", { replace: true });
        dispatch(activeItem({ openItem: ["dashboard"] }));
      }
    }
  };
  useEffect(() => {
    checkAuth();
  }, [authUser, navigate]);

  return children;
};

GuestGuard.propTypes = {
  children: PropTypes.node,
};

export default GuestGuard;
