import { io, Socket } from 'socket.io-client';

export class ClientController {
  private socket: Socket;
  private serverEventListeners: Record<string, ((...args: any[]) => void)[]> =
    {};

  constructor() {
    this.socket = io('http://localhost:8000/dev');
    this.socket.on(
      'chat-message',
      ((data: any) => {
        console.log('in cc, this is', this);
        this.serverEventListeners['chat-message'].forEach((listener) =>
          listener(data),
        );
      }).bind(this),
    );
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
}

let clientController: ClientController | null = null;
export default function getClientControllerInstance() {
  if (clientController !== null) {
    return clientController;
  }
  clientController = new ClientController();
  return clientController;
}
