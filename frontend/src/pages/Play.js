import { useState } from "react"
import Navbar from "../components/Navbar";
import Region from "../components/Region";
import SlideWindow from "../components/SlideWindow";

function Play({ state }) {
  const [showShop, setShowShop] = useState(false);
  const [showItems, setShowItems] = useState(false);
  const regions = state.regions.map((_, index) => <Region key={index} index={index} regionState={state.regions[index]} />)

  return (
    <div className="play">
      <Navbar me={state.me} setShowShop={setShowShop} setShowItems={setShowItems} />
      {showShop &&
        <SlideWindow title="Shop" setShow={setShowShop} me={state.me} />
      }
      {showItems &&
        <SlideWindow title="Items" setShow={setShowItems} me={state.me} />
      }
      <div className="flex">{regions}</div>
    </div>
  );
}

export default Play