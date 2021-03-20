function Lobby({ state, updateplayervalues }) {
  state.players = state.players.length === 0 ? ['a', 'b'] : state.players;

  return (
    <div className="lobby p-10">
      <h1 className="text-3xl">Lobby</h1>
      <div className="players">
        <div className="playername">
          <input className="" value={state.me.name} onInput={updateplayervalues} />
        </div>
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