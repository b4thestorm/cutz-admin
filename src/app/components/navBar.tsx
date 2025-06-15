'use client'
import { Typography, Button, Box, Stack} from "@mui/material";
import Link from "next/link";
import { useRouter } from 'next/navigation'
import { useContext } from "react";
import { UserContext } from "../contexts/userContext";

export function NavBar() {
    const router = useRouter()
    const {isAuthenticated, logout, setUser } = useContext(UserContext)

    const handleLogOut = () => {
      logout();
      setUser({id: "",
      image_url: "",
      email: "",
      description: "",
      street_address: "",
      city: "",
      state: "",
      zip_code: "",
      first_name: "",
      last_name: "",
      title: "",
      role: ""
    })
      router.push('/');
    }

    const navigationJSX = () => {
      if (isAuthenticated) {
        return (
          <>
            <Button variant="outlined" sx={{color: "white"}} onClick={() => router.push('/profile')}>Profile</Button>
            <Button variant="outlined" sx={{color: "white"}} onClick={() => router.push('/services')}>Services</Button>
            <Button variant="outlined" sx={{color: "white"}} onClick={() => router.push('/calendar')}>Calendar</Button>
            <Button variant="outlined" sx={{color: "white"}} onClick={handleLogOut}>Logout</Button>
          </>
        )
      } else {
        return <Button variant="outlined" sx={{color: "white"}} onClick={() => router.push('/login')}>Login</Button>
      }
    }
    return (
        <Box sx={{display: "flex", justifyContent: "space-evenly"}}>
        <Typography variant="h1" component="h2">
          <Link href="/">Cutz</Link>
        </Typography>
        <Box sx={{alignContent: "center"}}>
          <Stack spacing={3} direction={"row"}>
            {navigationJSX()}
          </Stack>
        </Box>
        </Box>
    )
}
