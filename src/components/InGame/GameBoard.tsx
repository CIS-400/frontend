import React, { useContext } from 'react'
import GameUI, { UIEvents } from '../../game-ui/game-ui'
import * as SETTLERS from 'settlers'
import PlayerList from '../PlayerList'
import { AppContext } from 'src/store'
import lobbyContext from 'src/lobby-context'

export default class GameBoard extends React.Component<{}> {
  static contextType = AppContext
  context!: React.ContextType<typeof AppContext>
  gameBoardRef: React.RefObject<HTMLElement>
  constructor(props: {} | Readonly<{}>) {
    super(props)
    this.gameBoardRef = React.createRef()
    this.handleGetAction = this.handleGetAction.bind(this)
  }
  componentDidMount() {
    const [state, dispatch] = this.context

    const { gameState, gameUI, clientController } = lobbyContext
    console.log('mount gameState', gameState)
    for (const uievent of Object.values(UIEvents)) {
      gameUI.addEventHandler(uievent as UIEvents, (action: SETTLERS.Action) => {
        clientController.sendAction(action)
      })
    }
    // set game board UI
    console.log(gameUI)
    gameUI.setResizeTo(this.gameBoardRef.current as HTMLElement)
    gameUI.initialize()
    this.gameBoardRef.current!.appendChild(gameUI.getUI() as unknown as Node)
    this.forceUpdate()

    // set number
    gameUI.setPerspective(clientController.number!)
    clientController.clearServerEventListener('get-action')
    clientController.addServerEventListener('get-action', this.handleGetAction)
  }

  handleGetAction(action: SETTLERS.Action) {
    const { gameState, gameUI } = lobbyContext
    console.log('before gamestate', gameState.toLog())
    console.log('action', action)
    gameState.handleAction(action)
    gameUI.update()
    this.forceUpdate()
    console.log('after gamestate', gameState.toLog())
  }
  render() {
    return (
      <>
        <div
          id="game-board"
          style={{ width: '1000px', height: '800px' }}
          ref={this.gameBoardRef as React.RefObject<HTMLDivElement>}
        />
        <h2> Player List: </h2>
        <PlayerList />
      </>
    )
  }
}
