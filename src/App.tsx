import React from 'react';
import { Route, Routes } from 'react-router-dom'

function App() {
  return (
    <Routes>
      <Route path="/" element={<div>home</div>} />
      <Route path="/lobbies" element={<div>lobbies</div>} />
      <Route path="/:lobbyid" element={<div>lobby</div>} />
    </Routes>
  );
}

export default App;
