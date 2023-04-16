import { LobbyStatus } from '../../../backend/src/lobby'
import React from 'react'
import { useParams } from 'react-router-dom'

import GameSettings from '../components/GameSettings'
import LobbyChat from '../components/LobbyChat'
import PlayerList from '../components/PlayerList'
import GameBoard from '../components/InGame/GameBoard'
import lobbyContext from '../lobby-context'
import { AppContext, AppStateAction } from '../store'

import './Lobby.css'
import WinnerScreen from 'src/components/InGame/WinnerScreen'

const seedrandom = require('seedrandom')

type LobbyProps = {
  lobby_url: string
}

type LobbyState = {
  clientController: any
}

export default class Lobby extends React.Component<LobbyProps, LobbyState> {
  static contextType = AppContext
  context!: React.ContextType<typeof AppContext>

  constructor(props: LobbyProps) {
    super(props)
  }

  componentDidMount(): void {
    const [state, dispatch] = this.context

    const { clientController } = lobbyContext

    clientController.initializeConnection(this.props.lobby_url)
    clientController.clearServerEventListeners()
    clientController.addServerEventListener('set-seed', (seed) => {
      console.log('setting seed to', seed)
      seedrandom(seed, { global: true })
    })
    clientController.addServerEventListener('add-player', (payload) => {
      if (lobbyContext.clientController.pid === payload.pid)
        lobbyContext.clientController.number = payload.number
      dispatch({ type: AppStateAction.AddPlayer, payload })
    })
    clientController.addServerEventListener('remove-player', (payload) =>
      dispatch({ type: AppStateAction.RemovePlayer, payload }),
    )
    clientController.addServerEventListener(
      'set-ready-status',
      (payload: any) =>
        dispatch({ type: AppStateAction.SetReadyStatus, payload }),
    )
    clientController.addServerEventListener('update-settings', (payload: any) =>
      dispatch({ type: AppStateAction.ChangeLobbySetting, payload }),
    )
    clientController.addServerEventListener('chat-message', (payload: any) =>
      dispatch({ type: AppStateAction.SendChatMessage, payload }),
    )
    clientController.addServerEventListener('set-name', (payload: any) =>
      dispatch({ type: AppStateAction.SetName, payload }),
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

    switch (state.lobby.status) {
      case LobbyStatus.PreGame:
        return (
          <div className="lobby-container">
            <GameSettings lobbyid={this.props.lobby_url} />
            <div className="lobby-content">
              <div className="player-list-container">
                <PlayerList />
              </div>
              <div className="chat-container">
                <LobbyChat />
              </div>
            </div>
          </div>
        )
      case LobbyStatus.InGame:
        return (
          <>
            {state.lobby.winner !== null && <WinnerScreen />}
            <div style={{ display: 'flex', alignItems: 'flex-start' }}>
              <GameBoard />

              <div
                style={{
                  width: '30%',
                  marginLeft: '1%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <div className="player-list-container">
                  <PlayerList />
                </div>

                <div style={{ flex: 1 }}></div>
                <div className="chat-container" style={{ maxHeight: '500px' }}>
                  <LobbyChat />
                </div>
              </div>
            </div>
          </>
        )
      case LobbyStatus.PostGame:
        return <div>i am post game</div>
    }
  }
}
