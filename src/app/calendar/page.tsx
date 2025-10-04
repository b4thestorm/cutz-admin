'use client';
import { Typography, Box, Container, Button, Stack } from "@mui/material";
import { CalendarCard } from "../components/calendarCard";
import  CalendarSlot, { slotProps }  from "../components/calendarSlot";
import { useEffect, useState } from "react";
import { BASE_URL } from "../utils/utils";

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
    
    const [slots, setSlots] = useState<slotProps[]>([])
    // {id: 2, first_name: 'Arnold', start_time: '9am', service_id: 2},

    const renderCard = (enabled: any, setEnabled: any) => {
        return <CalendarCard isEnabled={enabled} setIsEnabled={setEnabled}/>
    }

    const renderCalendarEvents = (calendar_events: slotProps[]) => {
        console.log("I was called and passed to the stack", calendar_events)
        return (
        <Stack  direction={'column'}>
            {calendar_events.map((slot: slotProps) => {
                return <CalendarSlot key={slot.eventid} calendar_event={slot}/>
            })}
        </Stack>
        )
    }

    const disconnect = () => {
        //simply remove enabled from localStorage and that disables the view
        localStorage.removeItem('enabled')
        setEnabled(false)
    }

    const requestEvents = () => {
        fetch(`${BASE_URL}/integrations/calendar_events/`,{
        method: "GET",
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
        }).then((r) => {
            if (!r.ok) {
                const contentType = r.headers.get('Content-Type')
                if (contentType && contentType.includes('application/json')) {
                    if (r.status == 403) {
                        console.log('No events currently')
                    }
                    return r.json().then((json) => Promise.reject(json))
                }
                throw new Error('Something went horribly wrong 💩')
            }
            return r.json()
        }).then((response) => {
            console.log(response)
            setSlots(response)
            if (response.ok) {
                console.log(response)
                setSlots(response)
            }
        }
      )
    }

    return (
        <Container>
        <Box sx={{padding: 10, display: "flex", justifyContent: "space-between"}}>
            {enabled ? (
            <>
            <Stack  direction={'column'} spacing={2}>
                <Typography variant="h5" color="black">Google Calendar is connected</Typography>
                <Button variant="contained" color="error" onClick={() => disconnect()}>Disconnect</Button>
                <Button variant="contained" color="primary" onClick={() => requestEvents()}>Sync Calendar Events</Button>
            </Stack>
            {slots && slots.length > 0 ? (
              renderCalendarEvents(slots)
              ) : (
                <Typography color="black">No Calendar Events Presently</Typography>
            )}
            </>
            ): (
                renderCard(enabled, setEnabled)            
            )}
        </Box>
        </Container>
    )
}
