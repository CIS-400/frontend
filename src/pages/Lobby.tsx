import React from 'react'
import { useParams } from 'react-router-dom'

import GameSettings from '../components/GameSettings'
import LobbyChat from '../components/LobbyChat'
import PlayerList from '../components/PlayerList'
import lobbyContext from '../lobby-context'

export default class Lobby extends React.Component<{}> {
  static contextType = lobbyContext
  context!: React.ContextType<typeof lobbyContext>
  componentDidMount(): void {
    this.context.clientController.initializeConnection('dev')
  }
  render() {
    return (
      <>
        <h1>Lobby</h1>
        <GameSettings lobbyid="dev" />
        <hr />
        <LobbyChat />
        <hr />
        <PlayerList />
      </>
    )
  }
}
