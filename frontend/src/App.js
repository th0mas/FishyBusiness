import Play from './pages/Play';
import Home from './pages/Home';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import SocketProvider from './services/channel/SocketProvider'
import { useState } from 'react';

function App() {
  const [token, setToken] = useState();
  const [gameCode, setgameCode] = useState();

  return (
    <SocketProvider wsUrl={"/socket"} >
      <BrowserRouter>
        <Switch>
          <Route path="/play">
            <Play token={token} gameCode={gameCode} />
          </Route>
          <Route path="/">
            <Home setToken={setToken} setgameCode={setgameCode} />
          </Route>
        </Switch>
      </BrowserRouter>
    </SocketProvider>
  );
}

export default App