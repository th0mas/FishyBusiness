import Lobby from "./Lobby";
import Play from "./Play";
import useChannel from "../services/channel/useChannel";
import gameReducer from "../services/gameReducer"
import { Route, Switch, useRouteMatch } from "react-router-dom";
import dispatchContext from "../services/dispatchContext";

function Game({ name, token, gameCode }) {
  const initialState = {
    playing: false,
    players: [],
    regions: [{
      stock: 1000,
      types: ['piss', 'hake'],
      active: []
    },
    ],
    me: {
      name: "player",
      money: 15,
      bait: 10,
      items: [],
    },
  };

  const [state, localDispatch] = useChannel(name, gameCode, gameReducer, initialState, token);

  return (

    
    <dispatchContext.Provider value={localDispatch}>
     { state.playing 
      ? <Play state={state} /> 
      : <Lobby state={state} gameCode={gameCode} updateplayername={(name) => { localDispatch("name-change", name); }} />
     }
    </dispatchContext.Provider>
  );
}

export default Game;