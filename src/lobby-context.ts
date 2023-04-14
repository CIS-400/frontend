import ClientController from './client-controller'
import { Game } from 'settlers'
import GameUI from './game-ui/game-ui'

const lobbyContext: {
  clientController: ClientController
  gameState: Game | null
  gameUI: GameUI | null
} = {
  clientController: new ClientController(),
  gameState: null,
  gameUI: null,
}

export default lobbyContext
