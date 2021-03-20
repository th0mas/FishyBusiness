import './App.css';
import Play from './pages/Play';
import Home from './pages/Home';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import SocketProvider from './services/channel/SocketProvider'

function App() {
  return (
  <SocketProvider wsUrl={"/socket"} >
    <BrowserRouter>
      <Switch>
        <Route path="/play">
          <Play />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </BrowserRouter>
  </SocketProvider>
  );
}

export default App