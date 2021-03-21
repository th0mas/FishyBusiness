import { useContext, useState } from "react";
import dispatchContext from "../services/dispatchContext";
import DropdownMenu from "./DropdownMenu";
import Error from "./Error";

function Region({ index, regionState, gameState, me }) {

  let dispatch = useContext(dispatchContext);
  const [error, setError] = useState(false);

  const updateItems = (item, newItems, currItem, newRegions, region) => {
    if (item.region === region) {
      currItem.region.filter(i => i !== region)

      currItem.count -= 1
      newRegions[index].active = newRegions[index].active.filter(player => player !== `${me.name} - ${currItem.name} (${currItem.count + 1})`)
    } else {
      // let oldRegion = currItem.region
      currItem.region.push(region)
      currItem.count -= 1
      newRegions[index].active.push(`${me.name} - ${currItem.name} (${currItem.count + 1})`)
      // if (oldRegion.length > 0) {
      //   newRegions[oldRegion].active = newRegions[oldRegion].active.filter(player => player !== `${me.name} - ${currItem.name} (${currItem.count + 1})`)
      //}
    }

    dispatch("items_update", newItems)
    dispatch("update_region_active", { regions: newRegions })

  }

  const handleFish = (item, region) => {
    let newItems = [...me.items]
    let currItem = newItems.find(i => i === item)

    let newRegions = [...gameState.regions]
    console.log(newRegions)

    if (currItem.count >= 1) {
      updateItems(item, newItems, currItem, newRegions, region)
    } else if (currItem.count == 0 ) {
      console.log(currItem.region)
      let oldRegion = currItem.region.splice(0, 1)
      currItem.count += 1
      console.log(oldRegion)
      newRegions[oldRegion].active = newRegions[oldRegion].active.filter(player => player !== `${me.name} - ${currItem.name} (${currItem.count + 1})`)
      updateItems(item, newItems, currItem, newRegions, region)
    }


  }

  const handleOilSpill = () => {
    if (me.items.some(item => item.name === "Oil Spill")) {
      let newRegions = [...gameState.regions]
      newRegions[index].stock = Math.floor(newRegions[index].stock / 2)

      let newItems = [...me.items]
      newItems = newItems.filter(item => item.name !== "Oil Spill")

      dispatch("items_update", newItems)
      dispatch("update_region_active", {regions: newRegions})
    } else {
      setError(true)
    }

  }

  return (
    <div className="region w-full m-2 p-2 border-2 rounded-md border-blue-400">
      <div className="flex flex-col justify-items-stretch">
        <div className="flex-1">
          <h1 className="font-semibold">Region: {regionState.name}</h1>
          <p>Players here: </p>
          {
            regionState.active.map((value, index) => <p key={index}>{value}</p>)
          }
          <br />
          <p>Stock: {regionState.stock}</p>
          {
            regionState.types.map((value, index) => <p key={index}>{value}</p>)
          }
        </div>
        <div className="flex justify-center">
          <DropdownMenu gameState={gameState} handleClick={handleFish} region={index} />
          <div className="flex">
            <button onClick={handleOilSpill} className="outline-none hover:bg-gray-600 focus:outline-none border px-3 py-1 rounded-sm bg-gray-500 my-2">
              <span className="pr-1 font-semibold text-white flex-1">oil spill</span>
            </button>
          </div>
        </div>
            { error && <Error msg="You do not have any oil!" setError={setError} /> }
      </div>
    </ div>
  );
}

export default Region;