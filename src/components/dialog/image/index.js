import * as React from "react";
import PropTypes from "prop-types";
import Dialog from "@mui/material/Dialog";
import { Box } from "@mui/material";
import CardMedia from "@mui/material/CardMedia";

const DialogImage = (props) => {
  const {
    open,
    url,
    onClose,
  } = props;
  const [Open, setOpen] = React.useState(open);
  // const handleClose =
  React.useEffect(() => {
    setOpen(open);
  }, [open]);

  return (
    <Dialog
      onClose={onClose}
      open={Open}
      sx={{
        "& .MuiPaper-root": {
          width: "100%",
          maxWidth: "300px",
          borderRadius: "10px",
        },
      }}
    >
      <Box
        // width={"300px"}
        // height="250px"
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Box p={2}>
          <Box onClick={onClose} display="flex" justifyContent={"flex-end"}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M5.68517 3.4418L12.0012 9.75783L18.2845 3.47452C18.4233 3.32679 18.5905 3.20862 18.7761 3.12708C18.9617 3.04554 19.1618 3.00231 19.3645 3C19.7984 3 20.2146 3.17239 20.5215 3.47926C20.8284 3.78612 21.0007 4.20231 21.0007 4.63628C21.0046 4.83689 20.9673 5.03616 20.8914 5.22187C20.8154 5.40758 20.7023 5.57581 20.5589 5.71622L14.1938 11.9995L20.5589 18.3647C20.8286 18.6285 20.9868 18.9858 21.0007 19.3628C21.0007 19.7968 20.8284 20.213 20.5215 20.5198C20.2146 20.8267 19.7984 20.9991 19.3645 20.9991C19.1559 21.0077 18.9479 20.9729 18.7535 20.8969C18.5591 20.8208 18.3827 20.7052 18.2354 20.5573L12.0012 14.2412L5.70153 20.5409C5.56327 20.6837 5.39811 20.7977 5.21556 20.8764C5.03301 20.955 4.8367 20.9967 4.63795 20.9991C4.20398 20.9991 3.78779 20.8267 3.48093 20.5198C3.17406 20.213 3.00167 19.7968 3.00167 19.3628C2.99786 19.1622 3.03508 18.9629 3.11105 18.7772C3.18702 18.5915 3.30014 18.4233 3.44347 18.2828L9.80859 11.9995L3.44347 5.63441C3.17378 5.37057 3.01564 5.0133 3.00167 4.63628C3.00167 4.20231 3.17406 3.78612 3.48093 3.47926C3.78779 3.17239 4.20398 3 4.63795 3C5.03066 3.00491 5.407 3.16363 5.68517 3.4418Z"
                fill="#333436"
              />
            </svg>
          </Box>
          <Box mt={2}
            mb={2}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <CardMedia
              component="img"
              // height={"75px"}
              // width={"75px"}
              image={url}
              alt="IDcard.png"
              sx={{
                objectFit: "contain",
              }}
            />
          </Box>
        </Box>
      </Box>

    </Dialog>
  );
};

DialogImage.propTypes = {
  open: PropTypes.bool.isRequired,
  icon: PropTypes.any,
  label: PropTypes.string,
  autoClose: PropTypes.bool,
  callback: PropTypes.func,
};
export default DialogImage;
