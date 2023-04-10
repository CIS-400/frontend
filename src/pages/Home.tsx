import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const nav = useNavigate();

  return (
    <div className="home-container">
      <h1 className="home-title"> settlers.io </h1>
      <p className="home-subtitle"> Welcome to settlers.io, the online platform to play the classic board game Settlers of Catan with players from around the world! </p>
      <div className="home-rules-container">
        <h2 className="home-rules-title"> Game Rules </h2>
        <ul className="home-rules-list">
          <li>Settlers of Catan is a board game for 3-4 players in which players compete to build settlements, cities, and roads on an island made up of different types of terrain.</li>
          <li>Each terrain hex produces different resources, such as brick, wood, wheat, sheep, and ore.</li>
          <li>On each turn, players roll two dice to determine which terrain hexes produce resources. Any player with a settlement or city adjacent to the hex that was rolled receives one resource card of the corresponding type.</li>
          <li>Players can also trade resources with each other and use them to build structures or buy development cards, which can provide various benefits.</li>
          <li>In order to build a settlement or city, a player must have the necessary resources and place the structure on an unoccupied intersection of the board.</li>
          <li>Players can also build roads, which connect their structures and allow them to expand across the board. Each settlement or city must connect to a road.</li>
          <li>Each built settlement is worth one victory point, and each built city is worth two victory points.</li>
          <li>Additional victory points can be earned through purchasing development cards, constructing the longest road, or amassing the largest army</li>
          <li>The first player to reach 10 victory points wins the game.</li>
        </ul>
      </div>
      <button
        type="button"
        className="btn home-button"
        onClick={() => nav('/lobbies')}
      >
        Go to Lobbies
      </button>
    </div>
  );
};

export default Home;
