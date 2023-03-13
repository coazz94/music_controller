import React, { useState } from "react"
import { TextField, Button, Grid, Typography } from "@mui/material"
import { Link } from "react-router-dom"

export default function RoomJoinPage() {
    const [info, setInfo] = useState({
        roomCode: "",
        error: "",
    })

    function handleTextFieldChange(e) {
        setInfo((prevData) => {
            return {
                ...prevData,
                roomCode: e.target.value,
            }
        })
    }

    function roomButtonPressed() {
        console.log(info)
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
