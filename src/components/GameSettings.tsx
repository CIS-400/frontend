import React, { useContext } from 'react'

import {
  LobbySettings,
  GameSpeed,
  LobbyStatus,
} from '../../../backend/src/lobby'
import Lobby from '../pages/Lobby'
import { AppContext, AppStateAction } from '../store'
import LobbyChat from './LobbyChat'
import ClientController from "../client-controller"

const GameSettings = (props: { lobbyid: string, clientController: ClientController }) => {
  const [state, dispatch] = useContext(AppContext)

  const clientController = props.clientController;

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
    <>
      <h1> Game Settings</h1>
      <div>
        <div> Invite friends with this code: {props.lobbyid} </div>
        {/* TODO: have input be placeholder for url, readonly and copy to clipboard */}
        {/* <input type="text" /> */}
        <div> Private Game </div>
        <input
          type="checkbox"
          onChange={(e) => updateSetting({ isPrivate: e.target.checked })}
          checked={state.lobby.settings.isPrivate}
          disabled={clientController.pid !== state.lobby.owner}
        />
        <div> Hide Bank Cards</div>
        <input
          type="checkbox"
          onChange={(e) => updateSetting({ hideBankCards: e.target.checked })}
          checked={state.lobby.settings.hideBankCards}
          disabled={clientController.pid !== state.lobby.owner}
        />
        <div>Game Speed</div>
        <button
          disabled={
            clientController.pid !== state.lobby.owner ||
            state.lobby.players.filter((p) => p.ready).length !==
              state.lobby.players.length
          }
          onClick={startGame}
        >
          Start Game
        </button>
      </div>
    </>
  )
}

export default GameSettings
