import Navbar from "../components/Navbar";
import Region from "../components/Region";

function Play({ state }) {
  const regions = state.regions.map((_, index) => <Region key={index} index={index} regionState={state.regions[index]} />)

  return (
    <div className="play">
      <Navbar me={state.me} />
      <div className="flex flex-wrap">
        {regions}
      </div>
    </div>
  );
}

export default Play;