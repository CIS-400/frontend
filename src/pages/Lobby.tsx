import { LobbyStatus } from '../../../backend/src/lobby'
import React from 'react'
import { useParams } from 'react-router-dom'

import GameSettings from '../components/GameSettings'
import LobbyChat from '../components/LobbyChat'
import PlayerList from '../components/PlayerList'
import GameBoard from '../components/InGame/GameBoard'
import lobbyContext from '../lobby-context'
import { AppContext, AppStateAction } from '../store'

export default class Lobby extends React.Component<{}> {
  static contextType = AppContext
  context!: React.ContextType<typeof AppContext>
  componentDidMount(): void {
    const [state, dispatch] = this.context
    const { clientController } = lobbyContext
    clientController.initializeConnection('dev')
    clientController.clearServerEventListeners()
    clientController.addServerEventListener('add-player', (payload) => {
      if (clientController.pid === payload.pid)
        clientController.number = payload.number
      dispatch({ type: AppStateAction.AddPlayer, payload })
    })
    clientController.addServerEventListener('remove-player', (payload) =>
      dispatch({ type: AppStateAction.RemovePlayer, payload }),
    )
    clientController.addServerEventListener('set-ready-status', (payload) =>
      dispatch({ type: AppStateAction.SetReadyStatus, payload }),
    )
    clientController.addServerEventListener('update-settings', (payload) =>
      dispatch({ type: AppStateAction.ChangeLobbySetting, payload }),
    )
    clientController.addServerEventListener('chat-message', (payload) =>
      dispatch({ type: AppStateAction.SendChatMessage, payload }),
    )
    clientController.addServerEventListener('start-game', () => {
      dispatch({
        type: AppStateAction.SetLobbyStatus,
        payload: LobbyStatus.InGame,
      })
      document.cookie = `allow-list-id=${lobbyContext.clientController.pid}`
    })
  }
  render() {
    const [state, dispatch] = this.context
    switch (state.lobby.status) {
      case LobbyStatus.PreGame:
        return (
          <>
            <GameSettings lobbyid="dev" />
            <hr />
            <LobbyChat />
            <hr />
            <PlayerList />
          </>
        )
      case LobbyStatus.InGame:
        return (
          <>
            <div>i am in game</div>
            <GameBoard />
            <hr />
            {/* TODO mention game history in chat? or as separate component? */}
            <LobbyChat />
          </>
        )
      case LobbyStatus.PostGame:
        return <div>i am post game</div>
    }
  }
}
