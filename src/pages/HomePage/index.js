
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
              width: 30,
              "&:hover": {
                cursor: "pointer"
                // width: "105px",
                // "& .text": {
                //   // width: "80px",
                //   // display: "flex"
                // }
              },
              // transition: "width .5s ease",
              // display: "flex"
            }}>
              <img src="https://user-images.githubusercontent.com/74038190/235294010-ec412ef5-e3da-4efa-b1d4-0ab4d4638755.gif"
                style={{
                  maxWidth: "100%"
                }}
                data-target="animated-image.originalImage"></img>
            </Box>
            <Box sx={{
              width: 30, "&:hover": {
                cursor: "pointer"
              }
            }}>
              <img src="https://user-images.githubusercontent.com/74038190/235294011-b8074c31-9097-4a65-a594-4151b58743a8.gif"
                style={{
                  maxWidth: "100%"
                }}
                data-target="animated-image.originalImage" />
            </Box>
            <Box sx={{
              width: 30, "&:hover": {
                cursor: "pointer"
              }
            }}>
              <img src="https://user-images.githubusercontent.com/74038190/235294012-0a55e343-37ad-4b0f-924f-c8431d9d2483.gif"
                style={{
                  maxWidth: "100%"
                }}
                data-target="animated-image.originalImage" />
            </Box>
            <Box sx={{
              width: 30, "&:hover": {
                cursor: "pointer"
              }
            }}>
              <img src="https://user-images.githubusercontent.com/74038190/235294013-a33e5c43-a01c-43f6-b44d-a406d8b4ab75.gif"
                style={{
                  maxWidth: "100%"
                }}
                data-target="animated-image.originalImage" />
            </Box>
          </Grid>
        </Grid>
        <Grid container item {... { xs: 12 }} sx={{ mb: 5 }}>
          <Grid item {... { xs: 12 }} sx={{ display: "flex", justifyContent: { xs: "center", sm: "end" } }}>
            <Box sx={{ width: 150 }}>
              <img loading="lazy"
                src="/image/programer.gif"
                style={{ maxWidth: "100%" }}
                data-target="animated-image.originalImage"
                alt="icon">
              </img>
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
