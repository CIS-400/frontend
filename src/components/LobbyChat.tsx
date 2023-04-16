import React, { useContext } from 'react'
import { AppContext, AppStateAction } from '../store'
import ChatInput from './ChatInput'
import lobbyContext from 'src/lobby-context'
import './LobbyChat.css'

const LobbyChat = (props: { }) => {
  const [state, dispatch] = useContext(AppContext)

  return (
    <>
      <div className='chat-messages'>
        {state.lobby.chat.map(({ sender, message }, i) => (
          <div className='chat-message' key={i}>
            <span className='chat-sender'>{sender}:</span> {message}
          </div>
        ))}
      </div>
      <div className='chat-input-container'>
        <span>Send a Chat:</span>
        <ChatInput
          onSend={(message) => {
            dispatch({
              type: AppStateAction.SendChatMessage,
              payload: { pid: lobbyContext.clientController.pid, message },
            })
            lobbyContext.clientController.sendChatMessage(message)
          }}
        />
      </div>
    </>
  )
}

export default LobbyChat
