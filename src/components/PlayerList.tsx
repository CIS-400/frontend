import React, { useContext } from 'react'
import lobbyContext from '../lobby-context'
import { LobbyStatus } from '../../../backend/src/lobby'
import { AppContext, AppStateAction } from '../store'

const PlayerList = (props: {}) => {
  const [state, dispatch] = useContext(AppContext)
  const RED = '#D20001'
  const BLUE = '#03458F'
  const GREEN = '#007354'
  const YELLOW = '#F59B23'
  const colors = [RED, BLUE, GREEN, YELLOW]

  const readyClicked = (e: any) => {
    const { clientController } = lobbyContext
    dispatch({
      type: AppStateAction.SetReadyStatus,
      payload: {
        pid: clientController.pid,
        ready: e.target.checked,
      },
    })
    clientController.setReadyStatus(e.target.checked)
  }

  return (
    <div>
      <h1>Player List</h1>
      {state.lobby.players.map(({ name, pid, ready, number }) => (
        <div key={pid}>
          {state.lobby.status === LobbyStatus.InGame && (
            <span
              style={{
                color: colors[number],
                fontWeight:
                  number === lobbyContext.clientController.number
                    ? 'bold'
                    : 'normal',
              }}
            >
              {name} {pid === state.lobby.owner && '👑'}
            </span>
          )}

          {state.lobby.status === LobbyStatus.PreGame && (
            <>
              <div>
                {' '}
                {name} {pid === state.lobby.owner && '👑'}{' '}
              </div>
              <input
                type="checkbox"
                checked={ready}
                disabled={pid !== lobbyContext.clientController.pid}
                onChange={readyClicked}
              />
            </>
          )}
        </div>
      ))}
    </div>
  )
}

export default PlayerList
