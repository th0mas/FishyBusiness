import Navbar from "../components/Navbar";

function Play({ state }) {
  return (
    <div className="play">
      <Navbar me={state.me}/>
      <h1>Play</h1>
    </div>
  );
}

export default Play;