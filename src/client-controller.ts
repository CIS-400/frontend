import { io, Socket } from "socket.io-client";

class ClientController {
  private socket: Socket;

  constructor() {
    this.socket = io("http://localhost:8000");
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
