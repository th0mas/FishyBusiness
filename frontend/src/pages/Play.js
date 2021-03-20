import useChannel from "../services/channel/useChannel";
import gameReducer from "../services/gameReducer"

function Play({ token, gameCode }) {
    const initialState = {
        noOfFish: 10
    }

    const {
        noOfFish
    } = useChannel(gameCode, gameReducer, initialState)

    return (
        <div className="play">
            <h1>Play</h1>
            <p>{noOfFish}</p>
        </div>
    );
}

export default Play;