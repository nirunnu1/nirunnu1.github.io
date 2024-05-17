import * as React from "react";
import PropTypes from "prop-types";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import App from "components";
import DialogUC from "../dialogUC";
const TitleDoctorsUC = (props) => {
  const { onClose, selectedValue, open } = props;
  const Title = App.Enum.TitleDoctors.Title

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  return (
    <DialogUC
      open={open}
      onClose={handleClose}
      label="คำนำหน้า"
      sx={{ "& .MuiPaper-root": { width: "100%", maxWidth: "200px" } }}
    >
      <List sx={{ pt: 0 }}>
        {Title.map((e, i) => (
          <ListItem key={i} disableGutters>
            <ListItemButton
              onClick={() => handleListItemClick(e[i].value)}
              key={e[i].value}
              sx={{
                backgroundColor:
                  e[i].value === selectedValue ? "rgb(0,0,0,.1)" : "",
              }}
            >
              <ListItemText primary={e[i].th} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </DialogUC>
  );
}

TitleDoctorsUC.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string,
};
export default TitleDoctorsUC;
