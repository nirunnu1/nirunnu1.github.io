import App from "components";
import Label from "../Base/Label";
import color from "../color";
import { Box, Button } from "@mui/material";
const FooterAction = (props) => {
  return (
    <Box
      style={{
        width: "100%",
        backgroundColor: "#f0f0f2",
        display: "flex",
        justifyContent: "end",
      }}
      px={{ xs: 2, sm: 3 }}
      py={1}
    >
      <Box display="flex">
        <Box p={0.5}>
          <Button
            disableElevation
            size="large"
            type="submit"
            variant="contained"
            color="primary"
            onClick={props.close}
            sx={{
              height: 35,
              borderRadius: "10px",
              "&.MuiButton-root:hover": {
                backgroundColor: "#FFF",
              },
              "&.MuiButton-root": {
                backgroundColor: "#FFF",
                border: "1px solid " + color.main,
                // color: color.main,
              },
            }}
          >
            {/* <DeleteIcon /> */}
            <Label text="Close" size={App.text.size.xl} color={color.main} />
          </Button>
        </Box>
        {props.Daft !== undefined ? (
          <Box p={0.5}>
            <Button
              disableElevation
              size="large"
              type="submit"
              variant="contained"
              color="success"
              onClick={props.Daft}
              sx={{
                height: 35,
                borderRadius: "10px",
                "&.MuiButton-root:hover": {
                  backgroundColor:
                    props.permission === false ? "#DDD" : "#002856",
                },
                "&.MuiButton-root": {
                  backgroundColor:
                    props.permission === false ? "#DDD" : "#002856",
                },
              }}
            >
              <Label text="Daft" size={App.text.size.xl} color="#FFF" />
            </Button>
          </Box>
        ) : null}
        <Box p={0.5}>
          <Button
            disableElevation
            size="large"
            type="submit"
            variant="contained"
            color="success"
            onClick={() => {
              if (props.permission !== false) {
                props.save();
              }
            }}
            sx={{
              height: 35,
              borderRadius: "10px",
              "&.MuiButton-root:hover": {
                backgroundColor:
                  props.permission === false ? "#DDD" : "#002856",
              },
              "&.MuiButton-root": {
                backgroundColor:
                  props.permission === false ? "#DDD" : "#002856",
              },
            }}
          >
            <Label text="Save" size={App.text.size.xl} color="#FFF" />
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
export default FooterAction;
