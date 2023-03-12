import React, { useState } from "react"
import Button from "@mui/material/Button"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import TextField from "@mui/material/TextField"
import FormHelperText from "@mui/material/FormHelperText"
import { Link } from "react-router-dom"
import Radio from "@mui/material/Radio"
import RadioGroup from "@mui/material/RadioGroup"
import FormControl from "@mui/material/FormControl"
import FormControlLabel from "@mui/material/FormControlLabel"

export default function CreateRoomPage() {
    const defaultVotes = 2

    const [formInfo, setFormInfo] = useState({
        guestCanPause: true,
        votesToSkip: defaultVotes,
    })

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
            .then((data) => console.log(data))
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

    return (
        <>
            <Grid container spacing={1}>
                <Grid item xs={12} align="center">
                    <Typography component="" letiant="h4">
                        Create A Room
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
                            defaultValue="true"
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
                            defaultValue={defaultVotes}
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
                </Grid>
                <Grid item xs={12} align="center">
                    <Button
                        color="primary"
                        letiant="contained"
                        onClick={roomCreate}
                    >
                        Create A Room
                    </Button>
                </Grid>
                <Grid item xs={12} align="center">
                    <Button
                        color="secondary"
                        letiant="contained"
                        to="/"
                        component={Link}
                    >
                        Back
                    </Button>
                </Grid>
            </Grid>
        </>
    )
}
