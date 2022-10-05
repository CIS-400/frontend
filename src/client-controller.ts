import { io, Socket } from 'socket.io-client';

export default class ClientController {
  private static instance: ClientController | undefined;
  private socket: Socket;
  private serverEventListeners: Record<string, ((...args: any[]) => void)[]> =
    {};

  private constructor() {
    this.socket = io('http://localhost:8000/dev');
    this.socket.on('chat-message', (data: any) => {
      this.serverEventListeners['chat-message'].forEach((listener) =>
        listener(data),
      );
    });
  }

  public addServerEventListener(
    event: string,
    callback: (...args: any[]) => void,
  ): void {
    if (this.serverEventListeners[event] === undefined) {
      this.serverEventListeners[event] = [];
    }
    this.serverEventListeners[event].push(callback);
  }

  public sendChatMessage(message: string) {
    this.socket.emit('chat-message', { message });
  }

  public static getInstance() {
    if (ClientController.instance === undefined) {
      ClientController.instance = new ClientController();
    }
    return ClientController.instance;
  }
}
