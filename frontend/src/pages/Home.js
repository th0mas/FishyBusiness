import { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import requestGameToken from "../services/api/requestGameToken";

function Home({ setToken, setgameCode }) {
    const [gameCode, setGameCode] = useState("");

    const history = useHistory();

    const handleNewGame = useCallback(
        () => {
            requestGameToken(gameCode, setToken);
            setgameCode(gameCode);
            history.push('/game');
        },
        [gameCode, history, setToken, setgameCode]
    );

    const handleJoinGame = useCallback(
        () => {
            if (gameCode === "") {
                alert("please enter a code");
                return;
            }
            setgameCode(gameCode);
            requestGameToken(gameCode, setToken);
            history.push('/game');
        }
        ,
        [gameCode, history]
    );
    return (
        <div className="home h-screen p-10 px-12 bg-gradient-to-r from-purple-500 to-blue-500">
            <h1 className="m-4 py-4 text-4xl text-white font-semibold">Fishy business</h1>
            <div className="m-4">
                <button onClick={handleNewGame} className="p-2 text-white text-xl bg-blue-500 rounded-md">start game</button>
            </div>
            <div className="m-4">
                <button onClick={handleJoinGame} className="p-2 mr-4 rounded-md text-white text-xl bg-blue-700">join game</button>
                <input onInput={e => setGameCode(e.target.value)} value={gameCode} className="p-2 border-2 text-l border-gray-100 rounded-md focus:outline-none focus:ring focus:border-blue-300" placeholder="game code" type="text"></input>
            </div>
        </div>
    );
}

export default Home;