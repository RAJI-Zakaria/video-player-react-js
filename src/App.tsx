import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Container, Col, Row } from 'react-bootstrap';
import Player from './components/Player/Player';


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
