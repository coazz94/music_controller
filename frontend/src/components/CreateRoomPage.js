import React, { useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import {
    FormControlLabel,
    FormControl,
    RadioGroup,
    Radio,
    FormHelperText,
    TextField,
    Typography,
    Grid,
    Button,
    Collapse,
    Alert,
} from "@mui/material"

export default function CreateRoomPage({
    update,
    votesToSkip,
    guestCanPause,
    roomCode,
    updateCallback,
}) {
    const defaultVotes = 2

    const [formInfo, setFormInfo] = useState({
        guestCanPause: true,
        votesToSkip: defaultVotes,
    })

    const [errMsg, setErrMsg] = useState("")

    const navigate = useNavigate()

    function handleVotesChange(e) {
        setFormInfo((prevData) => {
            return {
                ...prevData,
                votesToSkip: parseInt(e.target.value),
            }
        })
    }

    function handleGuestCanPauseChange(e) {
        setFormInfo((prevData) => {
            return {
                ...prevData,
                guestCanPause: e.target.value === "true" ? true : false,
            }
        })
    }

    // Added csrfToken functionality
    function roomCreate() {
        // use the useNavigate Hook
        let csrfToken = getCookie("csrftoken")

        const requestOptions = {
            method: "Post",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": csrfToken,
            },
            body: JSON.stringify({
                votes_to_skip: formInfo.votesToSkip,
                guest_can_pause: formInfo.guestCanPause,
            }),
        }
        fetch("/api/create-room", requestOptions)
            .then((response) => response.json())
            .then((data) => navigate(`/room/${data.code}`))
    }

    function updateRoom() {
        // use the useNavigate Hook
        // let csrfToken = getCookie("csrftoken")
        const requestOptions = {
            method: "Patch",
            headers: {
                "Content-Type": "application/json",
                // "X-CSRFToken": csrfToken,
            },
            body: JSON.stringify({
                votes_to_skip: formInfo.votesToSkip,
                guest_can_pause: formInfo.guestCanPause,
                code: roomCode,
            }),
        }
        fetch("/api/update-room", requestOptions).then((response) => {
            if (response.ok) {
                setErrMsg(() => "Success")
            } else {
                setErrMsg(() => "Error")
            }
            updateCallback()
        })
    }

    // The following function are copying from
    // https://docs.djangoproject.com/en/dev/ref/csrf/#ajax
    function getCookie(name) {
        let cookieValue = null
        if (document.cookie && document.cookie !== "") {
            let cookies = document.cookie.split(";")
            for (let i = 0; i < cookies.length; i++) {
                let cookie = cookies[i].trim()
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === name + "=") {
                    cookieValue = decodeURIComponent(
                        cookie.substring(name.length + 1)
                    )
                    break
                }
            }
        }
        return cookieValue
    }

    function renderCreateButtons() {
        return (
            <Grid container spacing={1}>
                <Grid item xs={12} align="center">
                    <Button
                        color="primary"
                        variant="contained"
                        onClick={roomCreate}
                    >
                        Create A Room
                    </Button>
                </Grid>
                <Grid item xs={12} align="center">
                    <Button
                        color="secondary"
                        variant="contained"
                        to="/"
                        component={Link}
                    >
                        Back
                    </Button>
                </Grid>
            </Grid>
        )
    }

    function renderUpdateButtons() {
        return (
            <Grid container spacing={1}>
                <Grid item xs={12} align="center">
                    <Button
                        color="primary"
                        variant="contained"
                        onClick={updateRoom}
                    >
                        Update This Room
                    </Button>
                </Grid>
            </Grid>
        )
    }

    return (
        <>
            <Grid container spacing={1}>
                <Grid item xs={12} align="center">
                    <Collapse in={errMsg != ""}>
                        <Alert
                            severity={
                                errMsg === "Success" ? "success" : "error"
                            }
                            onClose={() => {
                                setErrMsg(() => "")
                            }}
                        >
                            {errMsg}
                        </Alert>
                    </Collapse>
                </Grid>
                <Grid item xs={12} align="center">
                    <Typography component="" variant="h4">
                        {update ? "Update A Room" : "Create A Room"}
                    </Typography>
                </Grid>
                <Grid item xs={12} align="center">
                    <FormControl>
                        <FormHelperText>
                            <div align="center">
                                Guest Control of Playback state
                            </div>
                        </FormHelperText>
                        <RadioGroup
                            row
                            defaultValue={update ? guestCanPause : "true"}
                            onChange={handleGuestCanPauseChange}
                        >
                            <FormControlLabel
                                value="true"
                                control={<Radio color="primary" />}
                                label="Play/Pause"
                                labelPlacement="bottom"
                            />
                            <FormControlLabel
                                // value="true"
                                control={<Radio color="secondary" />}
                                label="No Control"
                                labelPlacement="bottom"
                            />
                        </RadioGroup>
                    </FormControl>
                </Grid>
                <Grid item xs={12} align="center">
                    <FormControl>
                        <TextField
                            required={true}
                            type="number"
                            defaultValue={update ? votesToSkip : defaultVotes}
                            inputProps={{
                                min: 1,
                                style: { textAlign: "center" },
                            }}
                            onChange={handleVotesChange}
                        />
                        <FormHelperText>
                            <div align="center">
                                Votes Required to Skip Song
                            </div>
                        </FormHelperText>
                    </FormControl>
                    {update ? renderUpdateButtons() : renderCreateButtons()}
                </Grid>
            </Grid>
        </>
    )
}
