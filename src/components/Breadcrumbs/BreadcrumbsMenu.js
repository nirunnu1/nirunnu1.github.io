import { Box, Grid } from "@mui/material"
import App from "components"
const BreadcrumbsMenu = ({ name, url, Icon }) => {
    const navigate = App.Dom.Navigate()
    return (<Grid
        item
        {...{ xs: 6, sm: 6, md: 3, lg: 2 }}
        onClick={() => navigate(url)}
    >
        <App.Card
            sx={{
                background: App.color.white,
                p: 2,
                cursor: "pointer",
                "&:hover": {
                    boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.30)",
                    "& .MuiSvgIcon-root,.MuiBox-root ": {
                        color: App.color.black
                    }
                }
            }}
        >
            <Box display={"flex"} justifyContent={"center"} >
                <Icon sx={{ fontSize: "80px", color: App.color.gray }} />
            </Box>

            <App.Label text={name} sx={{ textAlign: "center" }}
                color={App.color.gray} />
        </App.Card>
    </Grid>)
}
export default BreadcrumbsMenu