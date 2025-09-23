'use client'
import {Container, TextField, Button, Stack, Typography } from "@mui/material";
import {useState} from 'react';
import { BASE_URL, getCookie } from "../../../utils/utils";
import React from "react";

export default function Page({ params }: { params: { id: string, token: string } }) {
  const [password, setPassword] = useState<string>("")

    const cleanString = (str: string) => {
      return str.replace('%23', "")
    }

    const handleSubmit = () => {
        const csrftoken = getCookie('csrftoken') as string;
        let id = cleanString(params.id)
        let token = cleanString(params.token)
        fetch(`${BASE_URL}/reset-password/${id}/${token}/`, {
            method: 'POST',
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json; charset=UTF-8',
                'X-CSRFToken': csrftoken
                },
                body: JSON.stringify({password: password}),
              }).then((r) => {
                return r.json()
              }).then((data) => {
                console.log(data)
              })
    }

  return (
     <Container>
        <Stack sx={{display: "flex", justifyContent: "center", alignItems: "center"}} direction={'column'}>
            <Typography variant="h3" color="textPrimary">Change Password</Typography>
            <br></br>
            <form>
                <Stack direction={'column'} spacing={3}>
                    <TextField id={'password'}  label="password" variant="filled" value={password} onChange={(event) => setPassword(event.target.value)}></TextField>
                    <Button variant="contained" color="primary" onClick={handleSubmit}>Change Password</Button>
                </Stack>
            </form>
        </Stack>
        </Container>
  )
}