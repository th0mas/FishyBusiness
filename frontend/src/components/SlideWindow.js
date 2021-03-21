import { useState } from "react";
import SlideItem from "./SlideItem";

const SlideWindow = ({ title, setShow, me}) => {
  const windowItems = [{name: "Fishing Rod", price: 10, description: "Mild overfishing", img: "Rod"},
                     {name: "Fishing Net", price: 100, description: "Big overfishing", img: "Net"},
                     {name: "Trawler", price: 1000, description: "Fish annihilation", img: "Trawler"}]

  return (
    <div className="fixed inset-0 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
        <section className="absolute inset-y-0 right-0 pl-10 max-w-full flex" aria-labelledby="slide-over-heading">
          <div className="relative w-screen max-w-md">
            <div className="absolute top-0 left-0 -ml-8 pt-4 pr-2 flex sm:-ml-10 sm:pr-4">
              <button onClick={() => setShow(false)} className="rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white">
                <span className="sr-only">Close panel</span>
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="h-full flex flex-col py-6 bg-white shadow-xl overflow-y-scroll">
              <div className="flex items-center justify-between px-6">
                <div>
                  <h2 id="slide-over-heading" className="text-lg font-medium text-gray-900">
                    { title }
                  </h2>
                </div>
                <div>
                  {title === "Shop" &&
                    <p>£{me.money}</p>
                  }
                </div>
              </div>
              <div className="mt-6 relative flex-1 px-4 sm:px-6">
                <div className="absolute inset-0 px-4 sm:px-6">
                  { title === "Shop" ? windowItems.map(item => {
                    if (me.items.filter(e => e.name === item.name).length === 0) {
                      return <SlideItem key={item.name} item={item} me={me} shop={true} />
                    }
                  }) : me.items.length === 0 ? 
                    <p>No items :(</p> :  
                    me.items.map(item => <SlideItem key={item.name} item={item} me={me} shop={false} /> )
                  }
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default SlideWindow