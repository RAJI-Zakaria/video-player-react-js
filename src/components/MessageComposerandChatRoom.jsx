
import React, { useState, useEffect } from 'react';


const MsgcomposerAndChatRoom = () => {

const [ws, setWs] = useState(null);
const [connected, setConnected] = useState(false);
const [messages, setMessages] = useState([]);
const [name, setName] = useState('');
const [messageInput, setMessageInput] = useState('');

useEffect(() => {
  const URL = "wss://imr3-react.herokuapp.com";
  const newWs = new WebSocket(URL);

  newWs.onopen = () => {
    console.log("Connected");
    setConnected(true);
  };

  newWs.onmessage = (evt) => {
    const newMessages = JSON.parse(evt.data);
    newMessages.forEach((message) => {
      addMessage(message);
    });
  };

  newWs.onclose = () => {
    console.log("Disconnected, reconnecting...");
    setConnected(false);
    setWs(new WebSocket(URL));
  };

  setWs(newWs);

  return () => {
    // Cleanup WebSocket on component unmount
    newWs.close();
  };
}, []);

const addMessage = (message) => {
  setMessages((prevMessages) => [...prevMessages, message]);
};

const submitMessage = (messageString) => {
  const message = { name, message: messageString,when: Date.now()};

    ws.send(JSON.stringify(message));
  };



return (
  <div>
    <h1>Chat App</h1>
    {connected ? (
      <div>
        <div>
          <strong>Username:</strong>{' '}
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <strong>Message:</strong>{' '}
          <input
            type="text"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
          />
          <button onClick={() => submitMessage(messageInput)}>Send</button>
        </div>
        <div>
          <h2>Chat History:</h2>
          <ul>
            {messages.map((message, index) => (
              <li key={index}>
                <p><strong>{message.name}:</strong> {message.message}</p>
                <p>{message.when}</p> 
              </li>
            ))}
          </ul>
        </div>
      </div>
    ) : (
      <p>Connecting...</p>
    )}
  </div>
);
 }
 export default MsgcomposerAndChatRoom