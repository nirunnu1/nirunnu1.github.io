
import { Box, Grid } from "@mui/material";

import App from "components";

import EXPERIENCE from "./EXPERIENCE";
import SUMMARY from "./SUMMARY";
import TECHNICAL from "./TECHNICAL";
import { useEffect, useState } from "react";

const HomePage = () => {
  const [inView, setInView] = useState([])
  const CheckInView = () => {
    // get window height
    const windowHeight = window.innerHeight;
    // get number of pixels that the document is scrolled
    const scrollY = window.scrollY || window.pageYOffset;

    // get current scroll position (distance from the top of the page to the bottom of the current viewport)
    const scrollPosition = scrollY + windowHeight;
    // console.log(scrollPosition)
    const Section = document.getElementsByClassName("Section")

    Array.from(Section).map(e => {
      if (e.getBoundingClientRect().top < windowHeight && e.getBoundingClientRect().bottom > 20) {
        e.classList.add('animate')
        setInView(pre => [...pre, e.id])
      } else {
        e.classList.remove('animate')
        setInView(pre => {
          return [...pre].filter(ee => ee != e.id)
        })
      }
    })
    const Ticon = document.getElementsByClassName("TECHNICAL-Icon")
    Array.from(Ticon).map(e => {
      // if (e.getBoundingClientRect().top > 0 && e.getBoundingClientRect().bottom < scrollPosition) {
      if (e.getBoundingClientRect().top < windowHeight && e.getBoundingClientRect().bottom > 20) {
        setInView(pre => [...pre, "TECHNICAL-Icon"])
      } else {
        setInView(pre => {
          return [...pre].filter(ee => ee != "TECHNICAL-Icon")
        })
      }
    })
    const Timeline = document.getElementsByClassName("Timeline")
    Array.from(Timeline).map((e, i) => {
      if (e.getBoundingClientRect().top < windowHeight && e.getBoundingClientRect().bottom > 20) {
        setInView(pre => [...pre, `Timeline-${i}`])
      } else {
        setInView(pre => {
          return [...pre].filter(ee => ee != `Timeline-${i}`)
        })
      }
    })
  }

  useEffect(() => {
    CheckInView()
    document.addEventListener('scroll', CheckInView);
  }, [])
  return (<Box sx={{ display: "flex", justifyContent: "center" }}>
    <Box sx={{ p: 2, maxWidth: 1024 }}>
      <Grid container item
        spacing={1} sx={{ alignItems: "center", display: "flex", position: "relative" }}>
        <Grid container item {... { xs: 12 }} sx={{ position: "sticky" }}>
          <Grid item {... { xs: 6, sm: 6, md: 6, lg: 6 }}>
            <App.Label color="#87efad" text={"Nirun Tulayote"}
              size={{ xs: 18, sm: 24 }} />
          </Grid>
          <Grid item {... {
            xs: 6, sm: 6, md: 6, lg: 6,
            alignItems: "center", display: "flex",
            justifyContent: "right"
          }}>
            <Box sx={{
              ml: 1, height: 25, width: 25, "&:hover": {
                cursor: "pointer"
              }
            }}>
              <img src="/image/ig.gif"
                style={{
                  maxWidth: "100%"
                }}
                data-target="animated-image.originalImage"
                width={25}
                height={25}
                alt="images"
                loading="lazy" />
            </Box>
            <Box sx={{
              ml: 1, height: 25, width: 25, "&:hover": {
                cursor: "pointer"
              }
            }}>
              <img src="/image/fb.gif"
                style={{
                  maxWidth: "100%"
                }}
                data-target="animated-image.originalImage"
                width={25}
                height={25}
                alt="images"
                loading="lazy" />
            </Box>
            <Box sx={{
              ml: 1, height: 25, width: 25, "&:hover": {
                cursor: "pointer"
              }
            }}>
              <img src="/image/x.gif"
                style={{
                  maxWidth: "100%"
                }}
                data-target="animated-image.originalImage"
                width={25}
                height={25}
                alt="images"
                loading="lazy" />
            </Box>
            <Box sx={{
              ml: 1, height: 25, width: 25, "&:hover": {
                cursor: "pointer"
              }
            }}>
              <img src="/image/in.gif"
                style={{
                  maxWidth: "100%"
                }}
                data-target="animated-image.originalImage"
                width={25}
                height={25}
                alt="images"
                loading="lazy" />
            </Box>

          </Grid>
        </Grid>
        <Grid container item {... { xs: 12 }} sx={{ mb: 5 }}>
          <Grid item {... { xs: 12 }} sx={{ display: "flex", justifyContent: { xs: "center", sm: "end" } }}>

            <Box sx={{ width: 150, height: 150 }}>
              <video loading="lazy"
                // src="/image/programer.webm"
                muted
                loop="true" autoplay="autoplay"
                style={{ maxWidth: "100%" }}
                data-target="animated-image.originalImage"
                alt="icon"
                width={150}
                height={150}
              >
                <source src="/image/programer.webm" type="video/webm"></source>
              </video>
            </Box>
          </Grid>
          <Grid item {... { xs: 12 }} sx={{
            display: "flex", justifyContent: "center",
            alignItems: "center"
          }}>
            <Box>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <App.Label color="#87efad" text={"Hello.. I'am Nirun Tulayote"}
                  size={{ xs: 24, sm: 36 }} />
              </Box>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <App.Label color="#87efad" text={"Senior Full Stack Developer"}
                  size={{ xs: 18, sm: 24 }} />
              </Box>
            </Box>

          </Grid>



        </Grid>

        <SUMMARY {...{ inView }} />
        <TECHNICAL {...{ inView }} />

        <EXPERIENCE {...{ inView }} />
      </Grid>


    </Box >
  </Box >
  )
};

export default HomePage;
