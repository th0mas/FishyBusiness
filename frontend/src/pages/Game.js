import Lobby from "./Lobby";
import Play from "./Play";
import useChannel from "../services/channel/useChannel";
import gameReducer from "../services/gameReducer"

function Game({ token, gameCode }) {
    const playing = false;

    const initialState = {
        playing: false
    }

    const state = useChannel(gameCode, gameReducer, initialState, token)
    
    return (
        <div>
            {
                playing ?
                    <Play state={state} />
                    :
                    <Lobby state={state} />
            }
        </div>
    );
}

export default Game;