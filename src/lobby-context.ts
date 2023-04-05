import React from 'react'
import ClientController from './client-controller'
import { Game } from 'settlers'
import GameUI from './game-ui/game-ui'

const game = new Game()
const lobbyContext = {
  clientController: new ClientController(),
  gameState: game,
  gameUI: new GameUI(game),
}

export default lobbyContext
