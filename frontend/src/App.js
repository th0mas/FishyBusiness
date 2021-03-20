import './App.css';
import Play from './pages/Play';
import Home from './pages/Home';
import { BrowserRouter, Router, Switch } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Switch>
          <Router path="/play">
            <Play />
          </Router>
          <Router path="/">
            <Home />
          </Router>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
