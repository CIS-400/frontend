import React from 'react';
import { useParams } from 'react-router-dom';

const Lobby = () => {
  const { lobbyid } = useParams();
  return <h1> Lobby ID: {lobbyid} </h1>;
};

export default Lobby;
