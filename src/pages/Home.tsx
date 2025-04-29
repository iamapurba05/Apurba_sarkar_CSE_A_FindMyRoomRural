
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '@/components/SearchBar';
import RoomCard from '@/components/RoomCard';
import SafetyButton from '@/components/SafetyButton';
import { roomsData } from '@/data/roomsData';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const featuredRooms = roomsData.slice(0, 3); // Show only 3 rooms on home page
  
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // In a real app, this would filter rooms based on the query
    console.log("Searching for:", query);
  };
  
  return (
    <div className="pb-20">
      {/* Header */}
      <div className="bg-rural-blue p-6 rounded-b-3xl shadow-md">
        <h1 className="text-2xl font-bold mb-1">Find My Room Rural</h1>
        <p className="text-sm text-gray-600 mb-4">
          Find verified PGs and rooms in rural areas
        </p>
        <SearchBar onSearch={handleSearch} />
      </div>
      
      {/* Main Content */}
      <div className="px-4 py-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Available Rooms Near You</h2>
          <Link to="/search" className="text-primary text-sm flex items-center">
            See all <ChevronRight size={16} />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {featuredRooms.map(room => (
            <RoomCard
              key={room.id}
              id={room.id}
              title={room.title}
              location={room.location}
              price={room.price}
              rating={room.rating}
              image={room.imageUrl}
              isVerified={room.owner.isVerified}
            />
          ))}
        </div>
        
        {/* Services Section */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Our Services</h2>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-rural-green p-4 rounded-lg">
              <h3 className="font-medium mb-1">For Students</h3>
              <p className="text-sm text-gray-600">Find verified accommodations near your campus</p>
            </div>
            <div className="bg-rural-peach p-4 rounded-lg">
              <h3 className="font-medium mb-1">For Professionals</h3>
              <p className="text-sm text-gray-600">Comfortable stays in quiet rural settings</p>
            </div>
            <div className="bg-rural-gray p-4 rounded-lg">
              <h3 className="font-medium mb-1">For Room Owners</h3>
              <p className="text-sm text-gray-600">List your property and verify for better reach</p>
            </div>
            <div className="bg-primary/10 p-4 rounded-lg">
              <h3 className="font-medium mb-1">Emergency Support</h3>
              <p className="text-sm text-gray-600">24/7 assistance with one-click safety button</p>
            </div>
          </div>
        </div>
        
        {/* Join as Owner CTA */}
        <div className="mt-8 bg-gradient-to-r from-rural-blue to-primary/30 p-5 rounded-xl text-center">
          <h3 className="font-semibold text-lg mb-2">Are you a room owner?</h3>
          <p className="text-sm mb-3">List your property and reach thousands of potential tenants</p>
          <Link to="/upload">
            <Button className="bg-white text-primary hover:bg-rural-white">
              List Your Property
            </Button>
          </Link>
        </div>
      </div>
      
      <SafetyButton />
    </div>
  );
};

export default Home;
