'use client';
import { Typography, Box } from "@mui/material";
import { CalendarCard } from "../components/calendarCard";
import { useState } from "react";

export default function Calendar() {
    const [enabled, setEnabled] = useState(() => {
        if (typeof window !== "undefined") {
            try {
                localStorage.getItem('cal-enabled') === "true" || false;
            } catch (error) {
                console.error("Error retrieving from localStorage:", error);
                return false
            }
        }
    })

    const renderCard = (enabled: any, setEnabled: any) => {
        return <CalendarCard isEnabled={enabled} setIsEnabled={setEnabled}/>
    }

    return (
        <Box sx={{padding: 10, display: "flex", justifyContent: "space-between"}}>
            <Typography variant="h3">Calendar</Typography>
            {enabled ? (
              <Typography variant="h5">Google Calendar is connected</Typography>     
            ): (
                renderCard(enabled, setEnabled)            
            )}

        </Box>
    )
}
