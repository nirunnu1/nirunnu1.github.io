import { Box, Collapse, Grid } from "@mui/material";
import PropTypes from 'prop-types';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import Timeline from '@mui/lab/Timeline';
import App from "components";
import SectionHead from "./SectionHead";
import Slide from '@mui/material/Slide';
const Content = [{
    Opposite: "2021 - Present",
    Opposite0: "Senior Software Developer",
    Opposite1: "React Native Developer/ React JS Developer",
    Content: `Developed ERP and Affiliate systems using programming languages and MySQL.`
}, {
    Content: `Designed and developed CRM and coupon promotion systems
    to support the marketing department and sales activities.`
}, {
    Content: `Developed an E-commerce system for Lift Online to facilitate
    convenience in the purchasing process.`
}, {
    Content: `Developed reporting and data systems to allow users easy
    access to the system.`
}, {
    Content: `Implemented a PM2.5 dust alert system in Lift Online to provide
    real-time air quality information to the public.`
}, {
    Opposite: "2018 - 2021",
    Opposite0: `Software Developer`,
    Opposite1: `Angular JS / C# ASP.Net MVC `,
    Content: `Collaborated on the development and enhancement of
    personnel energy systems for companies.`
},
{
    Content: `Conducted analysis, designed data structures, and developed
    new technologies to improve workflow efficiency.`
}, {
    Content: `Contributed to the development of HR application software for
    companies, optimizing human resource management`
},
{
    Opposite: "2014 - 2017",
    Opposite0: `Research and Development (R&D)`,
    Opposite1: `C# ASP.Net MVC `,
    Content: `Collaborated on the development of programs for technology
    and innovation projects, including coding and program testing.`
},

{
    Content: `Conducted analysis and designed systems to deliver efficient
    results aligned with customer requirements.`
},
{
    Content: `Participated in the development of programs and innovations,
    such as competitions and training sessions, to enhance skills in
    technology and software development.`
},
{
    Content: `Contributed to the development of programs and innovations
    for events like the Asia-Pacific Broadcasting Union (ABU)
    Robocon from 2015 to 2017.`
},
{
    Content: `Contributed to the development of programs and innovations
    for the Autonomous Aerial Vehicle Challenge and ASEAN
    Military Academy Symposium in 2014.`
},
]
const TimelineItemUC = ({ num, inView, Opposite, Content, Opposite1, Opposite0 }) => {
    return (

        < TimelineItem className="Timeline" sx={{
            "& .MuiTimelineSeparator-root span": {
                backgroundColor: "#FFF"
            },
            "&:hover": {
                "& .MuiTimelineSeparator-root span": {
                    backgroundColor: "#87efad"
                },
                "& .MuiTimelineContent-root span ": {
                    textShadow: "1px 1px 4px #87efad"
                }
            }
        }
        }>

            <TimelineOppositeContent color="text.secondary">
                <Slide direction="right" in={inView.includes(`Timeline-${num}`)} mountOnEnter>
                    <Box>
                        <App.Label color="#87efad" text={Opposite} />
                        <App.Label color="#87efad" text={Opposite0} />
                        <App.Label color="#87efad" text={Opposite1} />
                    </Box>
                </Slide>
            </TimelineOppositeContent>

            <TimelineSeparator>
                {/* <Collapse in={checked}>{icon}</Collapse> */}
                <TimelineDot />
                <TimelineConnector />

            </TimelineSeparator>
            <TimelineContent>
                <Slide direction="left" in={inView.includes(`Timeline-${num}`)} mountOnEnter>
                    <Box>
                        <App.Label color="#87efad" text={Content} />
                    </Box>
                </Slide>
            </TimelineContent>
        </TimelineItem >
    )
}
const experience = ({ inView }) => {
    const id = "Section-2"
    return (
        <Grid container item {... { xs: 12 }} className="Section"
            id={id}
            sx={{
                "&.animate .Slide": {
                }
            }} >
            <SectionHead label={"PROFESSIONAL EXPERIENCE"} icon={"/image/Clock.png"} id={id}
                {...{ inView }} />

            <Grid container item {... { xs: 12, sm: 12, }} >
                <Timeline position="right">
                    {Content.map((e, i) => <TimelineItemUC key={i}{...e} num={i} inView={inView} />)}
                </Timeline>
            </Grid>

        </Grid >
    )

}

export default experience