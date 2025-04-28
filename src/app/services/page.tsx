'use client'

import { Typography, Box, Container, Stack } from "@mui/material";
import {useState, useEffect} from 'react';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import {ServiceCard, serviceCardProps} from '../components/serviceCard';
import { ServiceFormDialog } from "../components/serviceForm";

export default function Services() {
    const [services, setServices] = useState<[serviceCardProps]>([{id: 0, title: "", description: "", price: "", image_url: ""}])
    const [visible, setVisible] = useState(false)
    const getServices = async () => {
        //pull services from the api for the barber
        await fetch('http://localhost:8000/services/', {
            method: "GET",
            headers: {
                'Accept': "application/json",
                'Content-Type': 'application/json',
            }
        }).then(async (resp) => {
            setServices(await resp.json())
        })
        
    }
    
    useEffect(()=> {
        getServices()
    }, [])  
    
    return (
        <Container>
        <Box sx={{padding: 10, display: "flex", justifyContent: "space-between"}}>
        <Typography variant={"h2"}>Services</Typography>
        <IconButton onClick={() => setVisible(!visible)}>
            <AddIcon fontSize="large" color={"error"}></AddIcon>
        </IconButton>
        </Box>
        <Box>
            { services.length < 1 ? (
                <Typography>We have no Swag Yet</Typography>
            ) : (
                <Stack direction={"column"} spacing={3}>
                {services.map(service => {
                    return <ServiceCard service={service} key={service.id}/>
                })}
                </Stack>
            )}
        </Box>
        <ServiceFormDialog visibility={visible} setVisible={setVisible}/>
        </Container>
    )
}
