import React from 'react'
import ClientController from './client-controller'

const lobbyContext = {
  clientController: new ClientController(),
  gameState: null,
  gameUI: null,
}

export default lobbyContext
