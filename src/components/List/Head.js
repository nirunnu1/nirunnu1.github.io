import { Box, Grid } from "@mui/material";
import App from "../index";
import { activeItem } from "store/reducers/menu";
import ListContext from "./Context";
import { useEffect, useContext } from "react";

const Head = ({ name, subName, isNew }) => {
  const { Breadcrumbs } = useContext(ListContext);
  const dispatch = App.Redux.Dispatch();
  const navigate = App.Dom.Navigate();
  const _name1 = typeof Breadcrumbs === "string" ? Breadcrumbs : Breadcrumbs?.name;
  const _url1 = typeof Breadcrumbs === "string" ? "" : Breadcrumbs?.url;

  const _subName = typeof Breadcrumbs?.subName === "string" ? Breadcrumbs?.subName : Breadcrumbs?.subName?.name;
  const _subName_url = typeof Breadcrumbs?.subName === "string" ? "" : Breadcrumbs?.subName?.url;
  const goto = (url) => {
    navigate(url, { replace: true });
    dispatch(activeItem({ openItem: [Breadcrumbs?.menu_name] }));
  };
  const New = () => {
    navigate(_url1 + "/info", { replace: true });
    dispatch(activeItem({ openItem: [Breadcrumbs?.menu_name] }));
  }
  useEffect(() => {
    dispatch(activeItem({ openItem: [Breadcrumbs?.menu_name] }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <Grid container spacing={1} mb={2}>
      < Grid item {... { xs: 12, sm: 9, md: 9, lg: 9 }}>
        <Box display={"flex"}>
          <Box onClick={() => goto(_url1)} sx={{ cursor: "pointer" }}>
            <App.Label
              text={_name1}
              size={App.text.size.md}
              color={App.color.gray}
            />
          </Box>
          <App.Label text={"/"} size={App.text.size.md} pr={1} pl={1} />
          <Box onClick={() => goto(_subName_url)} sx={{ cursor: "pointer" }}>
            <App.Label text={_subName} size={App.text.size.md} />
          </Box>
        </Box>

        <Box>
          <App.Label text={_subName} size={App.text.size.xxxl} />{" "}
        </Box>
      </Grid>
      {isNew === true ?
        < Grid item {... { xs: 12, sm: 3, md: 3, lg: 3 }}>
          <App.Button
            label={"เพิ่ม"}
            fullWidth
            onClick={New}
          />
        </Grid> : null}
    </Grid>
  );
};
export default Head;
