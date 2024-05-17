// third-party
import { combineReducers } from "redux";

// project import
import menu from "./menu";
import Auth from "./Auth";
import Loading from "./Loading";
import Dialog from "./dialog";
import Permission from "./Permission";
// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({
  menu,
  auth: Auth,
  loading: Loading,
  dialog: Dialog,
  permission: Permission,
});

export default reducers;
