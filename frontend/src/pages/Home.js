import { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import { requestGameToken, createNewGame } from "../services/api/game";

function Home({ name, setName, setToken, setgameCode }) {
  const [gameCode, setGameCode] = useState("");

  const history = useHistory();

  const handleNewGame = useCallback(
    async () => {
      if (name === "") {
        console.log(name);
        alert("please enter a name");
        return;
      }
      try {
        let { slug } = await createNewGame('Default Game', '');
        let token = await requestGameToken(slug);
        setToken(token);
        setgameCode(slug);
        console.log(name);
        history.push('/game');
      } catch (e) {
        throw e;
      }
    },
    [history, name, setToken, setgameCode]
  );

  const handleJoinGame = useCallback(
    async () => {
      if (gameCode === "") {
        alert("please enter a code");
        return;
      }
      if (name === "") {
        alert("please enter a name");
        return;
      }
      try {
        const token = await requestGameToken(gameCode);
        setToken(token);
        setgameCode(gameCode)
        history.push('/game');
      } catch (e) {
        alert("inlvaid code");
      }
    }
    ,
    [gameCode, history, name, setToken, setgameCode]
  );
  return (
    <div className="home h-screen p-10 px-12 bg-gradient-to-r from-purple-500 to-blue-500">
      <h1 className="m-4 py-4 text-4xl text-white font-semibold">Fishy business</h1>
      <input onInput={e => setName(e.target.value)} value={name} className="p-2 m-4 border-2 text-l border-gray-100 rounded-md focus:outline-none focus:ring focus:border-blue-300" placeholder="name" type="text"></input>
      <div className="m-4">
        <button onClick={handleNewGame} className="p-2 text-white text-xl bg-blue-500 rounded-md">start new game</button>
      </div>
      <div className="m-4">
        <input onInput={e => setGameCode(e.target.value)} value={gameCode} className="p-2 mr-4 border-2 text-l border-gray-100 rounded-md focus:outline-none focus:ring focus:border-blue-300" placeholder="game code" type="text"></input>
        <button onClick={handleJoinGame} className="p-2 rounded-md text-white text-xl bg-blue-700">join existing game</button>
      </div>
    </div>
  );
}

export default Home;