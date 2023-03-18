import React, { useEffect, useState } from "react"
import RoomJoinPage from "./RoomJoinPage"
import CreateRoomPage from "./CreateRoomPage"
import Room from "./Room"
import { BrowserRouter, Route, Routes, Link, Navigate } from "react-router-dom"
import { Grid, Typography, ButtonGroup, Button } from "@mui/material"

export default function Homepage() {
    const [roomCode, setRoomCode] = useState({
        roomCode: null,
    })

    useEffect(() => {
        fetch("/api/user-in-room")
            .then((response) => response.json())
            .then(
                (data) =>
                    data !== null &&
                    setRoomCode((prevData) => {
                        return {
                            ...prevData,
                            roomCode: data.code,
                        }
                    })
            )
    }, [])

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    exact
                    path="/"
                    element={<HomepageView roomCode={roomCode} />}
                    // roomCode.roomCode == null ? (
                    //     <HomepageView />
                    // ) : (
                    //     <Navigate to={`/room/${roomCode.roomCode}`} />
                    // )
                />
                <Route path="/join" element={<RoomJoinPage />} />
                <Route path="/create" element={<CreateRoomPage />} />
                <Route path="/room/:roomCode" element={<Room />} />
            </Routes>
        </BrowserRouter>
    )
}

function HomepageView({ roomCode }) {
    // console.log(roomCode)

    return roomCode.roomCode == null ? (
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
    ) : (
        <Navigate to={`/room/${roomCode.roomCode}`} />
    )
}
