import React from 'react'

import { LobbySettings, GameSpeed } from '../../../backend/src/lobby'
import lobbyContext from '../lobby-context'

export default class GameSettings extends React.Component<
  { lobbyid: string },
  { settings: LobbySettings }
> {
  constructor(props: { lobbyid: string }) {
    super(props)
    this.state = {
      settings: {
        isPrivate: false,
        hideBankCards: false,
        gameSpeed: GameSpeed.Medium,
      },
    }
    this.onUpdateSettings = this.onUpdateSettings.bind(this)
    this.onUpdateLocalSettings = this.onUpdateLocalSettings.bind(this)
  }

  componentDidMount(): void {
    lobbyContext.clientController.addServerEventListener(
      'update-settings',
      this.onUpdateSettings,
    )
  }
  onUpdateSettings(settings: LobbySettings) {
    this.setState({ settings })
  }

  onUpdateLocalSettings(settings: LobbySettings) {
    this.setState({ settings })
    lobbyContext.clientController.updateSettings(settings)
  }

  render() {
    return (
      <>
        <h1> Game Settings</h1>
        <div>
          <div> Invite friends with this code: {this.props.lobbyid} </div>
          {/* TODO: have input be placeholder for url, readonly and copy to clipboard */}
          <input type="text" />
          <div> Private Game </div>
          <input
            type="checkbox"
            onChange={(e) =>
              this.onUpdateLocalSettings({
                ...this.state.settings,
                isPrivate: e.target.checked,
              })
            }
            checked={this.state.settings.isPrivate}
          />
          <div> Hide Bank Cards</div>
          <input
            type="checkbox"
            onChange={(e) =>
              this.onUpdateLocalSettings({
                ...this.state.settings,
                hideBankCards: e.target.checked,
              })
            }
            checked={this.state.settings.hideBankCards}
          />
          <div>Game Speed</div>
          <input
            type="checkbox"
            onChange={(e) => {
              lobbyContext.clientController.setReadyStatus(e.target.checked)
            }}
          />
          {/* start game button shows only for p1 */}
        </div>
      </>
    )
  }
}
