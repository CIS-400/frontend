import React, { useState, useEffect } from 'react';
import AWS from 'aws-sdk';

AWS.config.update({
  accessKeyId: 'AKIAWHYW7CNQRSY256YQ',
  secretAccessKey: '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',
  region: 'us-east-1',
});

const dynamoDB = new AWS.DynamoDB({ region: 'us-east-1' });
const params = {
  TableName: 'settlers-lobbies',
};

const Lobbies = () => {
  const [lobbies, setLobbies] = useState<string[]>([]);

  useEffect(() => {
    const retrieveLobbies = (): Promise<string[]> => {
      return new Promise((resolve, reject) => {
        dynamoDB.scan(params, (err, data) => {
          if (err) {
            console.error('Error retrieving items from DynamoDB:', err);
            reject(err);
          } else {
            const lobbies: string[] = [];
            if (data.Items) {
              data.Items.forEach((item) => {
                if (item['data-string'].S) {
                  const JSONData = JSON.parse(item['data-string'].S);
                  lobbies.push(JSONData.id);
                }
              });
            }
            resolve(lobbies);
          }
        });
      });
    };

    retrieveLobbies().then((lobbies) => setLobbies(lobbies));
  }, []);

  const createLobby = async () => {
    const newHash = Math.random().toString(36).substring(2, 36);
    const newLobby = {
      id: newHash,
      status: "PreGame",
      settings: {isPrivate: false, hideBankCards: false, gameSpeed: "Medium"},
      playerData: {}
      // Add any other properties you want to include in the new lobby object
    };
    const newLobbyJSON = JSON.stringify(newLobby);
  
    // Define the DynamoDB item
    const item = {
      'lobby-id': { S: newHash },
      'data-string': { S: newLobbyJSON },
    };
  
    // Define the parameters for the putItem method
    const putParams = {
      TableName: 'settlers-lobbies',
      Item: item,
    };
  
    // Call the putItem method to add the new lobby to the table
    dynamoDB.putItem(putParams, (err, data) => {
      if (err) {
        console.error('Error adding item to DynamoDB:', err);
      } else {
        console.log('Successfully added item to DynamoDB:', data);
      }
    });
  
    const response = await fetch('http://localhost:8000/api/create-lobby', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newLobby),
    });
  
    if (!response.ok) {
      const message = `An error has occurred: ${response.status}`;
      throw new Error(message);
    }
  
    const data = await response.json();
    console.log(data);

    // Navigate to the new lobby URL
    window.location.href = `/${newHash}`;
  };

  return (
    <>
      <h1>Lobbies</h1>
      <div>
        <button onClick={createLobby}>Create new lobby</button>
      </div>
      {lobbies.map((lobby) => (
        <div key={lobby}>
          <a href={`/${lobby}`}>{lobby}</a>
        </div>
      ))}
    </>
  );
};

export default Lobbies;
