import Lobby from "./Lobby";
import Play from "./Play";
import useChannel from "../services/channel/useChannel";
import gameReducer from "../services/gameReducer"

function Game({ token, gameCode }) {
  const initialState = {
    playing: false,
    players: [],
    me: {
      name: "player",
    },
  };

  const [state, localDispatch] = useChannel(gameCode, gameReducer, initialState, token);

  return (
    <div>
      {
        state.playing ?
          <Play state={state} />
          :
          <Lobby state={state} gameCode={gameCode} updateplayername={(name) => { localDispatch("name-change", name); }} />
      }
    </div>
  );
}

export default Game;