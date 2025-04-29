
import React, { useState } from 'react';
import { Phone } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const SafetyButton = () => {
  const { toast } = useToast();
  const [expanded, setExpanded] = useState(false);
  
  const handleEmergencyClick = () => {
    // In a real app, this would connect to emergency services API
    toast({
      title: "Emergency Alert Activated",
      description: "Your location has been shared with emergency contacts. Stay safe!",
      variant: "destructive",
    });
    
    // Simulate sharing location
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log("Location shared:", position.coords);
      },
      (error) => {
        console.error("Error getting position:", error);
        toast({
          title: "Location Error",
          description: "Unable to share your location. Please ensure location services are enabled.",
          variant: "destructive",
        });
      }
    );
  };

  return (
    <div className={`fixed bottom-20 right-4 flex flex-col items-end z-50 transition-all ${expanded ? 'gap-3' : ''}`}>
      {expanded && (
        <div className="flex flex-col gap-2 mb-2">
          <button
            onClick={handleEmergencyClick}
            className="bg-destructive text-white rounded-full p-3 shadow-lg animate-fade-in"
          >
            <Phone size={24} />
          </button>
          <div className="bg-white text-black text-sm p-2 rounded-lg shadow-md animate-fade-in">
            Emergency Help
          </div>
        </div>
      )}
      
      <button
        onClick={() => setExpanded(!expanded)}
        className={`safety-button ${expanded ? 'bg-gray-700' : 'bg-red-500 hover:bg-red-600'} transition-all`}
      >
        {expanded ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6 6 18"></path>
            <path d="m6 6 12 12"></path>
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15.5 11.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z"></path>
            <path d="M8.5 19.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z"></path>
            <path d="M15.5 19.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z"></path>
            <path d="M8.5 11.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z"></path>
          </svg>
        )}
      </button>
    </div>
  );
};

export default SafetyButton;
