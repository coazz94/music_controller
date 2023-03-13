import React, { useState } from "react"
import { useParams } from "react-router-dom"

export default function Room() {
    const [info, setInfo] = useState({
        votesToSkip: 2,
        guestCanPause: false,
        isHost: false,
    })

    const roomCode = useParams().roomCode

    return (
        <>
            <h3>Room Code: {roomCode}</h3>
            <p> Votes: {info.votesToSkip}</p>
            <p> Guest Can Pause: {info.guestCanPause}</p>
            <p> Is HOST {info.isHost}</p>
        </>
    )
}
