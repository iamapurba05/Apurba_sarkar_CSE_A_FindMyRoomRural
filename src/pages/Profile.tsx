import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  User, Settings, Home, Upload, Star, MessageSquare, LogOut 
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import SafetyButton from '@/components/SafetyButton';
import { roomsData } from '@/data/roomsData';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/providers/AuthProvider';

const Profile = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [userRole, setUserRole] = useState<'tenant' | 'owner'>('tenant');
  
  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Signed out successfully",
        description: "You have been signed out of your account.",
      });
      navigate('/auth');
    } catch (error: any) {
      toast({
        title: "Error signing out",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const toggleRole = () => {
    setUserRole(prev => prev === 'tenant' ? 'owner' : 'tenant');
    toast({
      title: `Switched to ${userRole === 'tenant' ? 'Owner' : 'Tenant'} Mode`,
      description: `You are now viewing the app as a ${userRole === 'tenant' ? 'property owner' : 'tenant'}.`,
    });
  };
  
  return (
    <div className="pb-20">
      {/* Profile Header */}
      <div className="bg-rural-blue p-6 rounded-b-3xl">
        <div className="flex items-center mb-4">
          <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center mr-4">
            <User size={40} className="text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-bold">{user?.user_metadata?.full_name || 'User'}</h1>
            <p className="text-gray-600 text-sm">{user?.email}</p>
            <div className="flex items-center mt-1">
              <Star size={14} className="text-yellow-500 mr-1" />
              <span className="text-sm font-medium">4.8</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between bg-white p-3 rounded-lg">
          <span className="text-sm font-medium">
            {userRole === 'tenant' ? 'Tenant Mode' : 'Owner Mode'}
          </span>
          <Switch checked={userRole === 'owner'} onCheckedChange={toggleRole} />
        </div>
      </div>
      
      {/* Profile Content */}
      <div className="p-4">
        {userRole === 'tenant' ? (
          <Tabs defaultValue="bookings">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="bookings">My Bookings</TabsTrigger>
              <TabsTrigger value="reviews">My Reviews</TabsTrigger>
            </TabsList>
            
            <TabsContent value="bookings">
              {roomsData.slice(0, 2).map(room => (
                <Link to={`/room/${room.id}`} key={room.id} className="block mb-4 bg-white rounded-lg shadow-sm p-3">
                  <div className="flex">
                    <img 
                      src={room.imageUrl} 
                      alt={room.title} 
                      className="w-20 h-20 object-cover rounded-lg mr-3"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium">{room.title}</h3>
                      <p className="text-gray-500 text-sm">{room.location}</p>
                      <div className="flex justify-between items-center mt-1">
                        <div className="text-sm">
                          <span className="font-bold">₹{room.price}</span>
                          <span className="text-gray-500">/month</span>
                        </div>
                        <span className="text-xs text-green-600 font-medium">Active</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
              
              {roomsData.length === 0 && (
                <div className="text-center py-8">
                  <h3 className="text-gray-500 mb-2">No bookings yet</h3>
                  <Link to="/search">
                    <Button variant="outline" size="sm">Find Rooms</Button>
                  </Link>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="reviews">
              <div className="text-center py-8">
                <h3 className="text-gray-500 mb-2">No reviews yet</h3>
                <p className="text-sm text-gray-400 mb-3">You haven't reviewed any rooms yet.</p>
                <Link to="/search">
                  <Button variant="outline" size="sm">Find and Review Rooms</Button>
                </Link>
              </div>
            </TabsContent>
          </Tabs>
        ) : (
          <Tabs defaultValue="listings">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="listings">My Listings</TabsTrigger>
              <TabsTrigger value="inquiries">Inquiries</TabsTrigger>
            </TabsList>
            
            <TabsContent value="listings">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Your Properties</h2>
                <Link to="/upload">
                  <Button size="sm">
                    <Upload size={16} className="mr-1" />
                    Add New
                  </Button>
                </Link>
              </div>
              
              {roomsData.slice(0, 1).map(room => (
                <div key={room.id} className="mb-4 bg-white rounded-lg shadow-sm p-3">
                  <div className="flex">
                    <img 
                      src={room.imageUrl} 
                      alt={room.title} 
                      className="w-20 h-20 object-cover rounded-lg mr-3"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium">{room.title}</h3>
                      <p className="text-gray-500 text-sm">{room.location}</p>
                      <div className="flex justify-between items-center mt-1">
                        <div className="text-sm">
                          <span className="font-bold">₹{room.price}</span>
                          <span className="text-gray-500">/month</span>
                        </div>
                        <span className="text-xs text-green-600 font-medium">
                          {room.isVerified ? 'Verified' : 'Pending Verification'}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex mt-2 justify-end gap-2">
                    <Button variant="outline" size="sm">Edit</Button>
                    <Button variant="destructive" size="sm">Delete</Button>
                  </div>
                </div>
              ))}
              
              {roomsData.length === 0 && (
                <div className="text-center py-8">
                  <h3 className="text-gray-500 mb-2">No listings yet</h3>
                  <Link to="/upload">
                    <Button variant="outline" size="sm">Add Your First Property</Button>
                  </Link>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="inquiries">
              <div className="text-center py-8">
                <h3 className="text-gray-500 mb-2">No inquiries yet</h3>
                <p className="text-sm text-gray-400">
                  You'll see messages from interested tenants here.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        )}
        
        <Separator className="my-6" />
        
        {/* Settings Section */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Settings</h2>
          <div className="space-y-3">
            <Link to="#" className="flex items-center justify-between p-3 bg-rural-gray rounded-lg">
              <div className="flex items-center">
                <User size={18} className="mr-3" />
                <span>Account Settings</span>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right">
                <path d="m9 18 6-6-6-6"></path>
              </svg>
            </Link>
            
            <Link to="#" className="flex items-center justify-between p-3 bg-rural-gray rounded-lg">
              <div className="flex items-center">
                <Settings size={18} className="mr-3" />
                <span>Preferences</span>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right">
                <path d="m9 18 6-6-6-6"></path>
              </svg>
            </Link>
            
            <Link to="#" className="flex items-center justify-between p-3 bg-rural-gray rounded-lg">
              <div className="flex items-center">
                <MessageSquare size={18} className="mr-3" />
                <span>Help & Support</span>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right">
                <path d="m9 18 6-6-6-6"></path>
              </svg>
            </Link>
            
            <Button 
              variant="outline" 
              className="w-full mt-4 text-red-500 border-red-200 hover:bg-red-50"
              onClick={handleSignOut}
            >
              <LogOut size={16} className="mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>
      
      <SafetyButton />
    </div>
  );
};

export default Profile;
