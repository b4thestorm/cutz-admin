'use client'

import useSWR from 'swr'
import { Typography, Box, Container, Stack } from "@mui/material";
import {useState} from 'react';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import {ServiceCard, serviceCardProps} from '../components/serviceCard';
import { ServiceFormDialog } from "../components/serviceForm";


export default function Services() {
    const [visible, setVisible] = useState(false)

    const getServices = (path: string): Promise<any> => {
        return fetch(`http://localhost:8000/${path}`, {
            method: "GET",
            headers: {
                'Accept': "application/json",
                'Content-Type': 'application/json',
            },
        }).then((resp) => {
            return resp.json()
        })
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    const deleteService = (id: number) => {
        const response = confirm("Are you sure you want to delete this service?")
        if (response) {
          // eslint-disable-next-line @typescript-eslint/no-unused-expressions
          fetch(`http://localhost:8000/services/${id}`, {
          method: "DELETE",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          }
        })
        }
    }
    
    let { data: services, isLoading } = useSWR('services/', getServices, {revalidateOnFocus: true,});
    const { mutate } = useSWR('services/', getServices)

    const displayServices = (services: any) => {
            return (
            <Stack direction={"column"} spacing={3}>
            {services?.map((service: serviceCardProps) => {
                    return <ServiceCard service={service} key={service.id} deleteService={deleteService} mutate={mutate}/>
            })}
            </Stack>
        )
    }
    
    return (
        <Container>
        <Box sx={{padding: 10, display: "flex", justifyContent: "space-between"}}>
        <Typography variant={"h2"}>Services</Typography>
        <IconButton onClick={() => setVisible(!visible)}>
            <AddIcon fontSize="large" color={"error"}></AddIcon>
        </IconButton>
        </Box>
        <Box>
            {isLoading ? (
                <Typography>We have no Swag Yet</Typography>
            ) : (
                displayServices(services)
            )}
        </Box>
        <ServiceFormDialog visibility={visible} setVisible={setVisible}/>
        </Container>
    )
}
