import React, { useContext, useEffect } from 'react'
import lobbyContext from '../lobby-context'
import { AppContext, AppStateAction } from '../store'

const PlayerList = () => {
  const [state, dispatch] = useContext(AppContext)
  const lobbyCtx = useContext(lobbyContext)

  useEffect(() => {
    lobbyCtx.clientController.addServerEventListener('add-player', ({ pid }) =>
      dispatch({ type: AppStateAction.AddPlayer, payload: pid }),
    )
    lobbyCtx.clientController.addServerEventListener(
      'remove-player',
      ({ pid }) =>
        dispatch({ type: AppStateAction.RemovePlayer, payload: pid }),
    )
  }, [])

  return (
    <div>
      {state.lobby.pids.map((pid) => (
        <div key={pid}>
          <div>{lobbyCtx.clientController.playerData[pid].name}</div>
          <input
            type="checkbox"
            checked={lobbyCtx.clientController.playerData[pid].ready}
            readOnly={true}
          />
        </div>
      ))}
    </div>
  )
}

export default PlayerList

// export default class PlayerList extends React.Component<
//   {},
//   { pids: string[] }
// > {
//   static contextType = lobbyContext
//   context!: React.ContextType<typeof lobbyContext>

//   constructor(props: {}) {
//     super(props)
//     this.state = {
//       pids: [],
//     }
//     this.addPlayer = this.addPlayer.bind(this)
//     this.removePlayer = this.removePlayer.bind(this)
//   }

//   componentDidMount() {
//     this.context.clientController.addServerEventListener(
//       'add-player',
//       ({ pid }) => this.addPlayer(pid),
//     )
//     this.context.clientController.addServerEventListener(
//       'remove-player',
//       ({ pid }) => this.removePlayer(pid),
//     )
//     this.context.clientController.addServerEventListener(
//       'set-ready-status',
//       () => this.forceUpdate(),
//     )
//   }
//   addPlayer(pid: string) {
//     this.setState({ pids: [...this.state.pids, pid] })
//   }

//   removePlayer(pid: string) {
//     this.setState({ pids: this.state.pids.filter((opid) => opid !== pid) })
//   }

//   render() {
//     return (
//       <div>
//         {this.state.pids.map((pid) => (
//           <div key={pid}>
//             <div>{this.context.clientController.playerData[pid].name}</div>
//             <input
//               type="checkbox"
//               checked={this.context.clientController.playerData[pid].ready}
//               readOnly={true}
//             />
//           </div>
//         ))}
//       </div>
//     )
//   }
// }
