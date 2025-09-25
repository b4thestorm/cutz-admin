import { Typography, Box, Button} from "@mui/material";
import { useEffect, useState } from "react";
import { BASE_URL } from "../utils/utils";

export interface slotProps {
    id: number;
    first_name: string;
    start_time: string;
    service_id: number;
}

export default function CalendarSlot({slot}: {slot :slotProps}) {
    const [service, setService] = useState<any>(null)
    
    useEffect(()=> {
        fetch(`${BASE_URL}/services/${slot.service_id}/`, {
            credentials: 'include',
            method: 'GET',
        }).then((response) => {
            return response.json
        }).then((data) => {
            setService(data)
        })
    }, []) 
        

    return (
        <Box sx={{display: "flex", width:350, justifyContent: "space-between", backgroundColor: '#D9D9D9', marginTop: 5, borderRadius: 10, border: '5px solid grey', padding: '15px'}}>
            <Box>
                <Typography variant={'h5'} color={'black'}>{slot.first_name}</Typography>
                <Typography color={'black'}>{slot.start_time}</Typography>
                <Typography color={'black'}>{service?.title || 'Dark Caesar'}</Typography>
            </Box>
            <Box sx={{alignSelf: 'center'}}>
                <Button variant={'contained'} color={'error'} sx={{borderRadius: 19}}>Cancel</Button>
            </Box>
        </Box>     
    )
}
