import React, { useEffect, useRef } from "react";
import moment from "moment";

interface Message {
  name: string;
  message: string;
  when: number;
}

interface DisplayerProps {
  connected: boolean;
  messages: Message[];
  handleTimeClick: (time: string) => void;
}

const Displayer: React.FC<DisplayerProps> = ({
  connected,
  messages,
  handleTimeClick,
}) => {
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [messages]);

  const renderMessageContent = (content: string) => {
    const timeRegex = /(\d{1,2}:\d{2}(:\d{2})?)/g;
    let lastIndex = 0;
    const parts: JSX.Element[] = [];
    let match;

    while ((match = timeRegex.exec(content)) !== null) {
      const time = match[0];
      const startIndex = match.index;
      const endIndex = startIndex + time.length;

      // Add non-time part before this time
      if (startIndex > lastIndex) {
        parts.push(
          <span key={lastIndex}>
            {content.substring(lastIndex, startIndex)}
          </span>
        );
      }

      // Add time part as a button
      parts.push(
        <button
          className="p-0 px-2 rounded"
          key={startIndex}
          onClick={() => handleTimeClick(time)}
        >
          {time}
        </button>
      );

      lastIndex = endIndex;
    }

    // Add remaining non-time part
    if (lastIndex < content.length) {
      parts.push(<span key={lastIndex}>{content.substring(lastIndex)}</span>);
    }

    return parts;
  };

  return (
    <div>
      {connected ? (
        <div className="chat-room-history">
          <ul className="list-group">
            {messages?.length == 0 && (
              <li className="list-group-item">
                <p>No comments found!</p>
              </li>
            )}
            {messages.map((message, index) => (
              <li className="list-group-item" key={index}>
                <p>
                  <strong>{message.name}:</strong>{" "}
                  {renderMessageContent(message.message)}
                </p>
                <p>{moment(message.when).format("YYYY-MM-DD HH:mm:ss")}</p>
              </li>
            ))}
          </ul>
          {/* Ref applied to the last item */}
          <div ref={listRef}></div>
        </div>
      ) : (
        <p>Connecting...</p>
      )}
    </div>
  );
};

export default Displayer;
