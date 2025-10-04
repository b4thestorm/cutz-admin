'use client'
import {Typography, Box, Container, Stack, useMediaQuery} from "@mui/material";
import { useTheme } from '@mui/material/styles';
import Carousel from "./components/carousel";
import { useEffect } from "react";


export default function Home() {
  const theme = useTheme()
  const isMobile = ():boolean => {
      return useMediaQuery(theme.breakpoints.down('sm'));
  }

  useEffect(() => {
    const myElement = document.getElementsByTagName('body')[0]
    const currentPath = window.location.pathname
    if (currentPath === '/') {
      myElement.style.backgroundColor = '#0a0a0a';
    }
    return () => {
      myElement.style.backgroundColor = '#D3CEC4'
    }
  }, [])
  
  return (
    <Box sx={{backgroundColor: "#0a0a0a", height: "100%"}}>
      <Container sx={{height: "100%"}}>
        <br/>
        <Typography variant={"h3"}>Your Next Hair Cut, Simplified.</Typography>
        <br/>
        <br/>
      <center>
      <Box sx={{width: !useMediaQuery(theme.breakpoints.down('sm')) ? 500 : 300}}>
          <Carousel reverse={false}/>
      </Box>
      </center>
      <Stack sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: !isMobile ? 10 : 5}} direction={!useMediaQuery(theme.breakpoints.down('sm')) ? 'row' : 'column'} spacing={10}>
        <Typography sx={{width: 250}}>
          <Typography variant={'h5'} >Boost your bottom line</Typography> Keep your chair full and your calendar booked. Cutz helps you manage appointments and minimize no-shows, so you can focus on your craft, not your schedule.
        </Typography>

        <Typography sx={{width: 250}}>
          <Typography variant={'h5'}>Grow your client list</Typography> Attract new customers by making your shop easy to find and book, 24/7. Cutz puts your talent in front of a wider audience, helping you build your business effortlessly.
        </Typography>

        <Typography sx={{width: 250}}>
          <Typography variant={'h5'}>Increase client loyalty</Typography>Give your exisiting clients a simple way to retain your services. Using the companion iphone and android app, a client can instantly stay up to date with your schedule and book quickly.
        </Typography>
      </Stack>
      </Container>
    </Box>
  );
}
