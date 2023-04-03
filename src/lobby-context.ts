import ClientController from './client-controller'

function createLobbyContext(lobby_url: string) {
  return {
    clientController: new ClientController(lobby_url),
    gameState: null,
    gameUI: null,
  }
}

export default createLobbyContext
