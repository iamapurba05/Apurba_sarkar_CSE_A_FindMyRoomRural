
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { roomsData } from '@/data/roomsData';
import { 
  MapPin, Phone, MessageSquare, Star, ChevronLeft, 
  Check, ArrowLeft, ArrowRight, User 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import SafetyButton from '@/components/SafetyButton';
import { useToast } from '@/components/ui/use-toast';

const RoomDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  
  const room = roomsData.find(room => room.id === id);
  
  if (!room) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h2 className="text-2xl font-bold mb-4">Room Not Found</h2>
        <p className="text-gray-500 mb-6">The room you're looking for doesn't exist or has been removed.</p>
        <Link to="/" className="text-primary underline">
          Go back to home
        </Link>
      </div>
    );
  }
  
  const handleContactOwner = () => {
    // In a real app, this would open the phone's dialer or messaging app
    toast({
      title: "Contacting Owner",
      description: `Connecting you to ${room.owner.name} at ${room.owner.phone}`,
    });
  };
  
  const handleNextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % room.images.length);
  };
  
  const handlePrevImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + room.images.length) % room.images.length);
  };
  
  const handleOpenMap = () => {
    // In a real app, this would open Google Maps with the location
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${room.latitude},${room.longitude}`;
    window.open(mapsUrl, '_blank');
  };
  
  return (
    <div className="pb-20">
      {/* Image Gallery */}
      <div className="relative">
        <div className="relative h-64 w-full bg-gray-100">
          <img 
            src={room.images[activeImageIndex]} 
            alt={room.title} 
            className="h-full w-full object-cover"
          />
          <div className="absolute top-0 left-0 p-4">
            <Link to="/search" className="bg-white/80 rounded-full p-2 shadow-md">
              <ChevronLeft size={20} />
            </Link>
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 flex justify-center p-2">
            <div className="flex space-x-1">
              {room.images.map((_, index) => (
                <div 
                  key={index} 
                  className={`w-2 h-2 rounded-full ${index === activeImageIndex ? 'bg-white' : 'bg-white/50'}`}
                  onClick={() => setActiveImageIndex(index)}
                />
              ))}
            </div>
          </div>
          
          <button 
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/70 rounded-full p-1"
            onClick={handlePrevImage}
          >
            <ArrowLeft size={20} />
          </button>
          <button 
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/70 rounded-full p-1"
            onClick={handleNextImage}
          >
            <ArrowRight size={20} />
          </button>
          
          {room.owner.isVerified && (
            <div className="absolute top-4 right-4">
              <Badge className="bg-primary">Verified Property</Badge>
            </div>
          )}
        </div>
      </div>
      
      {/* Content */}
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h1 className="text-2xl font-bold">{room.title}</h1>
          <div className="flex items-center bg-rural-green px-2 py-1 rounded-lg">
            <Star size={16} className="text-yellow-500 mr-1" />
            <span className="font-medium">{room.rating}</span>
          </div>
        </div>
        
        <div className="flex items-center mt-1 text-gray-600">
          <MapPin size={16} className="mr-1" />
          <span>{room.location}</span>
        </div>
        
        <div className="mt-2">
          <span className="text-2xl font-bold">₹{room.price}</span>
          <span className="text-gray-500"> /month</span>
        </div>
        
        <Separator className="my-4" />
        
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-2">Description</h2>
          <p className="text-gray-600 text-sm">{room.description}</p>
        </div>
        
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-2">Amenities</h2>
          <div className="grid grid-cols-2 gap-2">
            {room.amenities.map(amenity => (
              <div key={amenity} className="flex items-center text-gray-600">
                <Check size={16} className="text-primary mr-2" />
                <span className="text-sm">{amenity}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-2">Location</h2>
          <div 
            className="h-32 bg-rural-blue rounded-lg flex items-center justify-center cursor-pointer"
            onClick={handleOpenMap}
          >
            <div className="text-center">
              <MapPin size={24} className="mx-auto mb-1" />
              <span className="text-sm">View on Google Maps</span>
            </div>
          </div>
        </div>
        
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-2">Owner</h2>
          <div className="flex items-center justify-between bg-rural-gray p-3 rounded-lg">
            <div className="flex items-center">
              <div className="bg-primary/20 rounded-full p-2 mr-3">
                <User size={24} className="text-primary" />
              </div>
              <div>
                <h3 className="font-medium">{room.owner.name}</h3>
                <div className="flex items-center text-sm text-gray-500">
                  <Star size={14} className="text-yellow-500 mr-1" />
                  <span>{room.owner.rating}</span>
                </div>
              </div>
            </div>
            {room.owner.isVerified && (
              <Badge variant="outline" className="border-primary text-primary">
                Verified Owner
              </Badge>
            )}
          </div>
        </div>
        
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-2">Reviews</h2>
          {room.reviews.map(review => (
            <div key={review.id} className="mb-3 p-3 bg-rural-gray rounded-lg">
              <div className="flex justify-between mb-1">
                <h3 className="font-medium">{review.userName}</h3>
                <div className="flex items-center">
                  <Star size={14} className="text-yellow-500 mr-1" />
                  <span className="text-sm">{review.rating}</span>
                </div>
              </div>
              <p className="text-sm text-gray-600">{review.comment}</p>
              <p className="text-xs text-gray-400 mt-1">{review.date}</p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Fixed Contact Buttons */}
      <div className="fixed bottom-16 left-0 right-0 p-3 bg-white border-t border-gray-200 flex justify-between">
        <Button 
          variant="outline" 
          className="flex-1 mr-2"
          onClick={handleContactOwner}
        >
          <MessageSquare size={18} className="mr-1" />
          Message
        </Button>
        <Button 
          className="flex-1"
          onClick={handleContactOwner}
        >
          <Phone size={18} className="mr-1" />
          Call Owner
        </Button>
      </div>
      
      <SafetyButton />
    </div>
  );
};

export default RoomDetail;
