
import React, { useState } from 'react';
import { Search, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';

interface SearchBarProps {
  onSearch?: (query: string) => void;
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, className }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchQuery);
    }
  };

  const handleLocationDetect = () => {
    toast({
      title: "Detecting your location",
      description: "Please wait while we find rooms near you...",
    });
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        toast({
          title: "Location detected",
          description: "Showing rooms near your current location.",
        });
        // In a real app, this would use the coordinates to find nearby rooms
        console.log("Location coordinates:", position.coords);
        if (onSearch) {
          onSearch("nearby");
        }
      },
      (error) => {
        toast({
          title: "Location error",
          description: "Unable to detect your location. Please enter manually.",
          variant: "destructive",
        });
        console.error("Error getting location:", error);
      }
    );
  };

  return (
    <div className={`w-full ${className}`}>
      <form onSubmit={handleSearch} className="relative">
        <Input
          type="text"
          placeholder="Search location, area, or property"
          className="pl-10 pr-16 py-6 rounded-full shadow-sm border-gray-200"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="absolute top-0 left-0 h-full flex items-center pl-3 text-gray-400">
          <Search size={20} />
        </div>
        <div className="absolute top-0 right-0 h-full flex items-center pr-3">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="text-primary hover:text-primary-foreground hover:bg-primary"
            onClick={handleLocationDetect}
          >
            <MapPin size={20} />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
