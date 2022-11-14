import React, { useContext } from 'react'
import lobbyContext from '../lobby-context'
import { AppContext, AppStateAction } from '../store'
import ChatInput from './ChatInput'

const LobbyChat = () => {
  const [state, dispatch] = useContext(AppContext)
  return (
    <>
      <div>
        {state.lobby.chat.map(({ sender, message }, i) => (
          <div key={i}>
            {sender}: {message}
          </div>
        ))}
      </div>
      <ChatInput
        onSend={(message) => {
          dispatch({
            type: AppStateAction.SendChatMessage,
            payload: { pid: lobbyContext.clientController.pid, message },
          })
          lobbyContext.clientController.sendChatMessage(message)
        }}
      />
    </>
  )
}

export default LobbyChat
