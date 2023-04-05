import React, { useContext } from 'react'
import { UIEvents } from '../../game-ui/game-ui'
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
  }
  componentDidMount() {
    const [state, dispatch] = this.context
    const { gameState, gameUI, clientController } = lobbyContext
    for (const uievent of Object.values(UIEvents)) {
      gameUI.addEventHandler(uievent as UIEvents, (action: SETTLERS.Action) => {
        clientController.sendAction(action)
      })
    }
    console.log(gameUI)
    gameUI.setResizeTo(this.gameBoardRef.current as HTMLElement)
    gameUI.initialize();
    this.gameBoardRef.current!.appendChild(gameUI.getUI() as unknown as Node)
    this.forceUpdate()

    clientController.addServerEventListener(
      'get-action',
      (action: SETTLERS.Action) => {
        gameState.handleAction(action)
        gameUI.update()
      },
    )
  }
  render() {
    return (
      <>
        <div
          id="game-board"
          style={{ width: "1000px", height: "800px" }}
          ref={this.gameBoardRef as React.RefObject<HTMLDivElement>}
        />
        <h2> Player List: </h2>
        <PlayerList />
      </>
    )
  }
}
