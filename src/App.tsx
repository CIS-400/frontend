import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import Lobby from './pages/Lobby';
import Lobbies from './pages/Lobbies';

export default class App extends React.Component<{}> {
  render() {
    return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/lobbies" element={<Lobbies />} />
        <Route path="/:lobbyid" element={<Lobby />} />
      </Routes>
    );
  }
}
