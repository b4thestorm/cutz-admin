'use client';
import { Typography, Box, Container, Button, Stack } from "@mui/material";
import  CalendarSlot, { slotProps }  from "../components/calendarSlot";
import { useContext, useEffect, useState } from "react";
import { BASE_URL } from "../utils/utils";
import { CalendarContext } from "../contexts/calendarContext";

export default function Calendar() {
    const { enabled } = useContext(CalendarContext)
    const [amount, setAmount] = useState(0)
    const [slots, setSlots] = useState<slotProps[]>([])

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
            setSlots(response)
        }
      )
    }

    useEffect(() => {
        if (slots) {
            let total = 0
            for (let idx = 0; idx < slots.length; idx++) {
                total += slots[idx].service_id.price
            }
            setAmount(total)
        }
    }, [slots])

    useEffect(() => {
        requestEvents()
    }, [enabled])

    return (
        <Container>
        <Box sx={{padding: 10, display: "flex", justifyContent: "space-between"}}>
            {enabled ? (
            <>
            <Stack  direction={'column'} spacing={2}>
                <Typography variant="h5" color="black">Google Calendar is connected</Typography>
                <Stack direction={'row'} spacing={5}>
                <Box>
                    <Typography variant={'h1'}>${amount}</Typography>
                    <Typography color="black">Potential Earnings</Typography>
                </Box>
                <Box>
                    <Typography variant={'h1'}>{slots.length}</Typography>
                    <Typography color="black">Clients Booked</Typography>
                </Box>
                </Stack>
                <Button variant="contained" color="primary" onClick={() => requestEvents()}>Sync Calendar Events</Button>
            </Stack>
            {slots && slots.length > 0 ? (
              renderCalendarEvents(slots)
              ) : (
                <Typography color="black">No Calendar Events Presently</Typography>
            )}
            </>
            ): (
                <Typography color="black">No Calendar Connected</Typography>
            )}
        </Box>
        </Container>
    )
}
