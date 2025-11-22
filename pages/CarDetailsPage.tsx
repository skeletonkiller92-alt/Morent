import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MOCK_CARS } from '../constants';
import { CarCard } from '../components/CarCard';
import { DatePicker } from '../components/DatePicker';
import { Star, Heart, Share2, ShieldCheck, MapPin } from 'lucide-react';

export const CarDetailsPage: React.FC = () => {
  const { id } = useParams();
  const [car, setCar] = useState(MOCK_CARS[0]);
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date(new Date().setDate(new Date().getDate() + 4)));
  
  useEffect(() => {
    const found = MOCK_CARS.find(c => c.id === id);
    if (found) setCar(found);
    window.scrollTo(0,0);
  }, [id]);

  return (
    <div className="bg-gray-50 min-h-screen pb-12 pt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[1fr_380px] gap-10">
          
          {/* Left Column: Images & Info */}
          <div className="space-y-8">
            {/* Image Gallery */}
            <div className="flex flex-col gap-6">
               <div className="relative aspect-[16/9] bg-gray-100 rounded-2xl overflow-hidden group shadow-sm">
                  <img src={car.image} alt={car.model} className="w-full h-full object-cover" />
                  <div className="absolute top-6 right-6 z-20 flex gap-3">
                    <button className="bg-white/90 p-2.5 rounded-full hover:bg-white text-gray-700 shadow-sm transition-all hover:scale-105">
                      <Share2 size={20} />
                    </button>
                    <button className="bg-white/90 p-2.5 rounded-full hover:bg-white text-gray-500 hover:text-red-500 shadow-sm transition-all hover:scale-105">
                      <Heart size={20} />
                    </button>
                  </div>
               </div>
               
               {/* Thumbnails */}
               <div className="flex gap-4 overflow-x-auto no-scrollbar">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className={`min-w-[100px] md:w-32 aspect-[4/3] rounded-xl overflow-hidden cursor-pointer border-2 transition-all ${i === 1 ? 'border-brand-600 ring-2 ring-brand-100' : 'border-transparent opacity-70 hover:opacity-100'}`}>
                       <img src={car.image} className="w-full h-full object-cover rounded-lg" />
                    </div>
                  ))}
               </div>
            </div>

            {/* Car Info */}
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-200">
               <div className="flex justify-between items-start mb-6">
                  <div>
                    <h1 className="text-3xl font-extrabold text-gray-900 mb-2 tracking-tight">{car.make} {car.model}</h1>
                    <div className="flex items-center gap-2">
                      <div className="flex text-brand-500">
                         {[1,2,3,4,5].map(i => <Star key={i} size={16} className="fill-current" />)}
                      </div>
                      <span className="text-sm text-gray-500 font-medium">{car.trips} trips</span>
                    </div>
                  </div>
               </div>

               <p className="text-gray-600 leading-loose mb-10 text-lg">
                 {car.description} Designed for comfort and performance, this {car.type} is perfect for exploring Azerbaijan's diverse landscapes.
               </p>

               <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-8 mb-4">
                  <div>
                     <span className="block text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">Type</span>
                     <span className="font-bold text-gray-800 text-lg">{car.type}</span>
                  </div>
                  <div>
                     <span className="block text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">Transmission</span>
                     <span className="font-bold text-gray-800 text-lg">{car.transmission}</span>
                  </div>
                  <div>
                     <span className="block text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">Capacity</span>
                     <span className="font-bold text-gray-800 text-lg">{car.seats} Person</span>
                  </div>
                  <div>
                     <span className="block text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">Fuel</span>
                     <span className="font-bold text-gray-800 text-lg">{car.fuelType}</span>
                  </div>
               </div>
            </div>

            {/* Reviews Section */}
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-200">
              <div className="flex items-center gap-4 mb-8">
                 <h2 className="text-xl font-bold text-gray-900">Reviews</h2>
                 <span className="bg-brand-100 text-brand-700 px-3 py-1 rounded-full text-sm font-bold">13</span>
              </div>
              
              <div className="space-y-8">
                 {[1, 2].map((i) => (
                    <div key={i} className="flex gap-4">
                       <img src={`https://picsum.photos/100/100?random=${200+i}`} className="w-12 h-12 rounded-full object-cover border border-gray-100" alt="Reviewer" />
                       <div className="flex-1">
                          <div className="flex justify-between mb-1">
                             <h4 className="font-bold text-gray-900">Alex Stanton</h4>
                             <span className="text-gray-400 text-sm">21 July 2022</span>
                          </div>
                          <div className="flex text-brand-500 mb-2">
                             {[1,2,3,4,5].map(s => <Star key={s} size={12} className="fill-current" />)}
                          </div>
                          <p className="text-gray-600 text-sm leading-relaxed">
                             Excellent car! Clean, well-maintained, and the host was super responsive. Would definitely rent again for my next trip to Baku.
                          </p>
                       </div>
                    </div>
                 ))}
              </div>
            </div>
          </div>

          {/* Right Column: Booking Widget */}
          <div className="space-y-8">
             {/* Booking Card */}
             <div className="bg-white p-6 rounded-2xl shadow-lg shadow-gray-200/50 border border-gray-200 sticky top-24">
                <div className="flex justify-between items-end mb-8 border-b border-gray-100 pb-6">
                   <div>
                      <h2 className="text-3xl font-bold text-gray-900">${car.pricePerDay}</h2>
                      <span className="text-sm text-gray-500 font-medium">per day</span>
                   </div>
                   <p className="text-brand-600 text-sm font-bold bg-brand-50 px-2 py-1 rounded-md">Best Price</p>
                </div>

                <div className="space-y-5 mb-8">
                   <div className="relative">
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Pick-up & Return</label>
                      <div className="bg-gray-50 hover:bg-white border border-gray-200 rounded-xl p-3 flex items-center gap-3 transition-colors cursor-pointer">
                         <MapPin size={20} className="text-brand-600" />
                         <div>
                            <span className="block text-sm font-bold text-gray-900">Baku, Azerbaijan</span>
                            <span className="text-xs text-gray-500">Same location return</span>
                         </div>
                      </div>
                   </div>
                   
                   <div className="grid grid-cols-2 gap-4">
                      <div className="flex-1">
                         <DatePicker 
                           label="Start Date" 
                           value={startDate} 
                           onChange={setStartDate} 
                         />
                      </div>
                      <div className="flex-1">
                         <DatePicker 
                           label="End Date" 
                           value={endDate} 
                           onChange={setEndDate} 
                           minDate={startDate}
                         />
                      </div>
                   </div>
                </div>

                <div className="flex items-center justify-between mb-6 pt-4 border-t border-gray-100">
                   <span className="font-bold text-gray-900">Total (4 days)</span>
                   <span className="text-2xl font-bold text-brand-600">${car.pricePerDay * 4}</span>
                </div>

                <button className="w-full bg-brand-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-brand-700 transition-all shadow-lg hover:shadow-brand-500/30">
                   Rent this car
                </button>
                
                <div className="mt-6 flex items-center justify-center gap-2 text-gray-500 text-xs font-medium bg-gray-50 p-3 rounded-lg">
                   <ShieldCheck size={16} className="text-brand-600" />
                   <span>Free cancellation up to 48h before trip</span>
                </div>
             </div>
             
             {/* Host Info */}
             <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-200 flex items-center gap-4">
                <img src={car.hostImage} alt={car.hostName} className="w-12 h-12 rounded-full object-cover ring-2 ring-gray-100" />
                <div>
                   <h3 className="font-bold text-gray-900 text-sm">{car.hostName}</h3>
                   <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Star size={12} className="fill-brand-500 text-brand-500" />
                      <span>5.0 (120 trips)</span>
                   </div>
                </div>
                <button className="ml-auto text-brand-600 font-bold text-sm hover:bg-brand-50 px-3 py-2 rounded-lg transition-colors">Contact</button>
             </div>
          </div>

        </div>

        {/* Similar Cars */}
        <div className="mt-20">
           <div className="flex items-center justify-between mb-8">
              <h2 className="text-gray-900 text-xl font-bold">You might also like</h2>
              <a href="#" className="text-brand-600 font-bold hover:underline">View all</a>
           </div>
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {MOCK_CARS.slice(0, 3).map(c => <CarCard key={c.id} car={c} />)}
           </div>
        </div>
      </div>
    </div>
  );
};