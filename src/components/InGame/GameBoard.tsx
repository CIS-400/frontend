import React, { useContext } from 'react'
import PlayerList from '../PlayerList'

export default class GameBoard extends React.Component<{}> {
  render() {
    return (
      <>
        <h1> game board TO DO </h1>
        <h2> Player List: </h2>
        <PlayerList />
      </>
    )
  }
}
