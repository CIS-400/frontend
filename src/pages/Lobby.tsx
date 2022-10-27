import React from 'react'
import { useParams } from 'react-router-dom'

import GameSettings from '../components/GameSettings'
//import LobbyChat from '../components/LobbyChat'
import PlayerList from '../components/PlayerList'
import lobbyContext from '../lobby-context'
import { AppContext, AppStateAction } from '../store'

export default class Lobby extends React.Component<{}> {
  static contextType = AppContext
  context!: React.ContextType<typeof AppContext>
  componentDidMount(): void {
    const [state, dispatch] = this.context
    console.log([...state.lobby.pids])
    lobbyContext.clientController.initializeConnection('dev')
    lobbyContext.clientController.clearServerEventListeners()
    lobbyContext.clientController.addServerEventListener(
      'add-player',
      ({ pid }) => {
        console.log('dispatch!')
        dispatch({ type: AppStateAction.AddPlayer, payload: pid })
      },
    )
    lobbyContext.clientController.addServerEventListener(
      'remove-player',
      ({ pid }) =>
        dispatch({ type: AppStateAction.RemovePlayer, payload: pid }),
    )
  }
  render() {
    return (
      <>
        {/* <h1>Lobby</h1>
        <GameSettings lobbyid="dev" />
        <hr />
        <LobbyChat />
        <hr /> */}
        <PlayerList />
      </>
    )
  }
}
