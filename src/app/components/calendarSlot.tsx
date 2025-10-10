import { Typography, Box, Button, Stack} from "@mui/material";
import { formatAtHour } from "../utils/utils";

export interface serviceProp {
    id: number;
    title: string;
    description: string;
    image_url: string;
    price: number;
    barber: number;
}

export interface slotProps {
    eventid: string;
    name: string;
    start_time: string;
    end_time: string;
    service_id: serviceProp;
}

export default function CalendarSlot({calendar_event}: {calendar_event :slotProps}) {  
    return (
        <Box sx={{display: "flex", justifyContent: "space-between", width: 350, backgroundColor: '#D9D9D9', marginTop: 5, borderRadius: 1, border: '1px solid grey', padding: '15px'}}>
            <Stack direction={'column'}>
            <Typography color={'black'}>{calendar_event.service_id.title}</Typography>
            <Stack direction="row">
                <Typography color={'black'}>Appointment with {calendar_event.name} </Typography>
                <Typography color={'black'}>{formatAtHour(calendar_event.start_time)}</Typography>
            </Stack>
            </Stack>
            <Box sx={{alignSelf: 'center'}}>
                <Button color={'error'}>Cancel</Button>
            </Box>
        </Box>     
    )
}
