import { useState } from "react"
import Leaderboard from "../components/Leaderboard";
import Navbar from "../components/Navbar";
import Region from "../components/Region";
import SlideWindow from "../components/SlideWindow";
import StockGraph from "../components/StockGraph";

function Play({ state }) {
  const [showShop, setShowShop] = useState(false);
  const [showItems, setShowItems] = useState(false);
  const regions = state.regions.map((_, index) => <Region key={index} gameState={state} index={index} regionState={state.regions[index]} me={state.me} />)

  return (
    <div className="play">
      <Navbar me={state.me} setShowShop={setShowShop} setShowItems={setShowItems} />
      {showShop &&
        <SlideWindow title="Shop" setShow={setShowShop} me={state.me} />
      }
      {showItems &&
        <SlideWindow title="Items" setShow={setShowItems} me={state.me} />
      }
      <div className="flex">
        <Leaderboard players={state.players} />
        <StockGraph gameState={state} />
      </div>
      <div className="flex">{regions}</div>
    </div>
  );
}

export default Play