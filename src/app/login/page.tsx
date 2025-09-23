'use client'
import { Box, Container } from "@mui/material";
import { LoginForm } from "../components/loginForm";

export default function Login() {
    return (
        <Container>
        <Box sx={{display: "flex", justifyContent: "center", alignItems: "center"}}>
            <LoginForm></LoginForm>
        </Box>
        </Container>
    )
}
