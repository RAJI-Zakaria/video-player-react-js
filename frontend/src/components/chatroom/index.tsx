import React, { useState, useEffect } from "react";
import "./abirStyle.css";
import Displayer from "./Displayer";
import Composer from "./Composer";
import config from "../../config.json";

interface Message {
  name: string;
  message: string;
  when: number;
}

const ChatRoom: React.FC<{ handleTimeClick: (time: string) => void }> = ({
  handleTimeClick,
}) => {
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [connected, setConnected] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);
  //Big shout out for Abir work --> Ferhat as well
  const [nameInput, setNameInput] = useState<string>("Abir");
  //This line is used for one purpose which is to show the user the format of the time he should use while sending a message.
  const [messageInput, setMessageInput] = useState<string>(
    "Funniest part at 1:02 and 00:12:32"
  );

  useEffect(() => {
    const URL = config.development.API_URL;
    // const URL = "wss://imr3-react.herokuapp.com";

    const newWs = new WebSocket(URL);

    newWs.onopen = () => {
      console.log("Connected");
      setConnected(true);
    };

    newWs.onmessage = (evt) => {
      const newMessages = JSON.parse(evt.data) as Message[];
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

  const addMessage = (message: Message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  const submitMessage = (messageString: string) => {
    const message: Message = {
      name: nameInput,
      message: messageString,
      when: Date.now(),
    };
    ws?.send(JSON.stringify(message));
  };

  return (
    <div className="chat-room-container">
      <h4 className="text-white mb-2">Chat App</h4>
      <Displayer
        connected={connected}
        messages={messages}
        handleTimeClick={handleTimeClick}
      />
      <Composer
        connected={connected}
        nameInput={nameInput}
        messageInput={messageInput}
        setNameInput={setNameInput}
        setMessageInput={setMessageInput}
        submitMessage={submitMessage}
      />
    </div>
  );
};

export default ChatRoom;
