import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const nav = useNavigate();

  return (
    <>
      <h1> Settlers </h1>
      <button
        type="button"
        className="btn mx-1 btn-primary"
        onClick={() => nav('/lobbies')}
      >
        Go to Lobbies
      </button>
    </>
  );
};

export default Home;
