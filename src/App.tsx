import React from 'react'
import { Route, Routes, useParams } from 'react-router-dom'

import Home from './pages/Home'
import Lobby from './pages/Lobby'
import Lobbies from './pages/Lobbies'
import Store from './store'

export default class App extends React.Component<{}> {
  render() {
    return (
      <Store>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/lobbies" element={<Lobbies />} />
          <Route path="/:lobbyid" element={<LobbyWrapper />} />
        </Routes>
      </Store>
    )
  }
}

function LobbyWrapper() {
  const { lobbyid } = useParams()
  return <Lobby lobby_url={lobbyid ?? "test"} />
}
