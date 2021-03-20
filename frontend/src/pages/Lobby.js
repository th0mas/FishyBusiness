function Lobby({ state }) {
    const players = ['a', 'b', 'c', 'd'];

    return (
        <div className="lobby">
            <h1>Lobby</h1>
            {
                players.map((value, index) => {
                    return <p key={index}>{value}</p>;
                })
            }
        </div>
    );
}

export default Lobby;