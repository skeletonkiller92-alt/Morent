import React, { useState } from 'react';
import { CarCard } from '../components/CarCard';
import { MOCK_CARS } from '../constants';
import { SlidersHorizontal, Map as MapIcon } from 'lucide-react';

export const SearchPage: React.FC = () => {
  const [priceRange, setPriceRange] = useState(300);

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
       <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row gap-8 p-4 md:p-8">
          
          {/* Sidebar Filters */}
          <div className="w-full lg:w-80 flex-shrink-0 bg-white p-6 rounded-2xl h-fit sticky top-24 border border-gray-100 hidden lg:block">
            <div className="space-y-8">
              {/* Type Filter */}
              <div>
                <h3 className="text-xs font-bold text-gray-400 tracking-widest uppercase mb-4">Type</h3>
                <div className="space-y-3">
                   {['Sport', 'SUV', 'MPV', 'Sedan', 'Coupe', 'Hatchback'].map((type, idx) => (
                     <label key={type} className="flex items-center gap-3 cursor-pointer group">
                       <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-brand-600 focus:ring-brand-500" defaultChecked={idx < 3} />
                       <span className="text-gray-600 font-semibold group-hover:text-gray-900">{type}</span>
                       <span className="text-gray-400 text-sm ml-auto">({Math.floor(Math.random() * 20) + 5})</span>
                     </label>
                   ))}
                </div>
              </div>

               {/* Capacity Filter */}
               <div>
                <h3 className="text-xs font-bold text-gray-400 tracking-widest uppercase mb-4">Capacity</h3>
                <div className="space-y-3">
                   {['2 Person', '4 Person', '6 Person', '8 or More'].map((cap, idx) => (
                     <label key={cap} className="flex items-center gap-3 cursor-pointer group">
                       <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-brand-600 focus:ring-brand-500" defaultChecked={idx === 1} />
                       <span className="text-gray-600 font-semibold group-hover:text-gray-900">{cap}</span>
                       <span className="text-gray-400 text-sm ml-auto">({Math.floor(Math.random() * 15) + 2})</span>
                     </label>
                   ))}
                </div>
              </div>

              {/* Price Filter */}
              <div>
                 <h3 className="text-xs font-bold text-gray-400 tracking-widest uppercase mb-4">Price</h3>
                 <input 
                   type="range" 
                   min="50" 
                   max="500" 
                   value={priceRange} 
                   onChange={(e) => setPriceRange(Number(e.target.value))}
                   className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-600"
                 />
                 <div className="flex justify-between mt-2">
                   <span className="font-bold text-gray-700 text-lg">Max. ${priceRange}.00</span>
                 </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
             {/* Mobile Filter & Sort Bar */}
             <div className="flex gap-4 mb-6 lg:hidden overflow-x-auto pb-2 no-scrollbar">
                <button className="flex items-center gap-2 bg-white px-4 py-3 rounded-xl font-semibold text-gray-700 shadow-sm whitespace-nowrap">
                   <SlidersHorizontal size={20} /> Filters
                </button>
                <button className="flex items-center gap-2 bg-brand-600 text-white px-4 py-3 rounded-xl font-semibold shadow-sm whitespace-nowrap">
                   <MapIcon size={20} /> Map View
                </button>
                <div className="bg-white px-4 py-3 rounded-xl font-semibold text-gray-700 shadow-sm whitespace-nowrap">
                   Sort by: Recommended
                </div>
             </div>

             {/* Search Bar in Content (for smaller screens or just utility) */}
             <div className="bg-white p-4 rounded-2xl shadow-sm mb-8 flex gap-4">
                <div className="flex-1 bg-gray-50 rounded-xl px-4 py-3 flex items-center gap-3">
                   <MapIcon className="text-gray-400" size={20} />
                   <input type="text" placeholder="Location" className="bg-transparent w-full focus:outline-none font-medium text-gray-700" defaultValue="Los Angeles, CA" />
                </div>
                <div className="flex-1 bg-gray-50 rounded-xl px-4 py-3 hidden md:flex items-center gap-3">
                   <SlidersHorizontal className="text-gray-400" size={20} />
                   <input type="text" placeholder="Date" className="bg-transparent w-full focus:outline-none font-medium text-gray-700" defaultValue="14 Dec 2023" />
                </div>
                <button className="bg-brand-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-brand-700 transition-colors">
                  Search
                </button>
             </div>

             {/* Cars Grid */}
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {MOCK_CARS.map(car => (
                  <CarCard key={car.id} car={car} />
                ))}
                {/* Duplicate for demo volume */}
                {MOCK_CARS.map(car => (
                  <CarCard key={`${car.id}-dup`} car={{...car, id: `${car.id}-dup`}} />
                ))}
             </div>

             <div className="mt-12 flex justify-center">
                <button className="bg-brand-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-brand-700 transition-colors shadow-lg shadow-brand-200">
                   Show more cars
                </button>
             </div>
          </div>
       </div>
    </div>
  );
};