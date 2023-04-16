import React, { useState } from 'react'
import './ChatInput.css'

const ChatInput = (props: { className?: string, onSend: (input: string) => void }) => {
  const [input, setInput] = useState('')
  const send = () => {
    props.onSend(input)
    setInput('')
  }
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && input.length > 0) send()
  }
  return (
    <div className="chat-input-container">
      <input
        className="chat-input-field"
        type="text"
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={onKeyDown}
        value={input}
      />
      <button className="chat-input-button" disabled={input.length === 0} onClick={send}>
        Send
      </button>
    </div>
  )
}

export default ChatInput
