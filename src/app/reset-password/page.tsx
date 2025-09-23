'use client'
import { Box, Container, TextField, Button, Stack, Typography } from "@mui/material";
import {useState} from 'react';
import { BASE_URL, getCookie } from "../utils/utils";

export default function RequestPasswordReset() {
    const [email, setEmail] = useState<string>("")
    
    const handleSubmit = () => {
        const csrftoken = getCookie('csrftoken') as string;
        fetch(`${BASE_URL}/send-reset-link`, {
            method: 'POST',
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json; charset=UTF-8',
                'X-CSRFToken': csrftoken
                },
                body: JSON.stringify({email: email}),
              }).then((r) => {
                return r.json()
              })
    }
    return (
        <Container>
        <Stack sx={{display: "flex", justifyContent: "center", alignItems: "center"}} direction={'column'}>
            <Typography variant="h3" color="textPrimary">Request Password Change</Typography>
            <br></br>
            <form>
                <Stack direction={'column'} spacing={3}>
                    <TextField id={'email'}  label="email" variant="filled" value={email} onChange={(event) => setEmail(event.target.value)}></TextField>
                    <Button variant="contained" color="primary" onClick={handleSubmit}>Send Password Change Link</Button>
                </Stack>
            </form>
        </Stack>
        </Container>
    )
}
