
import React from 'react';
import { Star, MapPin, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

interface RoomCardProps {
  id: string;
  title: string;
  location: string;
  price: number;
  rating: number;
  image: string;
  isVerified: boolean;
}

const RoomCard: React.FC<RoomCardProps> = ({
  id,
  title,
  location,
  price,
  rating,
  image,
  isVerified
}) => {
  return (
    <Link to={`/room/${id}`} className="room-card block animate-fade-in">
      <div className="relative">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-48 object-cover rounded-t-lg"
        />
        {isVerified && (
          <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
            <CheckCircle2 size={12} />
            <span>Verified</span>
          </div>
        )}
      </div>
      <div className="p-4 border border-t-0 rounded-b-lg">
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-lg">{title}</h3>
          <div className="flex items-center bg-rural-green px-2 py-1 rounded-lg">
            <Star size={14} className="text-yellow-500 mr-1" />
            <span className="text-sm font-medium">{rating}</span>
          </div>
        </div>
        <div className="flex items-center mt-1 text-gray-500">
          <MapPin size={14} className="mr-1" />
          <span className="text-sm">{location}</span>
        </div>
        <div className="mt-2">
          <span className="font-bold text-lg">₹{price}</span>
          <span className="text-gray-500 text-sm"> /month</span>
        </div>
      </div>
    </Link>
  );
};

export default RoomCard;
