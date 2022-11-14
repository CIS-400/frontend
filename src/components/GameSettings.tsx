import React, { useContext } from 'react'

import { LobbySettings, GameSpeed } from '../../../backend/src/lobby'
import lobbyContext from '../lobby-context'
import Lobby from '../pages/Lobby'
import { AppContext, AppStateAction } from '../store'

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
    console.log(lobbyContext.clientController.allPlayersReady())
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
          disabled={
            lobbyContext.clientController.pid !==
            lobbyContext.clientController.owner
          }
        />
        <div> Hide Bank Cards</div>
        <input
          type="checkbox"
          onChange={(e) => updateSetting({ hideBankCards: e.target.checked })}
          checked={state.lobby.settings.hideBankCards}
          disabled={
            lobbyContext.clientController.pid !==
            lobbyContext.clientController.owner
          }
        />
        <div>Game Speed</div>
        <button
          disabled={
            lobbyContext.clientController.pid !==
              lobbyContext.clientController.owner ||
            !lobbyContext.clientController.allPlayersReady()
          }
          onClick={undefined}
        >
          Start Game
        </button>
      </div>
    </>
  )
}

export default GameSettings
