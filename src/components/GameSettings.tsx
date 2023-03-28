import React, { useContext } from 'react'
import styled from 'styled-components'

import {
  LobbySettings,
  GameSpeed,
  LobbyStatus,
} from '../../../backend/src/lobby'
import lobbyContext from '../lobby-context'
import Lobby from '../pages/Lobby'
import { AppContext, AppStateAction } from '../store'
import LobbyChat from './LobbyChat'

const GameSettingsContainer = styled.div`
  margin-left: 20px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-left: 20px;
`;

const InviteWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const InviteCode = styled.div`
  font-size: 18px;
  //flex: 1;
`;

const CopyButton = styled.button`
  margin-left: 8px;
`;

const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const CheckboxLabel = styled.label`
  font-size: 18px;
  margin-top: 5px;
  margin-right: 8px;
`;

const CheckboxInput = styled.input`
  margin-top: 10.5px;
  margin-right: 8px;
  display: inline-block;
  vertical-align: middle;
`;

const StartGameButton = styled.button`
  font-size: 18px;
  font-weight: bold;
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  margin-top: 10px;

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }

  &:not(:disabled):hover {
    background-color: #0069d9;
  }
`;

const GameSettings = (props: { lobbyid: string }) => {
  const [state, dispatch] = useContext(AppContext)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(props.lobbyid);
  };

  const updateSetting = (setting: Partial<LobbySettings>) => {
    const newSettings = {
      ...state.lobby.settings,
      ...setting,
    }
    dispatch({
      type: AppStateAction.ChangeLobbySetting,
      payload: newSettings,
    })
    lobbyContext.clientController.updateSettings(newSettings)
  }

  const startGame = () => {
    dispatch({
      type: AppStateAction.SetLobbyStatus,
      payload: LobbyStatus.InGame,
    })
    lobbyContext.clientController.startGame()
    document.cookie = `allow-list-id=${lobbyContext.clientController.pid}`
  }
  
  return (
    <>
      <Title> Game Settings</Title>
      <GameSettingsContainer>
      <InviteWrapper>
          <InviteCode>Invite friends with this code: {props.lobbyid}</InviteCode>
          <CopyButton onClick={copyToClipboard}>Copy</CopyButton>
        </InviteWrapper>
        {/* TODO: have input be placeholder for url, readonly and copy to clipboard */}
        {/* <input type="text" /> */}

        <CheckboxWrapper>
        <CheckboxLabel>Private Game</CheckboxLabel>
          <CheckboxInput
            type="checkbox"
            onChange={(e) => updateSetting({ isPrivate: e.target.checked })}
            checked={state.lobby.settings.isPrivate}
            disabled={lobbyContext.clientController.pid !== state.lobby.owner}
          />
        </CheckboxWrapper>

        <CheckboxWrapper>
          <CheckboxLabel>Hide Bank Cards</CheckboxLabel>
          <CheckboxInput
            type="checkbox"
            onChange={(e) => updateSetting({ hideBankCards: e.target.checked })}
            checked={state.lobby.settings.hideBankCards}
            disabled={lobbyContext.clientController.pid !== state.lobby.owner}
          />
        </CheckboxWrapper>
        
        {/* <div>Game Speed</div>  */}
        <StartGameButton
          disabled={
            lobbyContext.clientController.pid !== state.lobby.owner ||
            state.lobby.players.filter((p) => p.ready).length !==
              state.lobby.players.length
          }
          onClick={startGame}
        >
          Start Game!
        </StartGameButton>
      </GameSettingsContainer>
    </>
  )
}

export default GameSettings
