import React from "react"
import {
    Grid,
    Typography,
    Card,
    IconButton,
    LinearProgress,
} from "@mui/material"

import { PlayArrow, Pause, SkipNext } from "@mui/icons-material"

export default function MusicPlayer({ song }) {
    const songProgress = song.time - song.duration

    // Only works with Spotify premium
    function playSong() {
        const requestOptions = {
            method: "Put",
            headers: {
                "Content-Type": "application/json",
            },
        }

        fetch("/spotify/play-song", requestOptions)
        console.log("Play")
    }
    function pauseSong() {
        const requestOptions = {
            method: "Put",
            headers: {
                "Content-Type": "application/json",
            },
        }

        fetch("/spotify/pause-song", requestOptions)
        console.log("Pause")
    }

    return (
        <Card>
            <Grid container alignItems="center">
                <Grid item align="center" xs={4}>
                    <img src={song.image_url} height="100%" width="100%" />
                </Grid>
                <Grid item align="center" xs={8}>
                    <Typography component="h5" variant="h5">
                        {song.title}
                    </Typography>
                    <Typography color="textSecondary" variant="subtitle1">
                        {song.artist}
                    </Typography>
                    <div>
                        <IconButton>
                            {song.is_playing ? (
                                <Pause onClick={pauseSong} />
                            ) : (
                                <PlayArrow onClick={playSong} />
                            )}
                        </IconButton>
                        <IconButton>
                            <SkipNext />
                        </IconButton>
                    </div>
                </Grid>
            </Grid>
            <LinearProgress variant="determinate" value={songProgress} />
        </Card>
    )
}

// {
//     "title": "Cura S Kvarta",
//     "artist": "Hiljson Mandela",
//     "duration": 164745,
//     "time": null,
//     "image_url": "https://i.scdn.co/image/ab67616d0000b27369a98d09e4ba1195cde64551",
//     "is_playing": true,
//     "votes": 0,
//     "id": "3ODU4yebrFpMqx2ZeJXPtQ"
// }
