import { useState } from "react"
import Navbar from "../components/Navbar";
import Region from "../components/Region";
import Shop from "../components/Shop";

function Play({ state }) {
  const [showShop, setShowShop] = useState(false);
  const regions = state.regions.map((_, index) => <Region key={index} index={index} regionState={state.regions[index]} />)

  return (
    <div className="play">
      <Navbar me={state.me} setShow={setShowShop} />
      {showShop &&
        <Shop setShow={setShowShop} />
      }
      <div className="flex">{regions}</div>
    </div>
  );
}

export default Play