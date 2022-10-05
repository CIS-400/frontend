import React, { useEffect, useRef, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import ClientController from './client-controller';

import Home from './pages/Home';
import Lobby from './pages/Lobby';
import Lobbies from './pages/Lobbies';

export default class App extends React.Component<{}, { chat: string[] }> {
  cc: ClientController;
  constructor(props: {} | Readonly<{}>) {
    super(props);
    this.state = {
      chat: [],
    };
    this.callback = this.callback.bind(this);
    this.cc = ClientController.getInstance();
  }

  componentDidMount() {
    this.cc.addServerEventListener('chat-message', this.callback);
  }

  callback(data: { message: string }) {
    this.setState({ chat: [...this.state.chat, data.message] });
  }

  render() {
    return (
      <>
        <button
          onClick={() => {
            let a = Math.random().toString();
            this.setState({ chat: [...this.state.chat, a] });
            this.cc.sendChatMessage(a);
          }}
        >
          click me
        </button>
        <ul>
          {this.state.chat.map((message) => (
            <li key={message}>{message}</li>
          ))}
        </ul>
      </>
    );
  }
}
