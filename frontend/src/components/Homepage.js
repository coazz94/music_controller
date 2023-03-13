import React from "react"
import RoomJoinPage from "./RoomJoinPage"
import CreateRoomPage from "./CreateRoomPage"
import Room from "./Room"
import { BrowserRouter, Route, Routes, Router } from "react-router-dom"

export default function Homepage() {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<h1>this is the Homepage</h1>} />
                <Route path="/join" element={<RoomJoinPage />} />
                <Route path="/create" element={<CreateRoomPage />} />
                <Route path="/room/:roomCode" element={<Room />} />
            </Routes>
        </BrowserRouter>
    )
}
