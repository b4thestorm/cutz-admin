'use client';
import { Typography, Box } from "@mui/material";
import { CalendarCard } from "../components/calendarCard";
import { useState } from "react";

export default function Calendar() {
    const [enabled, setEnabled] = useState(() => {
        return localStorage.getItem('enabled') === "true" || false;
        // let state = localStorage.getItem(`${type}`)
        // return (state === "true")
    })

    return (
        <Box sx={{padding: 10, display: "flex", justifyContent: "space-between"}}>
            <Typography variant="h3">Calendar</Typography>
            {enabled ? (
                <Typography variant="h5">Google Calendar is connected</Typography>
            ): (
                <CalendarCard isEnabled={enabled} setIsEnabled={setEnabled}/>
            )}

        </Box>
    )
}
