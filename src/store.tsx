import { GameSpeed, LobbySettings } from '../../backend/src/lobby'
import React, { createContext, useReducer } from 'react'

interface ChatMessage {
  sender: string
  message: string
}

interface AppState {
  lobby: {
    settings: LobbySettings
    chat: ChatMessage[]
    pids: string[]
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
    pids: [],
  },
}

export enum AppStateAction {
  SendChatMessage,
  ChangeLobbySetting,
  AddPlayer,
  RemovePlayer,
}

const reducer = (
  state: AppState,
  action: { type: AppStateAction; payload: any },
): AppState => {
  switch (action.type) {
    case AppStateAction.SendChatMessage:
      state.lobby.chat = [...state.lobby.chat, action.payload as ChatMessage]
      break
    case AppStateAction.ChangeLobbySetting:
      state.lobby.settings = {
        ...state.lobby.settings,
        ...(action.payload as Partial<LobbySettings>),
      }
      break
    case AppStateAction.AddPlayer:
      state.lobby.pids = [...state.lobby.pids, action.payload as string]
      break
    case AppStateAction.RemovePlayer:
      state.lobby.pids = state.lobby.pids.filter(
        (pid) => pid !== (action.payload as string),
      )
  }
  return { ...state }
}

const Store = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <AppContext.Provider value={[state, dispatch]}>
      {children}
    </AppContext.Provider>
  )
}

export const AppContext = createContext<[AppState, any?]>([initialState])

export default Store
