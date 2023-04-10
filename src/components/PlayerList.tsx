import React, { useContext } from 'react'
import lobbyContext from '../lobby-context'
import { LobbyStatus } from '../../../backend/src/lobby'
import { AppContext, AppStateAction } from '../store'

const PlayerList = () => {
  const [state, dispatch] = useContext(AppContext)
  const RED = '#D20001'
  const BLUE = '#03458F'
  const GREEN = '#007354'
  const YELLOW = '#F59B23'
  const colors = [RED, BLUE, GREEN, YELLOW]

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
      {state.lobby.players.map(({ name, pid, ready }, index) => (
        <div key={pid}>
          <span
            style={{
              color: colors[index],
              fontWeight:
                lobbyContext.gameUI?.getPerspective() === index
                  ? 'bold'
                  : 'normal',
            }}
          >
            {name} {pid === state.lobby.owner && '👑'}
          </span>
          {/* <span style={{ fontWeight: 'bold', color: 'red' }}>
            {name} {pid === state.lobby.owner && '👑'}
          </span> */}
          {state.lobby.status === LobbyStatus.PreGame && (
            <input
              type="checkbox"
              checked={ready}
              disabled={pid !== lobbyContext.clientController.pid}
              onChange={readyClicked}
            />
          )}
        </div>
      ))}
    </div>
  )
}

export default PlayerList
