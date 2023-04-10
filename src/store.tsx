import { GameSpeed, LobbySettings, LobbyStatus } from '../../backend/src/lobby'
import React, { createContext, useReducer } from 'react'

interface ChatMessage {
  sender: string
  message: string
}

interface AppState {
  lobby: {
    settings: LobbySettings
    chat: ChatMessage[]
    players: { pid: string; name: string; ready: boolean; number: number }[]
    owner?: string
    status: LobbyStatus
  }
}

const initialState: AppState = {
  lobby: {
    settings: {
      isPrivate: false,
      hideBankCards: false,
      gameSpeed: GameSpeed.Medium,
    },
    chat: [],
    players: [],
    status: LobbyStatus.PreGame,
  },
}

export enum AppStateAction {
  SendChatMessage,
  ChangeLobbySetting,
  AddPlayer,
  RemovePlayer,
  SetReadyStatus,
  SetLobbyStatus,
}

const reducer = (
  state: AppState,
  action: { type: AppStateAction; payload: any },
): AppState => {
  switch (action.type) {
    case AppStateAction.SendChatMessage:
      return {
        ...state,
        lobby: {
          ...state.lobby,
          chat: [
            ...state.lobby.chat,
            {
              sender:
                state.lobby.players.find(
                  ({ pid }) => pid === action.payload.pid,
                )?.name || 'unknown',
              message: action.payload.message,
            },
          ],
        },
      }
    case AppStateAction.ChangeLobbySetting:
      return {
        ...state,
        lobby: {
          ...state.lobby,
          settings: { ...action.payload },
        },
      }
    case AppStateAction.AddPlayer:
      return {
        ...state,
        lobby: {
          ...state.lobby,
          players: [
            ...state.lobby.players,
            { ...action.payload, ready: false },
          ],
          owner: action.payload.owner,
        },
      }
    case AppStateAction.RemovePlayer:
      return {
        ...state,
        lobby: {
          ...state.lobby,
          players: state.lobby.players.filter(
            ({ pid }) => pid !== (action.payload.pid as string),
          ),
          owner: action.payload.owner,
        },
      }
    case AppStateAction.SetReadyStatus:
      return {
        ...state,
        lobby: {
          ...state.lobby,
          players: state.lobby.players.map((player) =>
            player.pid === action.payload.pid
              ? { ...player, ready: action.payload.ready }
              : player,
          ),
        },
      }
    case AppStateAction.SetLobbyStatus:
      return {
        ...state,
        lobby: {
          ...state.lobby,
          status: action.payload,
        },
      }
  }
}

const Store = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <AppContext.Provider value={[state, dispatch]}>
      {children}
    </AppContext.Provider>
  )
}

export const AppContext = createContext<
  [
    AppState,
    React.Dispatch<{
      type: AppStateAction
      payload: any
    }>,
  ]
>([initialState, () => {}])

export default Store
