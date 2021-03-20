import { useState } from "react";

function Lobby({ state, updateplayername }) {
  state.players = state.players.length === 0 ? ['Josh', 'Tim'] : state.players;
  const [name, setName] = useState("player1");

  return (
    <div className="lobby">
      <h1 className="">lobby</h1>
      <div className="playername">
        <input onChange={(e) => setName(e.target.value)} className="" value={name} />
        <button onClick={() => updateplayername(name)}>Change name</button>
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