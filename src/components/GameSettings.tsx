import React from 'react';

const GameSettings = (lobbyid: string): JSX.Element => {
  return (
    <>
      <h1> Game Settings</h1>
      <div>
        <h2> Invite friends</h2>

        {/* TODO: have input be placeholder for url, readonly and copy to clipboard */}
        <input type="text"/> 

        <h2> Private Game </h2>

        <h2> Hide Bank Cards</h2>

        <h2> I'm Ready </h2>

        {/* start game button for only p1 */}
      </div>
    </>
  );
};

export default GameSettings;
