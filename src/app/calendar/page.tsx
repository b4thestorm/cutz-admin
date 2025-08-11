import { Typography, Box } from "@mui/material";
import { CalendarCard } from "../components/calendarCard";

export default function Calendar() {
    return (
        <Box sx={{padding: 10, display: "flex", justifyContent: "space-between"}}>
            <Typography variant="h3">Calendar</Typography>
            <CalendarCard />
        </Box>
    )
}
