import { io, Socket } from 'socket.io-client'
import {
  ClientToServerEvents,
  ServerToClientEvents,
} from '@backend/socket-server'
import { LobbySettings } from '@backend/lobby'

export default class ClientController {
  private socket?: Socket<ServerToClientEvents, ClientToServerEvents>
  public pid?: string
  private serverEventListeners: Record<
    keyof ServerToClientEvents,
    ((...args: any[]) => void)[]
  > = {
    'chat-message': [],
    'add-player': [],
    'set-ready-status': [],
    'update-settings': [],
    'remove-player': [],
    'lobby-is-full': [],
    'start-game': [],
  }

  public initializeConnection(lid: string) {
    if (this.socket !== undefined) return
    this.socket = io('http://localhost:8000/dev')
    this.socket.once('connect', () => {
      this.pid = this.socket!.id
      this.socket!.emit('add-player', { name: randomName() })
    })
    const events = Object.keys(
      this.serverEventListeners,
    ) as (keyof ServerToClientEvents)[]
    events.forEach((e) => {
      this.socket!.on(e, (data: any) =>
        this.serverEventListeners[e].forEach((l) => l(data)),
      )
    })
  }

  public clearServerEventListeners() {
    const events = Object.keys(
      this.serverEventListeners,
    ) as (keyof ServerToClientEvents)[]
    events.forEach((e) => (this.serverEventListeners[e] = []))
  }

  public addServerEventListener(
    event: keyof ServerToClientEvents,
    callback: (...args: any[]) => void,
  ): void {
    this.serverEventListeners[event].push(callback)
  }

  public sendChatMessage(message: string) {
    this.socket!.emit('chat-message', message)
  }

  public setReadyStatus(ready: boolean) {
    this.socket!.emit('set-ready-status', ready)
  }

  public updateSettings(settings: LobbySettings) {
    this.socket!.emit('update-settings', settings)
  }

  public startGame() {
    this.socket!.emit('start-game')
  }
}

function randomName() {
  const names = ['aydan', 'henry', 'zach', 'tom']
  return (
    names[Math.floor(Math.random() * names.length)] +
    Math.floor(Math.random() * 1000).toString()
  )
}
