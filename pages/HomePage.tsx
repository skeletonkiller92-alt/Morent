import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CarCard } from '../components/CarCard';
import { DatePicker } from '../components/DatePicker';
import { MOCK_CARS, BAKU_DISTRICTS, AZ_CITIES } from '../constants';
import { Search, ChevronRight, MapPin } from 'lucide-react';

export const HomePage: React.FC = () => {
  const [location, setLocation] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date(new Date().setDate(new Date().getDate() + 3)));

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocation(value);
    if (value.length > 0) {
      const filtered = AZ_CITIES.filter(city => 
        city.toLowerCase().startsWith(value.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  const selectCity = (city: string) => {
    setLocation(city);
    setSuggestions([]);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20 font-sans">
      {/* Hero Section - Turo Style */}
      {/* CHANGED: Removed overflow-hidden from this parent container so dropdowns can spill out */}
      <div className="relative h-[600px] w-full bg-gray-900">
        
        {/* Background Layer - This is where we clip the image */}
        <div className="absolute inset-0 overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=2500&q=80" 
            alt="Hero Background" 
            className="w-full h-full object-cover object-center opacity-90"
          />
          {/* Darker overlay for 'Rich Black' feel and text readability */}
          <div className="absolute inset-0 bg-gray-900/40"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/20 to-transparent"></div>
        </div>
        
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center items-center md:items-start">
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 max-w-3xl tracking-tight leading-tight text-center md:text-left drop-shadow-sm">
            Find your drive in <span className="text-brand-300">Azerbaijan</span>
          </h1>
          <p className="text-xl text-gray-200 mb-10 max-w-xl text-center md:text-left font-medium">
            Explore the world's largest car sharing marketplace. From daily drivers to luxury SUVs.
          </p>
          
          {/* Search Widget - Premium Look */}
          <div className="bg-white rounded-3xl p-3 max-w-6xl w-full shadow-2xl shadow-gray-900/20 flex flex-col lg:flex-row gap-2 items-center relative">
            
            {/* Location Input */}
            <div className="w-full lg:flex-[1.2] relative px-2">
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5 ml-1">Where</label>
              <div className="flex items-center bg-transparent hover:bg-gray-50 rounded-xl px-3 py-2.5 transition-colors border border-transparent hover:border-gray-200">
                <input 
                  type="text" 
                  value={location}
                  onChange={handleLocationChange}
                  className="w-full bg-transparent focus:outline-none text-gray-900 font-bold placeholder-gray-400 text-sm truncate"
                  placeholder="City, airport, or address"
                />
              </div>
              
              {suggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 bg-white mt-2 rounded-xl shadow-xl border border-gray-100 z-50 overflow-hidden py-2">
                  {suggestions.map((city) => (
                    <div 
                      key={city}
                      onClick={() => selectCity(city)} 
                      className="px-4 py-3 hover:bg-gray-50 cursor-pointer text-sm font-medium text-gray-700 flex items-center gap-2"
                    >
                      <MapPin size={16} className="text-gray-400" />
                      {city}, Azerbaijan
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Divider (Desktop) */}
            <div className="hidden lg:block w-px h-10 bg-gray-200 mx-2"></div>

            {/* From Date */}
            <div className="w-full lg:flex-1 px-2 border-t lg:border-t-0 border-gray-100 pt-2 lg:pt-0">
              <DatePicker 
                label="From" 
                placeholder="Start Date" 
                value={startDate} 
                onChange={setStartDate} 
              />
            </div>

            {/* Divider (Desktop) */}
            <div className="hidden lg:block w-px h-10 bg-gray-200 mx-2"></div>

            {/* Until Date */}
            <div className="w-full lg:flex-1 px-2 border-t lg:border-t-0 border-gray-100 pt-2 lg:pt-0">
              <DatePicker 
                label="Until" 
                placeholder="End Date" 
                value={endDate} 
                onChange={setEndDate} 
                minDate={startDate}
              />
            </div>

            {/* Search Button */}
            <div className="w-full lg:w-auto mt-2 lg:mt-0 lg:ml-2">
              <Link 
                to={`/search?location=${location}`} 
                className="bg-brand-600 hover:bg-brand-700 text-white rounded-2xl h-[52px] w-full lg:w-[52px] flex items-center justify-center transition-all shadow-lg hover:shadow-brand-500/25"
              >
                <Search size={24} strokeWidth={2.5} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Browse by Destination (Baku Districts) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 tracking-tight">Browse by destination</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {BAKU_DISTRICTS.map((district) => (
            <Link to={`/search?district=${district.name}`} key={district.name} className="group cursor-pointer">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-4 relative shadow-sm">
                <div className="absolute inset-0 bg-gray-900/0 group-hover:bg-gray-900/10 transition-colors z-10 duration-300"></div>
                <img 
                  src={district.image} 
                  alt={district.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <h3 className="font-bold text-gray-900 text-lg group-hover:text-brand-600 transition-colors">Baku, {district.name}</h3>
              <p className="text-gray-500 text-sm font-medium">{district.carCount} cars available</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Popular Cars Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        <div className="flex items-center justify-between mb-10">
           <h2 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">Popular cars in Baku</h2>
           <Link to="/search" className="text-brand-600 font-bold hover:text-brand-700 flex items-center gap-1 transition-colors">
             View all <ChevronRight size={20} />
           </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {MOCK_CARS.slice(0, 4).map(car => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      </div>

      {/* Featured Section (Clean & Minimal) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-28 mb-16">
        <div className="bg-gray-900 rounded-3xl p-8 md:p-16 flex flex-col md:flex-row items-center justify-between gap-12 overflow-hidden relative shadow-2xl">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-600/20 blur-[100px] rounded-full pointer-events-none"></div>
          
          <div className="max-w-xl relative z-10">
             <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
               Feel the best experience <br/> with our rental deals
             </h2>
             <p className="text-gray-300 mb-8 leading-relaxed text-lg">
               Join the thousands of satisfied customers in Azerbaijan who have found their perfect ride with Morent.
             </p>
             <Link to="/search" className="inline-block bg-brand-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-brand-500 transition-all shadow-lg shadow-brand-900/50">
               Find a car
             </Link>
          </div>
          <div className="relative w-full md:w-[45%] aspect-video z-10">
             <img 
               src="https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=800&q=80" 
               alt="Featured Car" 
               className="w-full h-full object-cover rounded-2xl shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500 ring-4 ring-white/10"
             />
          </div>
        </div>
      </div>
    </div>
  );
};