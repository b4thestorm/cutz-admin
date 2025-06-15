import { Button, Box, Stack, TextField, Card } from "@mui/material";
import { redirect } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/userContext";
import { getCookie } from '../utils/utils';



export function LoginForm() {
    const [credentials, setCredentials] = useState({email: "", password: ""})
    const { setUser, setIsAuthenticated , isAuthenticated } = useContext(UserContext)

    const handleChange = (event: React.SyntheticEvent<EventTarget>) => {
        const element = event.target as HTMLInputElement
        setCredentials({...credentials, [element.id]: element.value})
    }
    const mapUser = (payload: any) => {
      return {
        id: payload.id,
        image_url: payload.image_url,
        email: payload.email,
        description: payload.description,
        street_address: payload.street_address,
        city: payload.city,
        state: payload.state,
        zip_code: payload.zip_code,
        first_name: payload.first_name,
        last_name: payload.last_name,
        title: payload.title,
        role: payload.role
      }
    }

    const handleSubmit = async () => {
      const csrftoken = getCookie('csrftoken') as string;
      const formData = JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      })

      fetch(`http://localhost:8000/login`, {
        credentials: 'include',
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json; charset=UTF-8',
          'X-CSRFToken': csrftoken
        },
        body: formData,
      }).then((r) => {
        return r.json()
      }).then((data) => {
        const user = mapUser(data)
        setUser(user)
        setIsAuthenticated((prevState) => !prevState);
        window.localStorage.setItem('user', JSON.stringify(user))
        redirect('/profile')
      })
    }

    return (
      <Card sx={{height: 250, width: 250, marginTop: 20}}>
            <form>
            <Box sx={{display: "flex", flexDirection:"column", justifyContent: "space-evenly", alignContent: "flex-end", paddingLeft: 5, paddingRight:5, width: 250, height: 250}}>
                <TextField id="email" label="email" variant="outlined" value={credentials.email} onChange={(event) => handleChange(event)} required/>
                <TextField id="password" label="password" variant="outlined" value={credentials.password} onChange={(event) => handleChange(event)}></TextField>
                <Button variant="contained" color="primary" onClick={handleSubmit}>Login</Button>
            </Box>
            </form>
        
      </Card>
    )
}