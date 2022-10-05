import React from 'react';

import { LobbySettings, GameSpeed } from '@backend/lobby';

export default class GameSettings extends React.Component<
  { lobbyid: string },
  { settings: LobbySettings }
> {
  constructor(props: { lobbyid: string }) {
    super(props);
    this.state = {
      settings: {
        isPrivate: false,
        hideBankCards: false,
        gameSpeed: GameSpeed.Medium,
      },
    };
  }

  render() {
    return (
      <>
        <h1> Game Settings</h1>
        <div>
          <h2> Invite friends with this code: {this.props.lobbyid} </h2>

          {/* TODO: have input be placeholder for url, readonly and copy to clipboard */}
          <input type="text" />

          <h2> Private Game </h2>
          <input type="checkbox" onChange={e => this.setState({ settings: {...this.state.settings, isPrivate: !this.state.settings.isPrivate}})} />

          <h2> Hide Bank Cards</h2>
          <input type="checkbox" onChange={e => this.setState({ settings: {...this.state.settings, hideBankCards: !this.state.settings.hideBankCards}})} />

          <h2> Game Speed </h2>

          <h2> I'm Ready </h2>
          {/* start game button shows only for p1 */}
        </div>
      </>
    );
  }
}
