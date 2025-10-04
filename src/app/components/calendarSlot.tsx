import { Typography, Box, Button} from "@mui/material";

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
    start_time: string;
    end_time: string;
    service_id: serviceProp;
}

export default function CalendarSlot({calendar_event}: {calendar_event :slotProps}) {           
    return (
        <Box sx={{display: "flex", width:350, justifyContent: "space-between", backgroundColor: '#D9D9D9', marginTop: 5,  border: '1px solid grey', padding: '15px'}}>
            <Box>
                {/* <Typography variant={'h5'} color={'black'}>{calendar_event.first_name}</Typography> */}
                <Typography color={'black'}>{calendar_event.start_time}</Typography>
                <Typography color={'black'}>{calendar_event.service_id.title}</Typography>
            </Box>
            <Box sx={{alignSelf: 'center'}}>
                <Button variant={'contained'} color={'error'} sx={{borderRadius: 19}}>Cancel</Button>
            </Box>
        </Box>     
    )
}
