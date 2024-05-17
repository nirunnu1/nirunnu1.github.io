export const LOGIN = "@auth/LOGIN";
export const LOGOUT = "@auth/LOGOUT";
export const REGISTER = "@auth/REGISTER";
export const UPDATE_AUTH_USER = "@auth/update_auth_user";

export const Loading = "Loading";
export const Dialog = "Dialog";
export const PermissionMenu = "PermissionMenu";
export const PermissionSubMenu = "PermissionSubMenu";
export const setAuthUser = (user) => {
  return (dispatch) => {
    dispatch({
      type: UPDATE_AUTH_USER,
      payload: user,
    });
  };
};

export const setLoading = (loading) => {
  return (dispatch) => {
    dispatch({
      type: Loading,
      payload: loading,
    });
  };
};
// const dialog
export const setDialog = (dialog: {
  open: Boolean,
  title: string,
  description: string,
}) => {
  return (dispatch) => {
    dispatch({
      type: Dialog,
      payload: dialog,
    });
  };
};

const defaultUC = {
  setAuthUser,
  setLoading,
  setDialog
}
export default defaultUC