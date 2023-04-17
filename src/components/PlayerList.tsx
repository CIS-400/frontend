import React, { useContext } from 'react'
import lobbyContext from '../lobby-context'
import { LobbyStatus } from '../../../backend/src/lobby'
import { AppContext, AppStateAction } from '../store'
import ChatInput from './ChatInput'
import ClientController from 'src/client-controller'

import './PlayerList.css'

const PlayerList = (props: {}) => {
  const [state, dispatch] = useContext(AppContext)
  const RED = '#D20001'
  const BLUE = '#03458F'
  const GREEN = '#007354'
  const YELLOW = '#F59B23'
  const colors = [RED, BLUE, GREEN, YELLOW]

  const readyClicked = (ready: boolean) => {
    const { clientController } = lobbyContext
    const newReadyStatus = !ready
    dispatch({
      type: AppStateAction.SetReadyStatus,
      payload: {
        pid: clientController.pid,
        ready: newReadyStatus,
      },
    })
    clientController.setReadyStatus(newReadyStatus)
  }

  return (
    <div className="player-list-container">
      <h1 className="player-list-title">Player List</h1>
      {state.lobby.players.map(({ name, pid, ready, number }) => (
        <div key={pid} className="player-item">
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
              <div className="player-item-name">
                {' '}
                {name} {pid === state.lobby.owner && '👑'}{' '}
              </div>
              <button
                className="playerlist-ready-button"
                disabled={pid !== lobbyContext.clientController.pid}
                onClick={() => readyClicked(ready)}
              >
                {ready ? 'Ready ✅' : 'Ready?'}
              </button>
              {pid === lobbyContext.clientController.pid && (
                <div className="playerlist-edit-username">
                  <label>set name:</label>
                  <ChatInput
                    className="playerlist-edit-username-input"
                    onSend={(val) => {
                      dispatch({
                        type: AppStateAction.SetName,
                        payload: { name: val, pid: pid },
                      })
                      lobbyContext.clientController.setName(val)
                    }}
                  />
                </div>
              )}
            </>
          )}
        </div>
      ))}
    </div>
  )
}

export default PlayerList
