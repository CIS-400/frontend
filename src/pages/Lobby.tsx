import React from 'react';
import { useParams } from 'react-router-dom';

const Lobby = () => {
  // const [isPrivate, setIsPrivate] = useState(false);

  // useEffect(() => {
  //   const { cc } = useContext();
  //   setIsPrivate(cc.getLobbySettings().isPrivate);
  //   cc.addOnLobbySettingsChangeListener((lobbySettings) => {
  //     setIsPrivate(lobbySettings.isPrivate);
  //   });
  // }, []);

  const { lobbyid } = useParams();
  return <h1> Lobby ID: {lobbyid} </h1>;
};

export default Lobby;
