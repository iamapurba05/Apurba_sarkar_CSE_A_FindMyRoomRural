import React, { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import SearchBar from '@/components/SearchBar';
import RoomCard from '@/components/RoomCard';
import SafetyButton from '@/components/SafetyButton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';

type Room = Database['public']['Tables']['rooms']['Row'];

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState([0, 15000]);
  const [activeTab, setActiveTab] = useState("all");
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('rooms')
          .select('*');

        if (error) {
          throw error;
        }

        if (data) {
          setRooms(data);
        }
      } catch (error: any) {
        toast({
          title: "Error fetching rooms",
          description: error.message,
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, [toast]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };
  
  const filteredRooms = rooms.filter(room => {
    if (room.price < priceRange[0] || room.price > priceRange[1]) {
      return false;
    }
    
    if (activeTab === "verified" && !room.is_verified) {
      return false;
    }
    
    if (searchQuery && !room.location.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !room.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    return true;
  });
  
  return (
    <div className="pb-20">
      <div className="bg-rural-blue p-4">
        <h1 className="text-xl font-bold mb-3">Find Your Perfect Room</h1>
        <SearchBar onSearch={handleSearch} />
      </div>
      
      <div className="p-4">
        <div className="mb-6">
          <h2 className="text-sm font-medium mb-2">Price Range (₹):</h2>
          <div className="px-3">
            <Slider
              defaultValue={[0, 15000]}
              max={15000}
              min={0}
              step={500}
              onValueChange={(value) => setPriceRange(value)}
              className="mb-1"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>₹{priceRange[0]}</span>
              <span>₹{priceRange[1]}</span>
            </div>
          </div>
        </div>
        
        <Tabs defaultValue="all" className="mb-4" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="all">All Rooms</TabsTrigger>
            <TabsTrigger value="verified">Verified Only</TabsTrigger>
          </TabsList>
        </Tabs>
        
        <div className="mt-4">
          {loading ? (
            <div className="text-center py-8">
              <p className="text-gray-500">Loading rooms...</p>
            </div>
          ) : (
            <>
              <h2 className="text-lg font-semibold mb-2">
                {filteredRooms.length} {filteredRooms.length === 1 ? 'Room' : 'Rooms'} Found
              </h2>
              
              {filteredRooms.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredRooms.map(room => (
                    <RoomCard
                      key={room.id}
                      id={room.id}
                      title={room.title}
                      location={room.location}
                      price={room.price}
                      rating={room.rating}
                      image={room.imageUrl}
                      isVerified={room.is_verified}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <h3 className="text-gray-500">No rooms found matching your criteria</h3>
                  <p className="text-sm text-gray-400 mt-2">Try adjusting your filters</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      
      <SafetyButton />
    </div>
  );
};

export default Search;
