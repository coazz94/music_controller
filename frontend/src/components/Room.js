import React, { useEffect, useState } from "react"
import { createBrowserRouter, useNavigate, useParams } from "react-router-dom"
import { Grid, Typography, Button } from "@mui/material"
import CreateRoomPage from "./CreateRoomPage"

export default function Room({ reset }) {
    const roomCode = useParams().roomCode
    const [roomData, setRoomData] = useState({
        votesToSkip: 2,
        guestCanPause: false,
        isHost: false,
        showSettings: false,
        spotifyAuth: false,
    })

    const navigate = useNavigate()

    function authSpotify() {
        fetch("/spotify/is_auth")
            .then((response) => response.json())
            .then((data) => {
                setRoomData((prevData) => {
                    return {
                        ...prevData,
                        spotifyAuth: data.status,
                    }
                })
                if (!data.status) {
                    fetch("/spotify/get-auth-url")
                        .then((response) => response.json())
                        .then((data) => {
                            window.location.replace(data.url)
                        })
                }
            })
    }

    function getRoomDetails() {
        fetch(`/api/get-room?code=${roomCode}`)
            .then((response) => {
                if (!response.ok) {
                    navigate("/")
                } else {
                    return response.json()
                }
            })
            .then((data) => {
                setRoomData((prevData) => {
                    return {
                        ...prevData,
                        votesToSkip: data.votes_to_skip,
                        guestCanPause: data.guest_can_pause,
                        isHost: data.is_host,
                    }
                })
                if (roomData.isHost) {
                    authSpotify()
                }
            })
    }

    function leaveButtonPressed() {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
        }

        fetch("/api/leave-room", requestOptions).then((response) => {
            if (response.ok) {
                reset()
                navigate("/")
            }
        })
    }

    function updateShowSettings(value) {
        setRoomData((prevData) => {
            return { ...prevData, showSettings: value }
        })
    }

    function renderSettings() {
        return (
            <Grid container spacing={1}>
                <Grid item xs={12} align="center">
                    <CreateRoomPage
                        update={true}
                        votesToSkip={roomData.votesToSkip}
                        guestCanPause={roomData.guestCanPause}
                        roomCode={roomCode}
                        updateCallback={() => {
                            // getRoomDetails(), updateShowSettings(false)
                            getRoomDetails()
                        }}
                    />
                </Grid>
                <Grid item xs={12} align="center">
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => updateShowSettings(false)}
                    >
                        Close
                    </Button>
                </Grid>
            </Grid>
        )
    }

    useEffect(() => {
        getRoomDetails()
    }, [roomCode, setRoomData])

    return roomData.showSettings ? (
        renderSettings()
    ) : (
        <Grid container spacing={1}>
            <Grid item xs={12} align="center">
                <Typography variant="h4" component="h4">
                    Code: {roomCode}
                </Typography>
            </Grid>
            <Grid item xs={12} align="center">
                <Typography variant="h6" component="h6">
                    Votes: {roomData.votesToSkip}
                </Typography>
            </Grid>
            <Grid item xs={12} align="center">
                <Typography variant="h6" component="h6">
                    Guest Can Pause: {roomData.guestCanPause.toString()}
                </Typography>
            </Grid>
            <Grid item xs={12} align="center">
                <Typography variant="h6" component="h6">
                    Host: {roomData.isHost.toString()}
                </Typography>
            </Grid>
            {roomData.isHost && (
                <Grid item xs={12} align="center">
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => updateShowSettings(true)}
                    >
                        Settings
                    </Button>
                </Grid>
            )}
            <Grid item xs={12} align="center">
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={leaveButtonPressed}
                >
                    Leave Room
                </Button>
            </Grid>
        </Grid>
    )
}
