import { Box, Stack } from "@mui/material";
import App from "components";
import React from "react";

function DatePickerRange({
  setData,
  data,
  startName,
  endName,
  isGap = true,
  sx,
  isGapBetweenDate = 2,
}) {
  //   console.log(data.startDate, data.endDate);
  return (
    <Box mt={isGap ? 2 : 0} mb={isGap ? 2 : 0} sx={{ ...sx }}>
      <Stack direction="row" justifyContent="space-between" >
        <App.DatePicker
          isLabel={false}
          isGap={false}
          name={startName}
          maxDate={data?.endDate}
          onChange={(e) => {
            setData({
              ...data,
              startDate: new Date(
                App.service.moment(new Date(e.value)).format("MM-DD-yyyy")
              ),
            });
          }}
          value={data?.startDate}
        />
        <App.Label
          text=" - "
          size={App.text.size.xl}
          pr={'12px'}
          pl={1}
          fontWeight="400"
          sx={{ marginTop: "4px" }}
        />
        <App.DatePicker
          isGap={false}
          isLabel={false}
          name={endName}
          minDate={data?.startDate}
          onChange={(e) => {
            setData({
              ...data,
              endDate: new Date(
                App.service.moment(new Date(e.value)).format("MM-DD-yyyy")
              ),
            });
          }}
          value={data?.endDate}
        />
      </Stack>
    </Box>
  );
}

export default DatePickerRange;
