import React, { useContext, useEffect } from 'react'
import lobbyContext from '../lobby-context'
import { AppContext, AppStateAction } from '../store'

const PlayerList = () => {
  const [state, dispatch] = useContext(AppContext)

  const readyClicked = (e: any) => {
    dispatch({
      type: AppStateAction.SetReadyStatus,
      payload: {
        pid: lobbyContext.clientController.pid,
        ready: e.target.checked,
      },
    })
    lobbyContext.clientController.setReadyStatus(e.target.checked)
  }

  return (
    <div>
      <h1>Player List</h1>
      {state.lobby.players.map(({ name, pid, ready }) => (
        <div key={pid}>
          <div>{name}</div>
          <input
            type="checkbox"
            checked={ready}
            disabled={pid !== lobbyContext.clientController.pid}
            onChange={readyClicked}
          />
        </div>
      ))}
    </div>
  )
}

export default PlayerList
