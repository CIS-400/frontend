import React, { useContext } from 'react'
import PlayerList from '../PlayerList'
import ClientController from '../../client-controller'

export default class GameBoard extends React.Component<{ clientController: ClientController }> {
  render() {
    const { clientController } = this.props
    return (
      <>
        <h1> game board TO DO </h1>
        <PlayerList clientController={clientController}/>
      </>
    )
  }
}
