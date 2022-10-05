import React from 'react';
import { useParams } from 'react-router-dom';

import GameSettings from '../components/GameSettings';
import LobbyChat from '../components/LobbyChat';

export default class Lobby extends React.Component<{}> {
  render() {
    return (
      <>
        <h1>Lobby</h1>

        <GameSettings lobbyid='dev' />
        <hr />
        <LobbyChat />
      </>
    );
  }
}
// const Lobby = () => {
//   // const [isPrivate, setIsPrivate] = useState(false);

//   // useEffect(() => {
//   //   const { cc } = useContext();
//   //   setIsPrivate(cc.getLobbySettings().isPrivate);
//   //   cc.addOnLobbySettingsChangeListener((lobbySettings) => {
//   //     setIsPrivate(lobbySettings.isPrivate);
//   //   });
//   // }, []);

//   const { lobbyid } = useParams();
//   return <h1> Lobby ID: {lobbyid} </h1>;
// };

// export default Lobby;
