import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useDispatch, useSelector } from "react-redux";
import { setDialog } from "../../store/reducers/actions";
import address from "./address";
import date from "./date";
import title from "./title";
import titleDoctors from "./titleDoctors";
import file from "./file";
import alert from "./alert";
import confirm from "./confirm";
import confirmmini from "./confirmmini";
import DialogUC from "./dialogUC";
import icon from "./icon";
import image from "./image";
export const Address = address;
export const Date = date;
export const Title = title;
export const TitleDoctors = titleDoctors;
export const File = file;
export const Alert = alert;
export const Confirm = confirm;
export const Icon = icon;
export const ConfirmMini = confirmmini;
export const Image = image;

const defaultUC = {
  Address,
  Date,
  Title,
  TitleDoctors,
  File,
  Alert,
  Confirm,
  Icon,
  ConfirmMini,
  Image,
  DialogUC
};

export default defaultUC
export function AlertDialog() {
  const dispatch = useDispatch();
  const { dialog } = useSelector(({ dialog }) => dialog);
  const handleClose = () => {
    // setOpen(false);
    if (dialog.Close !== undefined) {
      dialog.Close();
    }
    dispatch(
      setDialog({
        open: false,
      })
    );
  };
  const handleCallback = () => {
    // setOpen(false);
    dialog.Callback();
    dispatch(
      setDialog({
        open: false,
      })
    );
  };

  return (
    <div>
      <Dialog
        open={dialog.open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{dialog.title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {dialog.description}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          {dialog.Callback !== undefined ? (
            <Button onClick={handleCallback} autoFocus>
              Agree
            </Button>
          ) : null}
        </DialogActions>
      </Dialog>
    </div>
  );
}
