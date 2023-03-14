import React, { useEffect, useState } from "react"
import { createBrowserRouter, useParams } from "react-router-dom"

export default function Room() {
    const roomCode = useParams().roomCode
    const [roomData, setRoomData] = useState({
        votesToSkip: 2,
        guestCanPause: false,
        isHost: false,
    })

    function getRoomDetails() {
        fetch(`/api/get-room?code=${roomCode}`)
            .then((response) => response.json())
            .then((data) =>
                setRoomData((prevData) => {
                    return {
                        ...prevData,
                        votesToSkip: data.votes_to_skip,
                        guestCanPause: data.guest_can_pause,
                        isHost: data.is_host,
                    }
                })
            )
    }

    // useEffect(() => {
    //     getRoomDetails()
    // }, [roomCode, setRoomData])
    // useEffect(() => {
    //     getRoomDetails()
    // }, [roomCode])

    return (
        <>
            <h3>Room Code: {roomCode}</h3>
            <p> Votes: {roomData.votesToSkip}</p>
            <p> Guest Can Pause: {roomData.guestCanPause.toString()}</p>
            <p> Is HOST: {roomData.isHost.toString()}</p>
        </>
    )
}
