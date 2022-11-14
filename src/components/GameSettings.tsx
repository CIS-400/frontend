import React, { useContext } from 'react'

import {
  LobbySettings,
  GameSpeed,
  LobbyStatus,
} from '../../../backend/src/lobby'
import lobbyContext from '../lobby-context'
import Lobby from '../pages/Lobby'
import { AppContext, AppStateAction } from '../store'
import LobbyChat from './LobbyChat'

const GameSettings = (props: { lobbyid: string }) => {
  const [state, dispatch] = useContext(AppContext)

  const updateSetting = (setting: Partial<LobbySettings>) => {
    const newSettings = {
      ...state.lobby.settings,
      ...setting,
    }
    dispatch({
      type: AppStateAction.ChangeLobbySetting,
      payload: newSettings,
    })
    lobbyContext.clientController.updateSettings(newSettings)
  }

  const startGame = () => {
    dispatch({
      type: AppStateAction.SetLobbyStatus,
      payload: LobbyStatus.InGame,
    })
    lobbyContext.clientController.startGame()
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
          disabled={lobbyContext.clientController.pid !== state.lobby.owner}
        />
        <div> Hide Bank Cards</div>
        <input
          type="checkbox"
          onChange={(e) => updateSetting({ hideBankCards: e.target.checked })}
          checked={state.lobby.settings.hideBankCards}
          disabled={lobbyContext.clientController.pid !== state.lobby.owner}
        />
        <div>Game Speed</div>
        <button
          disabled={
            lobbyContext.clientController.pid !== state.lobby.owner ||
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
