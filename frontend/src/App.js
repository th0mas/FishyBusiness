import Home from './pages/Home';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import SocketProvider from './services/channel/SocketProvider'
import { useState } from 'react';
import Game from './pages/Game';

function App() {
  const [token, setToken] = useState();
  const [gameCode, setgameCode] = useState();
  const [name, setName] = useState("");

  return (
    <SocketProvider wsUrl={"/socket"} >
      <BrowserRouter>
        <Switch>
          <Route path="/game" >
            <Game token={token} gameCode={gameCode} name={name} />
          </Route>
          <Route path="/">
            <Home setToken={setToken} setgameCode={setgameCode} name={name} setName={setName} />
          </Route>
        </Switch>
      </BrowserRouter>
    </SocketProvider>
  );
}

export default App