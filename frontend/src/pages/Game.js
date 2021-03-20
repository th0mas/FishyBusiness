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

  const [state] = useChannel(gameCode, gameReducer, initialState, token);

  return (
    <div>
      {
        state.playing ?
          <Play state={state} />
          :
          <Lobby state={state} />
      }
    </div>
  );
}

export default Game;