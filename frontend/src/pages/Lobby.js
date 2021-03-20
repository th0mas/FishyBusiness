import { useState } from "react";
import { useHistory } from "react-router";

function Lobby({ state, gameCode, updateplayername }) {
  state.players = state.players.length === 0 ? ['Josh', 'Tim'] : state.players;
  const [name, setName] = useState("player1");
  const history = useHistory();

  return (
    <div className="lobby h-screen p-10 px-12 bg-gradient-to-r from-blue-500 via-blue-400 to-green-200">
      <h1 className="m-2 py-4 text-4xl text-white font-semibold">lobby</h1>
      <button onClick={() => history.push("/game/play")} className="p-2 m-2 text-white text-xl bg-green-400 rounded-md">start</button>
      <button onClick={() => history.push("/")} className="p-2 text-white text-xl bg-red-500 rounded-md">leave</button>
      <div className="playername m-2">
        <input className="p-2 mr-1 rounded-md" onChange={(e) => setName(e.target.value)} value={name} />
        <button className="text-white p-2 rounded-md bg-blue-500" onClick={() => updateplayername(name)}>set name</button>
      </div>
      <div className="m-2 text-white">
        <p>code: {gameCode}</p>
      </div>
      <div className="players m-2 text-white">
        <h3>opponents:</h3>
        {
          state.players.map((p, index) => {
            return (
              <div key={index} className="playername">
                <p className="" >{p}</p>
              </div>
            );
          })
        }
      </div>
    </div>
  );
}

export default Lobby;