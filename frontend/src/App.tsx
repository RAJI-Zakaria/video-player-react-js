import './App.css'

import { Container, Col, Row } from 'react-bootstrap';
import Player from './components/Player';

function App() {

  return (
    <Container>
      <Row>
        <Col>
          <Player />
        </Col>
      </Row>
    </Container>
  )
}

export default App
