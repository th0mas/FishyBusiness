import Lobby from "./Lobby";
import Play from "./Play";

function Game({ token, gameCode }) {
    const playing = false;

    return (
        <div>
            {
                playing ?
                    <Play />
                    :
                    <Lobby />
            }
        </div>
    );
}

export default Game;