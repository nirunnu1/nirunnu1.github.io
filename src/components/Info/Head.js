import { Box } from "@mui/material";
import App from "components";
import { activeItem } from "store/reducers/menu";
import { Fragment, useEffect, useContext } from "react";
import Context from "./Context";
const Head = () => {
  const { Breadcrumbs, subName1 } = useContext(Context);
  const dispatch = App.Redux.Dispatch();
  const navigate = App.Dom.Navigate();
  const _name1 = typeof Breadcrumbs === "string" ? Breadcrumbs : Breadcrumbs?.name;
  const _url1 = typeof Breadcrumbs === "string" ? "" : Breadcrumbs?.url;
  const _subName = typeof Breadcrumbs?.subName === "string" ? Breadcrumbs?.subName : Breadcrumbs?.subName?.name;
  const _subName_url = typeof Breadcrumbs?.subName === "string" ? "" : Breadcrumbs?.subName?.url;


  const goto = (url) => {
    navigate(url, { replace: true });
    dispatch(activeItem({ openItem: [url.replace("/", "")] }));
  };
  useEffect(() => {
    dispatch(activeItem({ openItem: [Breadcrumbs.menu_name] }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <Box
      //  pt={2} 
      pr={2} pb={2}>
      <Box display={"flex"}>
        <Box onClick={() => goto(_url1)} sx={{ cursor: 'pointer' }}>
          <App.Label
            text={_name1}
            size={App.text.size.md}
            color={App.color.gray}
          />
        </Box>
        <App.Label text={"/"} size={App.text.size.md} pr={1} pl={1}
          color={!App.service.isNullOrEmpty(subName1) ?
            App.color.gray : ""} />
        <Box onClick={() => goto(_subName_url)} sx={{ cursor: 'pointer' }}>
          <App.Label
            text={_subName}
            size={App.text.size.md}
            color={
              !App.service.isNullOrEmpty(subName1) ?
                App.color.gray : ""
            }
          />
        </Box>
        {!App.service.isNullOrEmpty(subName1) ? (
          <Fragment>
            <App.Label text={"/"} size={App.text.size.md} pr={1} pl={1} />
            <App.Label text={subName1} size={App.text.size.md} />
          </Fragment>
        ) : null}
      </Box>

      <Box>
        {!App.service.isNullOrEmpty(subName1) ? (
          <App.Label text={subName1} size={App.text.size.xxxl} />
        ) : (
          <App.Label text={_subName} size={App.text.size.xxxl} />
        )}
      </Box>
    </Box>
  );
};
export default Head;
