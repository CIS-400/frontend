import { LobbyStatus } from '../../../backend/src/lobby'
import React from 'react'
import { useParams } from 'react-router-dom'

import GameSettings from '../components/GameSettings'
import LobbyChat from '../components/LobbyChat'
import PlayerList from '../components/PlayerList'
import GameBoard from '../components/InGame/GameBoard'
import createLobbyContext from '../lobby-context'
import { AppContext, AppStateAction } from '../store'

type LobbyProps = {
  lobby_url: string
}

type LobbyState = {
    clientController: any,
  
}

export default class Lobby extends React.Component<LobbyProps, LobbyState> {
  static contextType = AppContext
  context!: React.ContextType<typeof AppContext>

  constructor(props: LobbyProps) {
    super(props)
    this.state = {
      clientController: createLobbyContext(props.lobby_url)
    }
  }

  componentDidMount(): void {
    const [state, dispatch] = this.context
    const { clientController } = this.state.clientController

    clientController.initializeConnection(this.props.lobby_url)
    clientController.clearServerEventListeners()
    clientController.addServerEventListener('add-player', (payload: any) =>
      dispatch({ type: AppStateAction.AddPlayer, payload }),
    )
    clientController.addServerEventListener('remove-player', (payload: any) =>
      dispatch({ type: AppStateAction.RemovePlayer, payload }),
    )
    clientController.addServerEventListener('set-ready-status', (payload: any) =>
      dispatch({ type: AppStateAction.SetReadyStatus, payload }),
    )
    clientController.addServerEventListener('update-settings', (payload: any) =>
      dispatch({ type: AppStateAction.ChangeLobbySetting, payload }),
    )
    clientController.addServerEventListener('chat-message', (payload: any) =>
      dispatch({ type: AppStateAction.SendChatMessage, payload }),
    )
    clientController.addServerEventListener('start-game', () => {
      dispatch({
        type: AppStateAction.SetLobbyStatus,
        payload: LobbyStatus.InGame,
      })
      document.cookie = `allow-list-id=${clientController.pid}`
    })
  }

  render() {
    const [state, dispatch] = this.context
    const { clientController } = this.state.clientController

    switch (state.lobby.status) {
      case LobbyStatus.PreGame:
        return (
          <>
            <GameSettings
              lobbyid={this.props.lobby_url}
              clientController={clientController}
            />
            <hr />
            <LobbyChat clientController={clientController} />
            <hr />
            <PlayerList clientController={clientController} />  
          </>
        )
      case LobbyStatus.InGame:
        return (
          <>
            <div>i am in game</div>
            <GameBoard clientController={clientController} />
            <hr />
            {/* TODO mention game history in chat? or as separate component? */}
            <LobbyChat clientController={clientController} />
          </>
        )
      case LobbyStatus.PostGame:
        return <div>i am post game</div>
    }
  }
}
