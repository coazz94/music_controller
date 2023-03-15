import React, { useState } from "react"
import { TextField, Button, Grid, Typography } from "@mui/material"
import { Link, useNavigate } from "react-router-dom"

export default function RoomJoinPage() {
    const [info, setInfo] = useState({
        roomCode: "",
        error: "",
    })

    const navigate = useNavigate()

    function handleTextFieldChange(e) {
        setInfo((prevData) => {
            return {
                ...prevData,
                roomCode: e.target.value,
            }
        })
    }

    function roomButtonPressed() {
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                code: info.roomCode,
            }),
        }

        fetch("/api/join-room", requestOptions)
            .then((response) => {
                if (response.ok) {
                    navigate(`/room/${info.roomCode}`)
                } else {
                    setInfo((prevData) => {
                        return {
                            ...prevData,
                            error: "Room not Found",
                        }
                    })
                }
            })
            .catch((error) => console.log(error))
    }

    return (
        <Grid container spacing={1} align="center">
            <Grid item xs={12}>
                <Typography variant="h4" component="h4">
                    Join a Room
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <TextField
                    error={info.error}
                    label="Code"
                    placeholder="Enter a Room Code"
                    value={info.roomCode}
                    helperText={info.error}
                    variant="outlined"
                    onChange={handleTextFieldChange}
                />
            </Grid>
            <Grid item xs={12}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={roomButtonPressed}
                >
                    Enter Room
                </Button>
            </Grid>
            <Grid item xs={12}>
                {" "}
                <Button
                    variant="contained"
                    color="secondary"
                    to="/"
                    component={Link}
                >
                    Back
                </Button>
            </Grid>
        </Grid>
    )
}
