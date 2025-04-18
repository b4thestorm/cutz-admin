'use client'
import { Typography, Button, Box, Stack} from "@mui/material";
import Link from "next/link";
import { useRouter } from 'next/navigation'

export function NavBar() {
    const router = useRouter()
    return (
        <Box sx={{display: "flex", justifyContent: "space-evenly"}}>
        <Typography variant="h1" component="h2">
          <Link href="/">Cutz</Link>
        </Typography>
        <Box sx={{alignContent: "center"}}>
          <Stack spacing={3} direction={"row"}>
          <Button variant="outlined" sx={{color: "white"}} onClick={() => router.push('/profile')}>Profile</Button>
          <Button variant="outlined" sx={{color: "white"}} onClick={() => router.push('/services')}>Services</Button>
          <Button variant="outlined" sx={{color: "white"}} onClick={() => router.push('/calendar')}>Calendar</Button>
          </Stack>
        </Box>
        </Box>
    )
}
