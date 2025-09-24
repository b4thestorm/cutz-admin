import { Button, Box, TextField, Card, Link, Popper, Typography } from "@mui/material";
import { redirect } from "next/navigation";
import { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../contexts/userContext";
import { BASE_URL, getCookie, mapUser } from '../utils/utils';
import React from "react";



export function LoginForm() {
    const [credentials, setCredentials] = useState({email: "", password: ""})
    const { setUser, setProfile, setIsAuthenticated } = useContext(UserContext)
    const formElement = useRef(null)
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
    const [open, setOpen] = useState(false)
    const [error, setError] = useState('')

    const handleChange = (event: React.SyntheticEvent<EventTarget>) => {
        const element = event.target as HTMLInputElement
        setCredentials({...credentials, [element.id]: element.value})
    }
   
    const handleSubmit = async (event: React.SyntheticEvent<EventTarget>) => {
      const csrftoken = getCookie('csrftoken') as string;
      const formData = JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      })

      fetch(`${BASE_URL}/login`, {
        credentials: 'include',
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json; charset=UTF-8',
          'X-CSRFToken': csrftoken
        },
        body: formData,
      }).then((r) => {
         if (!r.ok) {
          // check if there was JSON
          const contentType = r.headers.get('Content-Type')
          if (contentType && contentType.includes('application/json')) {
            setOpen(true)
            setAnchorEl(formElement.current);
            if (r.status == 403) {
              setError('No account found, check email and password')
            }
            return r.json().then((json) => Promise.reject(json))
          }
          throw new Error('Something went horribly wrong 💩')
        }
        return r.json()
      }).then((data) => {
        const user = mapUser(data)
        setUser(user)
        setProfile(user)
        localStorage.setItem('user', JSON.stringify(user))
        setIsAuthenticated((prevState) => !prevState)
        redirect('/profile')
      })
    }

    useEffect(()=> {
      if (open) {
        setTimeout(() => {
          setOpen(false)
        }, 1000)
      }
    }, [open])

    return (
      <Card sx={{height: 250, width: 250, marginTop: 20}}>
          <Popper open={open} anchorEl={anchorEl}>
          <Box sx={{ border: 1, p: 1, bgcolor: 'red' }}>
            <Typography>{error}</Typography>
          </Box>
          </Popper>
            <form>
            <Box sx={{display: "flex", flexDirection:"column", justifyContent: "space-evenly", alignContent: "flex-end", paddingLeft: 5, paddingRight:5, width: 250, height: 250}} ref={formElement}>
                <TextField id="email" label="email" variant="outlined" value={credentials.email} onChange={(event) => handleChange(event)} />
                <TextField id="password" label="password" variant="outlined" value={credentials.password} onChange={(event) => handleChange(event)} type="password"></TextField>
                <Button variant="contained" color="primary" onClick={(event) => handleSubmit(event)}>Login</Button>
                <Link href={"/reset-password"} sx={{alignSelf: 'flex-end'}}>Forgot my password</Link>
            </Box>
            </form>
      </Card>
    )
}