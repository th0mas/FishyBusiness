import Rod from '../images/Rod.png';
import Net from '../images/Net.png';
import Trawler from '../images/Trawler.png';
import { useContext, useState } from 'react';
import dispatchContext from '../services/dispatchContext';
import Error from './Error';

const addItem = (me, item, dispatch, setError) => {
  if (me.money >= item.price) {
    let newItems = [...me.items]
    newItems.push(item)
    
    dispatch("money_update", (me.money - item.price).toString()) //pls dont ask I dont know either
    dispatch("items_update", newItems)
  } else {
    setError(true)
  }

}

const SlideItem = ({ item, me, shop }) => {
  const imgs = { "Rod": Rod, "Net": Net, "Trawler": Trawler }
  let dispatch = useContext(dispatchContext)
  const [error, setError] = useState(false);

  return (
    <div>
      <div className="max-w-md w-full mb-2 lg:flex rounded border-r border-b border-l border-grey-light lg:border-t lg:border-grey-light">
        <div className="flex items-center h-40 lg:h-auto lg:w-40 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden" title={item.name}>
          <img alt="" src={imgs[item.img]} />
        </div>
        <div className="w-full bg-white p-4 flex flex-col justify-between leading-normal">
          <div className="mb-8">
            <div className="text-black font-bold text-xl mb-2">{item.name}</div>
            <p className="text-grey-darker text-base">{item.description}</p>
            <p className="text-grey-darker text-base">rate: {item.rate}</p>
          </div>
          {shop &&
            <div className="flex justify-between">
              <div className="flex items-center">
                <p>£{item.price}</p>
              </div>
              <div className="flex items-center justify-end">
                <button onClick={() => addItem(me, item, dispatch, setError)} className="right-0 bg-green-500 text-white px-3 py-2 hover:bg-green-800 hover:text-white rounded-md text-sm font-medium">Buy</button>
              </div>
            </div>
          }
        </div>
      </div>
      { error && <Error msg="You do not have enough money!" setError={setError} /> }
    </div>
  )
}

export default SlideItem