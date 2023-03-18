import React, { useEffect, useState } from "react"
import RoomJoinPage from "./RoomJoinPage"
import CreateRoomPage from "./CreateRoomPage"
import Room from "./Room"
import { BrowserRouter, Route, Routes, Link, Navigate } from "react-router-dom"
import { Grid, Typography, ButtonGroup, Button } from "@mui/material"

export default function Homepage() {
    const [roomCode, setRoomCode] = useState(null)

    useEffect(() => {
        fetch("/api/user-in-room")
            .then((response) => response.json())
            .then((data) => data !== null && setRoomCode(() => data.code))
    }, [])

    function resetRoomCode() {
        setRoomCode(() => null)
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    exact
                    path="/"
                    element={
                        roomCode == null ? (
                            <HomepageView />
                        ) : (
                            <Navigate to={`/room/${roomCode}`} />
                        )
                    }
                />
                <Route path="/join" element={<RoomJoinPage />} />
                <Route path="/create" element={<CreateRoomPage />} />
                <Route
                    path="/room/:roomCode"
                    element={<Room reset={resetRoomCode} />}
                />
            </Routes>
        </BrowserRouter>
    )
}

function HomepageView() {
    return (
        <Grid container spacing={3}>
            <Grid item xs={12} align="center">
                <Typography variant="h3" compact="h3">
                    House Party
                </Typography>
            </Grid>
            <Grid item xs={12} align="center">
                <ButtonGroup
                    disableElevation
                    variant="contained"
                    color="primary"
                >
                    <Button color="primary" to="/join" component={Link}>
                        Join a Room
                    </Button>
                    <Button color="secondary" to="/create" component={Link}>
                        Create a Room
                    </Button>
                </ButtonGroup>
            </Grid>
        </Grid>
    )
}
