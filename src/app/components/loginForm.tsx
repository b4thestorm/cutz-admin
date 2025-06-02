import { Button, Box, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";

export function LoginForm() {
    const [credentials, setCredentials] = useState({firstname: null, password: null})
    
    const handleChange = (event: React.SyntheticEvent<EventTarget>) => {
        const element = event.target as HTMLInputElement
        setCredentials({...credentials, [element.id]: element.value})
    }
    const handleSubmit = () => {
        
    }

    return (
        <Box sx={{display: "flex", justifyContent: "space-evenly"}}>
        <Typography variant="h1" component="h2">
          <Typography>Login</Typography>
        </Typography>
        <Box sx={{alignContent: "center"}}>
          <Stack spacing={3} direction={"column"}>
            <form>
                <TextField id="first_name" label="first name" variant="outlined" value={credentials.firstname} onChange={(event) => handleChange(event)} required/>
                <TextField id="passowrd" label="password" variant="outlined" value={credentials.password} onChange={(event) => handleChange(event)}></TextField>
                <Button variant="contained" color="success" onClick={handleSubmit}>Login</Button>
            </form>
          </Stack>
        </Box>
        </Box>
    )
}