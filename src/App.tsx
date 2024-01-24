import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Container, Col, Row } from 'react-bootstrap';


function App() {
  const [count, setCount] = useState(0)

  return (
    <Container>
      <Row>
      <Col sm={6}>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </Col>
      <Col sm={6}>
      <h1>Redeemers Salute</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <br/>
        <br/>
        <button onClick={() => setCount(() => 0)}>
          Reset
        </button>
      </div>
      </Col>
      </Row>
    </Container>
  )
}

export default App
