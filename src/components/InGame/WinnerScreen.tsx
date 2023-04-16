import { useContext } from 'react'
import { AppContext } from 'src/store'

const WinnerScreen = () => {
  const [state] = useContext(AppContext)
  return (
    <div>The winner is: {state.lobby.players[state.lobby.winner!].name}</div>
  )
}

export default WinnerScreen
