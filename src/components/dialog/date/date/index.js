import * as React from "react";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { Box } from "@mui/material";
import DatePicker from "react-mobile-datepicker";
import { useState } from "react";
import App from "components";
const monthMap = {
  1: "Jan",
  2: "Feb",
  3: "Mar",
  4: "Apr",
  5: "May",
  6: "Jun",
  7: "Jul",
  8: "Aug",
  9: "Sep",
  10: "Oct",
  11: "Nov",
  12: "Dec",
};
const dateConfig = {
  date: {
    format: "DD",
    caption: "Day",
    step: 1,
  },
  month: {
    format: (value) => monthMap[value.getMonth() + 1],
    caption: "Mon",
    step: 1,
  },
  year: {
    format: "YYYY",
    caption: "Year",
    step: 1,
  },
};
const DatePickerUC = (props) => {
  const { dialogLabel, onClose, selectedValue, open, mindate } = props;
  const [time, setTime] = useState(
    App.service.isNullOrEmpty(selectedValue) ? new Date() : selectedValue
  );
  const [Mindate, setMindate] = useState(mindate || null);
  const handleClose = () => {
    onClose(selectedValue);
  };
  const handleChange = (time) => {
    setTime(time);
  };

  React.useEffect(() => {
    setTime(
      App.service.isNullOrEmpty(selectedValue) ? new Date() : selectedValue
    );
  }, [open]);
  React.useEffect(() => {
    // console.log(mindate);
    setMindate(mindate);
  }, [mindate]);
  return (
    <Dialog
      onClose={handleClose}
      open={open}
      sx={{
        "& .MuiPaper-root": {
          width: "100%",
        },
      }}
    >
      <DialogTitle
        sx={{
          width: "100%",
          height: "60px",
        }}
      >
        <App.Label text={dialogLabel} />
      </DialogTitle>
      <Box
        sx={{
          "& .datepicker-navbar": {
            display: "none",
          },
          "& .datepicker-content": {
            pt: "0px !important",
          },
          "& .datepicker": {
            position: "unset !important",
            bgcolor: App.color.white + " !important",
          },
          "& .datepicker-viewport::after": {
            background:
              "linear-gradient(#fff,rgba(255, 255, 255, 0)52%,rgba(255, 255, 255, 0)48%,#fff) !important",
          },
          "& .datepicker.ios .datepicker-wheel": {
            bgcolor: App.color.Secondary1 + " !important",
            border: "none !important",
          },
          "& .datepicker-scroll .disabled": {
            display: "none",
          },
        }}
      >
        <DatePicker
          value={time}
          isOpen={true}
          isPopup={false}
          onChange={handleChange}
          theme="ios"
          showHeader={false}
          dateConfig={dateConfig}
          max={new Date()}
        // min={Mindate}
        />
      </Box>
      <Box sx={{ p: 1, display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ width: "48%" }}>
          <App.Button
            label={"ยกเลิก"}
            fullWidth
            onClick={handleClose}
            // disabled={!isSuccessed || !isTime}
            sx={{
              backgroundColor: App.color.white,
              color: App.color.main,
              border: "1px solid " + App.color.main,
            }}
          />
        </Box>
        <Box sx={{ width: "48%" }}>
          <App.Button
            label={"ยืนยัน"}
            fullWidth
            onClick={() => onClose(time)}
          // disabled={!isSuccessed || !isTime}
          />
        </Box>
      </Box>
    </Dialog>
  );
};
export default DatePickerUC;
