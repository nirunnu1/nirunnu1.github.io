import React, { useContext, useState } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import { Grid, IconButton } from "@mui/material";
import service from "undefined-service-web";
import App from "components";
import ButtonSearch from "./ButtonSearch";
import ButtonReload from "./ButtonReload";
import ListContext from "./Context";
// import { useSelector } from "react-redux";
const SearchUC = ({
  isDate = true,
  setIndex = () => { },
  hidden = false,
}) => {
  // const { isLoading } = useSelector(({ loading }) => loading)
  const { List } = useContext(ListContext);
  const [data, setData] = useState(List.Searchvalue);
  const handleMouseDown = (event) => {
    event.preventDefault();
  };
  const Clear = () => {
    List.SetSearchvalue({ ...List.Searchvalue, text: "" });
    setData({ ...List.Searchvalue, text: "" });
    setIndex(0);
  };

  return (
    <App.Card
      mb="14px"
      p="14px"
      sx={{
        display: hidden ? "none" : "flex",
        bgcolor: App.color.white,
      }}
      className="search-root"
    >
      <Grid container spacing={1}>
        <Grid item {...!isDate ? { xs: 12, sm: 9, md: 9, lg: 9 } :
          { xs: 12, sm: 5, md: 6, lg: 7 }} sx={{
            "& .MuiInputBase-root ": {
              backgroundColor: App.color.white
            }
          }}>
          <App.Input
            sx={{
              width: "100%",
              mr: { xs: 0, sm: 0, md: 0, lg: 1, xl: 2 },
            }}
            isGap={false}
            isLabel={false}
            name="sub_district"
            value={data?.text}
            placeholder="ระบุคำที่ต้องการค้นหา"
            onChange={(e) => setData({ ...data, text: e.value })}
            startAdornment={
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            }
            endAdornment={
              service.isNullOrEmpty(data?.text) ? null : (
                <InputAdornment position="end" p={10}>
                  <IconButton
                    aria-label="toggle"
                    onClick={Clear}
                    onMouseDown={handleMouseDown}
                    edge="end"
                  >
                    {<ClearIcon />}
                  </IconButton>
                </InputAdornment>
              )
            }
            onKeyDown={(e) => {
              if (e.keyCode === 13) {
                List.SetSearchvalue({ ...data, sort: List.Searchvalue?.sort });
                setIndex(4);
              }
            }}

          />
        </Grid>
        <Grid container item {...!isDate ? { xs: 12, sm: 3, md: 3, lg: 3 }
          : { xs: 12, sm: 7, md: 6, lg: 5 }}
          spacing={1}
        >
          {isDate !== false ? (
            <Grid item {... { xs: 12, sm: 7, md: 7, lg: 7 }} >
              <App.DatePickerRange
                setData={setData}
                data={data}
                startName="startDate"
                endDate="endDate"
                isGap={false}
                // sx={{ pr: 1 }}
                isGapBetweenDate={2}
              />
            </Grid>
          ) : null}
          <Grid container item {...isDate !== false ? { xs: 12, sm: 5, md: 5, lg: 5 } :
            { xs: 12, sm: 12, md: 12, lg: 12 }}
            spacing={1}
          >
            <Grid
              item
              {... { xs: 3, sm: 3, md: 3, lg: 3 }}
              sx={{
                justifyContent: "center",
                display: "flex"
              }}
            >
              <ButtonReload Clear={Clear} />

            </Grid>
            <Grid
              item
              {... { xs: 9, sm: 9, md: 9, lg: 9 }}
            >
              <ButtonSearch
                onSearch={() => {
                  List.SetSearchvalue({ ...data, sort: List.Searchvalue?.sort });
                  setIndex(4);
                }}
              />
            </Grid>


          </Grid>
        </Grid>
      </Grid>
    </App.Card >
  );
};

export default SearchUC;
