import { Button, Nav, Navbar } from 'react-bootstrap';
import light_logo from './light_logo.png';
import dark_logo from './dark_logo.png';
import './App.css';
import Quiz from './containers/Quiz';
import { useState } from 'react';
import Folder from './containers/Folder';
import { BrowserRouter, Route, Routes } from "react-router-dom";


function App() {
  const [mode, setMode] = useState("dark")
  const handleMode = () => mode === 'dark' ? setMode('light') : setMode('dark')

  return (
    <div className={`App-container ${mode}Background`}>
      <Navbar bg={mode} variant={mode} style={{ 'borderBottom': '1px solid rgb(13 110 253 / 25%)' }} >
        <Navbar.Brand href="https://saucelabs.com/">
          <img
            height={50}
            src={mode === 'light' ? light_logo : dark_logo}
            className="d-inline-block align-top"
            alt="React Bootstrap logo"
          />
        </Navbar.Brand>
        <Nav>
          <Nav.Link href="/">Quiz</Nav.Link>
          <Nav.Link href="/directory">Folder</Nav.Link>
        </Nav>
      </Navbar>

      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Quiz />} />
          <Route path="/directory" element={<Folder />} />
        </Routes>
      </BrowserRouter>
      <Button className='modeButton' variant={mode} onClick={handleMode}>This is {mode.toUpperCase()} mode</Button>
    </div >
  );
}

export default App;
