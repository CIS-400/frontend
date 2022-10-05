import { io, Socket } from 'socket.io-client';
import {
  ClientToServerEvents,
  ServerToClientEvents,
} from '@backend/socket-server';
import { LobbySettings } from '@backend/lobby';

export default class ClientController {
  private static instance: ClientController | undefined;
  private socket: Socket<ServerToClientEvents, ClientToServerEvents>;
  private serverEventListeners: Record<
    keyof ServerToClientEvents,
    ((...args: any[]) => void)[]
  >;

  private constructor() {
    this.socket = io('http://localhost:8000/dev');
    this.socket.once('connect', () =>
      this.socket.emit('add-player', { name: this.socket.id }),
    );
    this.serverEventListeners = {
      'chat-message': [],
      'add-player': [],
      'set-ready-status': [],
      'update-settings': [],
      'remove-player': [],
      'lobby-is-full': [],
    };
    (
      Object.keys(this.serverEventListeners) as Array<
        keyof ServerToClientEvents
      >
    ).forEach((e) => {
      this.socket.on(e, (data: any) =>
        this.serverEventListeners[e].forEach((l) => l(data)),
      );
    });
  }

  public addServerEventListener(
    event: keyof ServerToClientEvents,
    callback: (...args: any[]) => void,
  ): void {
    this.serverEventListeners[event].push(callback);
  }

  public sendChatMessage(message: string) {
    this.socket.emit('chat-message', { message });
  }

  public setReadyStatus(ready: boolean) {
    this.socket.emit('set-ready-status', ready);
  }

  public updateSettings(settings: LobbySettings) {
    this.socket.emit('update-settings', settings);
  }

  public static getInstance() {
    if (ClientController.instance === undefined) {
      ClientController.instance = new ClientController();
    }
    return ClientController.instance;
  }
}
