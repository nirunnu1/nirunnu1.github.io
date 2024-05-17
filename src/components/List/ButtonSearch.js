import { Box } from "@mui/material"
import App from "components"
import SearchIcon from "@mui/icons-material/Search";
const ButtonSearch = ({ onSearch }) => {
    return <App.Button
        label={<Box display={"flex"} alignItems={"center"} >
            <SearchIcon />
            <App.Label pl={1} text="ค้นหา" color={App.color.white} size={App.text.size.md} />
        </Box>}
        fullWidth
        // minWidth="150px"
        onClick={onSearch}
    />
}

export default ButtonSearch