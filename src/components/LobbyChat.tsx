import React, { useContext } from 'react'
import { AppContext, AppStateAction } from '../store'
import ChatInput from './ChatInput'
import ClientController from "../client-controller"

const LobbyChat = (props: { clientController: ClientController }) => {
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
            payload: { pid: props.clientController.pid, message },
          })
          props.clientController.sendChatMessage(message)
        }}
      />
    </>
  )
}

export default LobbyChat
