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
      money: 0,
      bait: 10,
    },
  };

  const [state, localDispatch] = useChannel(gameCode, gameReducer, initialState, token);

  return (
    <div>
      {
        state.playing ?
          <Play state={state} />
          :
          <Lobby state={state} gameCode={gameCode} startgame={() => { localDispatch('playing', true) }} updateplayername={(name) => { localDispatch("name-change", name); }} />
      }
    </div >
  );
}

export default Game;