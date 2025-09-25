import React from 'react';
import * as motion from "motion/react-client"
import Image from 'next/image'
import { Box } from '@mui/material';

export default function Carousel ({reverse}: {reverse: boolean}): React.JSX.Element {

    const imgs = [ 
        {id: 1, src: '/barberImg1.jpeg', alt: 'bkylb'}, 
        {id: 2, src: '/barberImg2.jpeg', alt: 'coffee shop'},
        {id: 3, src: '/barberImg3.jpeg', alt: 'harlem renaissance'},
        {id: 4, src: '/barberImg4.jpeg', alt: 'harlem'},
        {id: 5, src: '/barberImg5.jpeg', alt: 'harlem renaissance'}
    ]
      
    return (
        <Box style={{overflowX: 'clip', overflowY: 'clip', width: '100%', height: '100%', display: 'flex', flexDirection: 'row'}}>
            <motion.div
            initial={{ x: reverse ? "-105%" : "0%" }}
            animate={{ 
                x: reverse ? "0%" : "-100%"
            }}
            transition={{ duration: 8, delay: 1, ease: "linear", repeat: Infinity, repeatType: "loop" }}
            style={{
                display: 'flex',
                flexDirection: 'row',
                gap: '10px',
            }}
        >
            {imgs.map((photo) => {
                return <Image key={photo.id} src={photo.src} alt={''} width={150} height={150} style={{borderRadius: 5}}/>
            })}
        </motion.div>
        <motion.div
            initial={{x: reverse ? "-102%" : "1%" }}
            animate={{ 
                x: reverse ? "0%" : "-100%"
            }}
            transition={{ duration: 8, delay: 1, ease: "linear", repeat: Infinity, repeatType: "loop" }}
            style={{
                display: 'flex',
                flexDirection: 'row',
                gap: '10px',
                borderRadius: 5
            }}
        >
            {imgs.map((photo) => {
                return <Image key={photo.id} src={photo.src} alt={''} width={150} height={150} style={{borderRadius: 5}}/>
            })}
        </motion.div>
        </Box>
    )
}