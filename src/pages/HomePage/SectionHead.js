import { Box, Grid } from "@mui/material";
import App from "components";
import { memo } from "react";
import Slide from '@mui/material/Slide';
const SectionHead = ({
    id,
    label,
    icon,
    inView = []
}) => {

    return (
        <Grid item {... { xs: 12 }} sx={{
            mt: 2, mb: 2,
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
                <Slide direction="right" in={inView.includes(id)} mountOnEnter
                    timeout={1000} className="Slide">
                    <Box sx={{ p: 1 }}>
                        <img loading="lazy" src={icon}
                            style={{ maxWidth: "100%" }}
                            data-target="animated-image.originalImage"
                            width="25" height="25"
                            alt="SectionHead" />
                    </Box>
                </Slide>

                <App.Label color="#87efad" text={label}
                    size={{ xs: 18, sm: 24 }} />
                <Slide direction="left" in={inView.includes(id)} mountOnEnter
                    timeout={1000} className="Slide">
                    <Box sx={{ p: 1 }}>
                        <img loading="lazy" src={icon}
                            style={{ maxWidth: "100%" }}
                            data-target="animated-image.originalImage"
                            width="25" height="25"
                            alt="SectionHead" />
                    </Box>
                </Slide>
            </Box>
        </Grid>
    )
}

export default memo(SectionHead)