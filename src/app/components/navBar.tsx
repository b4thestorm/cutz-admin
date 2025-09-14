'use client'
import { Typography, Button, Box, Stack,  Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import Link from "next/link";
import { useRouter } from 'next/navigation'
import { Fragment, JSX, useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/userContext";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

export function NavBar() {
    const theme = useTheme();
    const router = useRouter()
    const {isAuthenticated, logout } = useContext(UserContext)
    const [open, setOpen] = useState(false)
    
    const isMobile = ():boolean => {
      return useMediaQuery(theme.breakpoints.down('sm'));
    }

    const toggleDrawer = (newOpen: boolean) => () => {
      setOpen(newOpen);
    };

    const mobileNavBar = (): JSX.Element => {
      return (
          <Box sx={{ width: 250 }} role="presentation">
            <List>
                {['Profile', 'Services', 'Calendar', 'Logout'].map((text) => (
                <ListItem key={text} disablePadding>
                  <ListItemButton onClick={() => {
                    setOpen(false);
                    router.push(`/${text.toLowerCase()}/`)
                  }}>
                    <ListItemText primary={text} />
                  </ListItemButton>
                </ListItem>
            ))}
            </List>
          </Box>
      )
    }

    const loggedIn = (): JSX.Element => {
      if (isAuthenticated) {
        return <Button variant="outlined"  sx={{color: "white", maxHeight: 50, alignSelf: "center"}} onClick={toggleDrawer(true)}> Menu </Button>
      } else {
        return <Button sx={{color: "white", maxHeight: 50, alignSelf: "center"}} onClick={() => router.push('/login')}>Login</Button>
      }
    }

    const navigationJSX = (): JSX.Element => {
      if (isAuthenticated) {
        return (
          <>
            <Button variant="outlined" sx={{color: "white"}} onClick={() => router.push('/profile')}>Profile</Button>
            <Button variant="outlined" sx={{color: "white"}} onClick={() => router.push('/services')}>Services</Button>
            <Button variant="outlined" sx={{color: "white"}} onClick={() => router.push('/calendar')}>Calendar</Button>
            <Button variant="outlined" sx={{color: "white"}} onClick={() => logout()}>Logout</Button>
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
        {isMobile() ? (
            <>
            <Fragment>{loggedIn()}</Fragment>
            <Drawer open={open} onClose={toggleDrawer(false)}>
            {mobileNavBar()}
            </Drawer>
            </>
          ) : (
            <Box sx={{alignContent: "center"}}>
              <Stack spacing={3} direction={"row"}>
                {navigationJSX()}
              </Stack>
            </Box>
          )}
        </Box>
    )
}
