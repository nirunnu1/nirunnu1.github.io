/* eslint-disable react-hooks/exhaustive-deps */
import App from "components";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { setAuthUser } from "store/reducers/actions";
const AuthGuard = ({ children }) => {
  const dispatch = App.Redux.Dispatch();
  const navigate = App.Dom.Navigate();
  const { authUser } = useSelector(({ auth }) => auth);

  const checkAuth = () => {
    let token = localStorage.getItem("token");
    if (App.service.isNullOrEmpty(authUser) && App.service.isNullOrEmpty(token)) {
      navigate("/login", { replace: true });
      localStorage.removeItem("Username");
      // dispatch(setAuthUser(token));
    } else {
      dispatch(setAuthUser(authUser || token));

    }
  };
  // const Permission = () => {
  //   dispatch({
  //     type: "PermissionMenu",
  //     payload: 0,
  //   });
  // }
  useEffect(() => {
    checkAuth();
  }, [authUser, navigate]);
  // useEffect(() => {
  //   if (!App.service.isNullOrEmpty(authUser)) {
  //     Permission()
  //   }
  // }, [authUser, navigate]);



  return children;
};

AuthGuard.propTypes = {
  children: PropTypes.node,
};

export default AuthGuard;
