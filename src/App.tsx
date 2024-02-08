import './App.css'

import { Container, Col, Row } from 'react-bootstrap';
import Player from './components/Player/Player';

import MsgcomposerAndChatRoom from './components/MessageComposerandChatRoom';


function App() {

  return (
    <Container>
      <Row>
        <Col>
          <Player />
        </Col>
        <Col>
          <MsgcomposerAndChatRoom />
        </Col>
      </Row>
    </Container>
  )
}

export default App
