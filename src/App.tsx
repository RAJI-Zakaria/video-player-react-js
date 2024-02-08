
import './App.css'
import { Container, Col, Row } from 'react-bootstrap';

import MsgcomposerAndChatRoom from './components/MessageComposerandChatRoom';


function App() {

  return (
    <Container>
      <Row>
        <Col>
          <MsgcomposerAndChatRoom />
        </Col>
      </Row>
    </Container>
  )
}

export default App
