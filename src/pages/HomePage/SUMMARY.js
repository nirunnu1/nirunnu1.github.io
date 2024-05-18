
import { Box, Grid } from "@mui/material";
import App from "components";
import { memo } from "react";
import Slide from '@mui/material/Slide';
import SectionHead from "./SectionHead";
const SUMMARY = ({ inView }) => {
    const id = "Section-0"
    return (
        <Grid container item {... { xs: 12 }} className="Section"
            id={id}
            sx={{
                "&.animate .Slide": {
                }
            }} >
            <SectionHead label={"PROFESSIONAL SUMMARY"} icon={"/image/Rocket.png"} id={id}
                {...{ inView }} />
            <Grid container item {... {
                xs: 12, sm: 6,
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }} >
                <Slide direction="right" in={inView.includes(id)} mountOnEnter
                    timeout={1000} className="Slide">
                    <Box sx={{ width: 200, height: 200 }}>
                        <img loading="lazy" src="/image/code.gif"
                            style={{ maxWidth: "100%" }}
                            data-target="animated-image.originalImage"
                            alt="icon-code"
                            width="200"
                            height={200}></img>
                    </Box>
                </Slide>
            </Grid>
            <Grid container item {... {
                xs: 12, sm: 6, display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }} >
                <Slide direction="left" in={inView.includes(id)} mountOnEnter
                    timeout={1000} className="Slide">
                    <Box>
                        <App.Label color="#87efad" text={` With a degree in Computer Engineering, I possess comprehensive skills in project management,
system analysis and design, hardware, software, and networking. My expertise extends to
microcontrollers, with demonstrated proficiency in various roles, including Senior Software Developer
and Software Developer. Collaborating with specialized centers in microwave technology and
robotics, I've successfully developed ERP, CRM, e-commerce, research reporting, and PM2.5 alert
systems. My focus lies in analyzing and designing new systems to optimize operational efficiency.`}
                            size={{ xs: 14, sm: 16 }}
                            textAlign={{ xs: "center", sm: "left" }} />
                    </Box>
                </Slide>
            </Grid>
        </Grid>
    )
}

export default memo(SUMMARY)