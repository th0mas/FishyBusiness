import Lobby from "./Lobby";
import Play from "./Play";
import useChannel from "../services/channel/useChannel";
import gameReducer from "../services/gameReducer"
import dispatchContext from "../services/dispatchContext";

function Game({ name, token, gameCode }) {
  const initialState = {
    playing: false,
    lobby_players: [],
    players: [],
    regions: [{
      stock: 1000,
      types: ['piss', 'hake'],
      active: []
    },
    ],
    me: {
      regions_fished: new Set(),
      name: name,
      money: 15,
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