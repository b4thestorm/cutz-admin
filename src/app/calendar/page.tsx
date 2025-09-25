'use client';
import { Typography, Box, Container, Button, Stack } from "@mui/material";
import { CalendarCard } from "../components/calendarCard";
import  CalendarSlot  from "../components/calendarSlot";
import { useState } from "react";

export default function Calendar() {
    const [enabled, setEnabled] = useState(() => {
        if (typeof window !== "undefined") {
            try {
                return localStorage.getItem('enabled') === "true" || false;
            } catch (error) {
                console.error("Error retrieving from localStorage:", error);
                return false
            }
        }
    })

    const slots = [{id: 2, first_name: 'Arnold', start_time: '9am', service_id: 2}, {id: 1, first_name: 'Arnold', start_time: '10am', service_id: 2}, {id: 6, first_name: 'Arnold', start_time: '11am', service_id: 3}]

    const renderCard = (enabled: any, setEnabled: any) => {
        return <CalendarCard isEnabled={enabled} setIsEnabled={setEnabled}/>
    }

    return (
        <Container>
        
        <Box sx={{padding: 10, display: "flex", justifyContent: "space-between"}}>
            {enabled ? (
            <>
              <Box>
                <Typography variant="h5" color="black">Google Calendar is connected</Typography>     
                <Button variant="contained" color="error">Disconnect</Button>
              </Box>
              <Stack  direction={'column'}>
              {slots.map((slot, idx) => {
                return <CalendarSlot key={idx} slot={slot}/>
              })}
              </Stack>
            </>
            ): (
                renderCard(enabled, setEnabled)            
            )}
        </Box>
        </Container>
    )
}
