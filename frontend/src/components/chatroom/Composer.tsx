import React from 'react';
import { Spinner } from 'react-bootstrap';

interface ComposerProps {
  connected: boolean;
  nameInput: string;
  messageInput: string;
  setNameInput: React.Dispatch<React.SetStateAction<string>>;
  setMessageInput: React.Dispatch<React.SetStateAction<string>>;
  submitMessage: (messageString: string) => void;
}

const Composer: React.FC<ComposerProps> = ({ connected, nameInput, messageInput, setNameInput, setMessageInput, submitMessage }) => {
  return (
    <div> 
        <div>
          <div className='chat-room-user'>
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">Username</span>
              <input className="form-control"
                type="text"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                aria-label="Username" aria-describedby="basic-addon1" />
            </div>
          </div>
          <div className='chat-room-message'>
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon2">Message</span>
              <input className="form-control"
                type="text"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                aria-label="Username" aria-describedby="basic-addon2" />
            </div>
            <button disabled={!connected} onClick={() => submitMessage(messageInput)}>
                {connected ? 'Send' : <>
                    <Spinner animation="border" role="status" size="sm" />
                    Please wait we are connecting WS
                </>}
            </button>
          </div>
        </div>
    </div>
  );
};

export default Composer;
