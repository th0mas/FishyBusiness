import Lobby from "./Lobby";
import Play from "./Play";
import useChannel from "../services/channel/useChannel";
import gameReducer from "../services/gameReducer"
import { Route, Switch, useRouteMatch } from "react-router-dom";

function Game({ token, gameCode }) {
  const initialState = {
    playing: true,
    players: [],
    regions: [
      {
        stock: 1000,
        types: ['carp']
      },
      {
        stock: 500,
        types: ['cod', 'hake']
      },
      {
        stock: 120,
        types: ['whale']
      },
      {
        stock: 600,
        types: ['cod', 'hake']
      },
      {
        stock: 1000,
        types: ['piss', 'hake']
      },
    ],
    me: {
      name: "player",
      money: 0,
      bait: 10,
    },
  };

  const { path } = useRouteMatch();

  const [state, localDispatch] = useChannel(gameCode, gameReducer, initialState, token);

  return (
    <Switch>
      <Route path={`${path}/play`}>
        <Play state={state} />
      </Route>
      <Route path={`${path}`}>
        <Lobby state={state} gameCode={gameCode} updateplayername={(name) => { localDispatch("name-change", name); }} />
      </Route>
    </Switch>
  );
}

export default Game;