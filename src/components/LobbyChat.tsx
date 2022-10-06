import React from 'react'
import lobbyContext from '../lobby-context'
import ChatInput from './ChatInput'

interface ChatMessage {
  sender: string
  message: string
}
export default class LobbyChat extends React.Component<
  {},
  { chat: ChatMessage[] }
> {
  static contextType = lobbyContext
  context!: React.ContextType<typeof lobbyContext>
  constructor(props: {}) {
    super(props)
    this.state = {
      chat: [],
    }
    this.onMessage = this.onMessage.bind(this)
  }

  componentDidMount() {
    this.context.clientController.addServerEventListener(
      'chat-message',
      this.onMessage,
    )
  }

  onMessage({ pid, message }: any) {
    this.setState({
      chat: [
        ...this.state.chat,
        {
          sender:
            this.context.clientController.playerData[pid]?.name || 'unknown',
          message,
        },
      ],
    })
  }

  render() {
    return (
      <>
        <div>
          {this.state.chat.map(({ sender, message }, i) => (
            <div key={i}>
              {sender}: {message}
            </div>
          ))}
        </div>
        <ChatInput
          onSend={(message) => {
            this.onMessage({ pid: this.context.clientController.pid!, message })
            this.context.clientController.sendChatMessage(message)
          }}
        />
      </>
    )
  }
}
