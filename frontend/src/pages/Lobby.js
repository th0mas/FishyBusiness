import { useContext, useState } from "react";
import { useHistory } from "react-router";
import dispatchContext from "../services/dispatchContext";

function Lobby({ state, gameCode, updateplayername }) {
  const [name, setName] = useState("player1");
  const history = useHistory();

  let dispatch = useContext(dispatchContext)
  console.log(state);

  return (
    <div className="lobby h-screen p-10 px-12 bg-gradient-to-r from-blue-500 via-blue-400 to-green-200">
      <h1 className="m-2 py-4 text-4xl text-white font-semibold">lobby</h1>
      <button onClick={() => { dispatch("start_game") }} className="p-2 m-2 text-white text-xl bg-green-400 rounded-md">start</button>
      <button onClick={() => history.push("/")} className="p-2 text-white text-xl bg-red-500 rounded-md">leave</button>
      <div className="m-2 text-white text-lg">
        <p>code: {gameCode}</p>
      </div>
      <div className="players m-2 text-lg text-white">
        <h3>opponents:</h3>
        {
          state.players.map((p, index) => {
            console.log(p)
            return (
              <div key={index} className="playername">
                <p className="">{p.name}</p>
              </div>
            );
          })
        }
      </div>
    </div>
  );
}

export default Lobby;