import React, { useContext, useState } from 'react'

import {
  LobbySettings,
  GameSpeed,
  LobbyStatus,
} from '../../../backend/src/lobby'
import Lobby from '../pages/Lobby'
import { AppContext, AppStateAction } from '../store'
import ClientController from "../client-controller"
import lobbyContext from 'src/lobby-context'

import './GameSettings.css'

const GameSettings = (props: { lobbyid: string }) => {
  const { gameState, gameUI, clientController } = lobbyContext
  const [state, dispatch] = useContext(AppContext)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(props.lobbyid);
  };

  const updateSetting = (setting: Partial<LobbySettings>) => {
    const newSettings = {
      ...state.lobby.settings,
      ...setting,
    }
    dispatch({
      type: AppStateAction.ChangeLobbySetting,
      payload: newSettings,
    })
    clientController.updateSettings(newSettings)
  }

  const startGame = () => {
    dispatch({
      type: AppStateAction.SetLobbyStatus,
      payload: LobbyStatus.InGame,
    })
    clientController.startGame()
    document.cookie = `allow-list-id=${clientController.pid}`
  }
  
  return (
    <div className='gs-container'>
      <h1 className='gs-title'>Get ready, the game is about to begin!</h1>
      <div className='gs-code-container'>
        <p className='gs-subtitle'>Invite friends with this code:</p>
        <p className='gs-code'>{props.lobbyid}</p>
        <button className='gs-copy-button' onClick={copyToClipboard}>
          Copy
        </button>
      </div>

      <button
        disabled={
          clientController.pid !== state.lobby.owner ||
          state.lobby.players.filter((p: any) => p.ready).length !==
            state.lobby.players.length
        }
        onClick={startGame}
        className='gs-start-button'
      >
        Start Game!
      </button>
    </div>
  );
}

export default GameSettings
