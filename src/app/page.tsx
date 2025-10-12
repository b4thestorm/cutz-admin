'use client'
import { useMediaQuery } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import { useEffect } from "react";

import IntroContent from "./content/IntroContent.json";
import MiddleBlockContent from "./content/MiddleBlockContent.json";
import AboutContent from "./content/AboutContent.json";
import MissionContent from "./content/MissionContent.json";
import ProductContent from "./content/ProductContent.json";

import { MiddleBlock } from "./components/landingPage/MiddleBlock";  
import  Container  from "./common/Container";
import  ScrollToTop  from  "./common/ScrollToTop";
import { ContentBlock } from "./components/landingPage/ContentBlock";

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
     <Container>
      <ScrollToTop />
      <ContentBlock
        direction="right"
        title={IntroContent.text}
        content={""}
        button={IntroContent.button}
        img={'/barberImg3.jpeg'}
        icon="developer.svg"
        id="intro"
      />
      <ContentBlock
        direction="left"
        title={AboutContent.title}
        content={AboutContent.text}
        img={'/barberImg5.jpeg'}
        icon="graphs.svg"
        id="about"
      />
      <ContentBlock
        direction="right"
        title={MissionContent.title}
        content={MissionContent.text}
        img={'/barberImg2.jpeg'}
        icon="product-launch.svg"
        id="mission"
      />
      <ContentBlock
        direction="left"
        title={ProductContent.title}
        content={ProductContent.text}
        img={'/barberImg1.jpeg'}
        icon="waving.svg"
        id="product"
      />
      <MiddleBlock
        title={MiddleBlockContent.title}
        content={MiddleBlockContent.text}
        button={MiddleBlockContent.button}
      />
    </Container>
  );
}
