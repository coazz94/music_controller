import React from "react"
import RoomJoinPage from "./RoomJoinPage"
import CreateRoomPage from "./CreateRoomPage"
import { BrowserRouter, Route, Routes } from "react-router-dom"

export default function Homepage() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<h1>this is the Homepage</h1>} />
                    <Route path="/join" element={<RoomJoinPage />} />
                    <Route path="/create" element={<CreateRoomPage />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}
