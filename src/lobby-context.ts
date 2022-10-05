import React from 'react';
import ClientController from './client-controller';

const lobbyContext = React.createContext({
  clientController: ClientController.getInstance(),
  gameState: null,
  gameUI: null,
});
export default lobbyContext;
