import Rod from '../images/Rod.png';
import Net from '../images/Net.png';
import Trawler from '../images/Trawler.png';
import { useContext, useState } from 'react';
import dispatchContext from '../services/dispatchContext';

const addItem = (me, item, dispatch, setError) => {
  if (me.money >= item.price) {
    let newItems = [...me.items]
    newItems.push(item)

    dispatch("money_update", me.money - item.price)
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
      {error &&
        <div className="bg-red-200 px-6 py-4 my-4 rounded-md text-lg flex items-center mx-auto w-3/4 xl:w-2/4">
          <svg viewBox="0 0 24 24" className="text-red-600 w-5 h-5 sm:w-5 sm:h-5 mr-3">
            <path fill="currentColor"
              d="M11.983,0a12.206,12.206,0,0,0-8.51,3.653A11.8,11.8,0,0,0,0,12.207,11.779,11.779,0,0,0,11.8,24h.214A12.111,12.111,0,0,0,24,11.791h0A11.766,11.766,0,0,0,11.983,0ZM10.5,16.542a1.476,1.476,0,0,1,1.449-1.53h.027a1.527,1.527,0,0,1,1.523,1.47,1.475,1.475,0,0,1-1.449,1.53h-.027A1.529,1.529,0,0,1,10.5,16.542ZM11,12.5v-6a1,1,0,0,1,2,0v6a1,1,0,1,1-2,0Z"></path>
          </svg>
          <span className="text-red-800 text-sm "> You do not have enough money!</span>
          <button onClick={() => setError(false)} className="rounded-md text-white hover:text-gray-200 hover:outline-none hover:ring-2 hover:ring-gray-200">
            <span className="sr-only">Close panel</span>
            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

      }
    </div>
  )
}

export default SlideItem