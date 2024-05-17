import { useSelector } from "react-redux"
import CircularProgress from '@mui/material/CircularProgress';
import { Box } from "@mui/material";
import { Fragment } from "react";

const BodyUC = () => {
    const { isLoading } = useSelector(({ loading }) => loading)
    return (
        <Fragment>
            {isLoading && <Box sx={{ height: "100px" }} />}
            {isLoading && <Box sx={{
                width: "100%",
                height: "100%",
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                backgroundColor: "rgba(0,0,0,0.05)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}>

                <CircularProgress color="secondary" />
            </Box>}
        </Fragment>
    )

}

export default BodyUC