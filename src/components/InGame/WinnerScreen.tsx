import { useContext } from 'react'
import { AppContext } from 'src/store'
import './WinnerScreen.css'

const WinnerScreen = () => {
  const [state] = useContext(AppContext)
  return (
    <div className='winner-screen-container'>
      <div className='winner-screen-message'>
        The winner is: tom!
        {/* The winner is: {state.lobby.players[state.lobby.winner!].name} */}
      </div>
      <div className="winner-screen-message-2">
        Thanks for playing settlers.io! 
      </div>
    </div>
    
  )
}

export default WinnerScreen
