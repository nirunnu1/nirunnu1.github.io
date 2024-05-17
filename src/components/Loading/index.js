// import CircularProgress from '@mui/material/CircularProgress';
import { Box } from "@mui/material";
import { useSelector } from 'react-redux'
import Backdrop from '@mui/material/Backdrop';
import "./index.css"
const Loading = ({ children }) => {
    const { isLoading } = useSelector(({ loading }) => loading)
    return (
        <Box style={{ position: "relative" }}>
            <Backdrop
                sx={{ color: '#fff', zIndex: 9999 }}
                open={isLoading}
                className='LoadingUC'
            // onClick={handleClose}
            >
                <Box sx={{ position: "relative" }}>
                    <Box sx={{ position: "absolute" }}>
                        <Box component={"span"}
                            className="loader">Loading</Box>
                    </Box>
                    <Box component={"span"}
                        sx={{ position: "absolute" }}
                        className="loader1">Loading</Box>
                </Box>
            </Backdrop>

            {children}
        </Box>
    )
}
export default Loading

