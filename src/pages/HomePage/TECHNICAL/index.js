import { Box, Grid } from "@mui/material";
import App from "components";
import { memo } from "react";
import SectionHead from "../SectionHead";
import Container from "./Container";
import icon from "./icon";
import Zoom from '@mui/material/Zoom';
const ContainerUC = ({ label, Content }) => {
    return (
        <Grid item {... { xs: 12, }} >
            <App.Label color="#87efad" text={label}
                size={{ xs: 14, sm: 16 }} fontWeight={500} textAlign={{ xs: "center", sm: "center" }} />
            <App.Label color="#87efad" text={Content}
                size={14}
                fontWeight={300} textAlign={{ xs: "center", sm: "center" }} />
        </Grid>
    )
}
const IconUC = ({ uri, inView, num }) => {
    return (
        <Zoom in={inView.includes("TECHNICAL-Icon")}
            style={{ transitionDelay: inView.includes("TECHNICAL-Icon") ? `${num * 50}ms` : '0ms' }}>
            <Grid item {... { xs: 1, sm: 1, md: 1.5, lg: 1.5 }}>
                <img loading="lazy" src={uri}
                    style={{ maxWidth: "100%" }}
                    data-target="animated-image.originalImage"
                    alt="icon" />
            </Grid>
        </Zoom>
    )
}
const TECHNICAL = ({ inView }) => {
    const id = "Section-1"
    return (<Grid container item {... { xs: 12 }} className="Section"
        id={id}
        sx={{
            "&.animate .Slide": {
            }
        }} >
        <SectionHead label={"TECHNICAL SKILLS"} icon={"/image/codetag.gif"} id={id}
            {...{ inView }} />
        <Grid container item {... { xs: 12 }} spacing={1}>
            <Grid container item {... { xs: 12 }} >
                {Container.map((e, i) => <ContainerUC key={i} {...e} />)}
            </Grid>
            <Grid item {... { xs: 12 }} sx={{
                display: "flex",
                justifyContent: "center",
            }}>
                <Box sx={{ width: "100%" }}>
                    <Grid container item {... { xs: 12, sm: 6 }} sx={{
                        width: "100%",
                        maxWidth: "100% !important",
                    }}
                        className="TECHNICAL-Icon" >
                        {icon.map((e, i) => <IconUC key={i} uri={e} num={i} inView={inView} />)}

                    </Grid>
                </Box>
            </Grid>
        </Grid>
    </Grid>)
}
export default memo(TECHNICAL)