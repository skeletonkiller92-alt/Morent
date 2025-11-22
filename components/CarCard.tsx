import React from 'react';
import { Car } from '../types';
import { Heart, Star, Gauge, Fuel, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CarCardProps {
  car: Car;
}

export const CarCard: React.FC<CarCardProps> = ({ car }) => {
  return (
    <Link to={`/car/${car.id}`} className="group block bg-white rounded-2xl overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-300">
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
        <img 
          src={car.image} 
          alt={`${car.make} ${car.model}`} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <button className="absolute top-3 right-3 p-2 rounded-full bg-white/80 hover:bg-white text-gray-500 hover:text-red-500 transition-colors backdrop-blur-sm">
          <Heart size={20} />
        </button>
        {car.pricePerDay > 200 && (
          <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-brand-600 text-white text-xs font-bold uppercase tracking-wider">
            Luxury
          </span>
        )}
      </div>
      
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-xl font-bold text-gray-900">{car.make} {car.model}</h3>
            <p className="text-sm text-gray-500">{car.type}</p>
          </div>
          <div className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-lg">
            <Star size={14} className="fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium text-gray-900">{car.rating}</span>
            <span className="text-xs text-gray-400">({car.trips})</span>
          </div>
        </div>

        <div className="flex items-center justify-between gap-4 my-4 text-sm text-gray-500">
          <div className="flex items-center gap-1.5">
            <Gauge size={16} />
            <span>{car.transmission}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Fuel size={16} />
            <span>{car.fuelType}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Users size={16} />
            <span>{car.seats}</span>
          </div>
        </div>

        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
          <div>
            <span className="text-2xl font-bold text-gray-900">${car.pricePerDay}</span>
            <span className="text-gray-500 text-sm">/day</span>
          </div>
          <span className="text-brand-600 font-semibold text-sm group-hover:underline">
            View Deal
          </span>
        </div>
      </div>
    </Link>
  );
};