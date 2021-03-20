import { useState } from "react";

function Lobby({ state, updateplayername }) {
  state.players = state.players.length === 0 ? ['Josh', 'Tim'] : state.players;
  const [name, setName] = useState("player1");

  return (
    <div className="lobby">
      <h1 className="">lobby</h1>
      <div className="playername">
        <input className="border-2 p-1 mr-1 rounded-md border-blue-300" onChange={(e) => setName(e.target.value)} value={name} />
        <button className="border-2 p-1 rounded-md border-indigo-300" onClick={() => updateplayername(name)}>set name</button>
      </div>
      <div className="players">
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