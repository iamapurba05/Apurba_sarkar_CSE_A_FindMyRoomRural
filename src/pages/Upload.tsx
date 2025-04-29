import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, Upload as UploadIcon, MapPin, AlertTriangle 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue 
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/components/ui/use-toast';
import SafetyButton from '@/components/SafetyButton';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/providers/AuthProvider';

const Upload = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [uploading, setUploading] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  // Form data
  const [title, setTitle] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [amenities, setAmenities] = useState<string[]>([]);
  const [roomStatus, setRoomStatus] = useState('available');
  const [ownerName, setOwnerName] = useState('');
  const [ownerPhone, setOwnerPhone] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      const newPreviews = filesArray.map(file => URL.createObjectURL(file));
      
      setImages(prev => [...prev, ...filesArray]);
      setImagePreviews(prev => [...prev, ...newPreviews]);
    }
  };
  
  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  const toggleAmenity = (amenity: string) => {
    setAmenities(prev => 
      prev.includes(amenity) 
        ? prev.filter(a => a !== amenity)
        : [...prev, amenity]
    );
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "You must be logged in to list a property.",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);
    let imageUrl = '/placeholder.svg';

    try {
      if (images.length > 0) {
        const file = images[0];
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${user.id}/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('room_images')
          .upload(filePath, file);

        if (uploadError) {
          throw uploadError;
        }

        const { data } = supabase.storage
          .from('room_images')
          .getPublicUrl(filePath);

        if (data) {
          imageUrl = data.publicUrl;
        }
      }

      const { error } = await supabase
        .from('rooms')
        .insert({
          title,
          property_type: propertyType,
          location,
          price: Number(price),
          description,
          amenities,
          status: roomStatus,
          user_id: user.id,
          owner_name: ownerName,
          owner_phone: ownerPhone,
          image_url: imageUrl,
          is_verified: false,
        });

      if (error) throw error;

      toast({
        title: "Room Listed Successfully!",
        description: "Your room has been submitted for verification. We'll notify you once it's approved.",
      });
      
      setImages([]);
      setImagePreviews([]);
      setStep(1);
      setTitle('');
      setPropertyType('');
      setLocation('');
      setPrice('');
      setDescription('');
      setAmenities([]);
      
      navigate('/search');
      
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to list your property. Please try again.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };
  
  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);
  
  return (
    <div className="pb-20">
      <div className="bg-rural-blue p-4 flex items-center">
        <Link to="/" className="mr-3">
          <ChevronLeft size={24} />
        </Link>
        <h1 className="text-xl font-bold">List Your Property</h1>
      </div>
      
      <div className="p-4">
        <div className="mb-6">
          <div className="flex justify-between mb-2">
            {[1, 2, 3].map(num => (
              <div 
                key={num} 
                className={`w-full h-2 rounded-full mx-1 ${
                  step >= num ? 'bg-primary' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
          <div className="text-center text-sm text-gray-500">
            Step {step} of 3: {step === 1 ? 'Basic Details' : step === 2 ? 'Photos & Amenities' : 'Verification'}
          </div>
        </div>
        
        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <div className="animate-fade-in">
              <div className="mb-4">
                <Label htmlFor="title">Property Title</Label>
                <Input 
                  id="title" 
                  placeholder="e.g. Cozy Single Room near College" 
                  className="mt-1" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required 
                />
              </div>
              
              <div className="mb-4">
                <Label htmlFor="propertyType">Property Type</Label>
                <Select 
                  value={propertyType} 
                  onValueChange={setPropertyType} 
                  required
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select property type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="room">Single Room</SelectItem>
                    <SelectItem value="pg">PG Accommodation</SelectItem>
                    <SelectItem value="apartment">Apartment</SelectItem>
                    <SelectItem value="house">House</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="mb-4">
                <Label htmlFor="location">Location</Label>
                <div className="relative mt-1">
                  <Input 
                    id="location" 
                    placeholder="Village, District, State" 
                    className="pl-10" 
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required 
                  />
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <MapPin size={18} />
                  </div>
                </div>
                <div className="mt-2">
                  <Button type="button" variant="outline" className="text-sm w-full">
                    Use Current Location
                  </Button>
                </div>
              </div>
              
              <div className="mb-4">
                <Label htmlFor="price">Monthly Rent (₹)</Label>
                <Input 
                  id="price" 
                  type="number" 
                  placeholder="e.g. 5000" 
                  className="mt-1" 
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required 
                />
              </div>
              
              <div className="mb-4">
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  placeholder="Describe your property, facilities, and surroundings" 
                  className="mt-1" 
                  rows={4} 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required 
                />
              </div>
              
              <Button type="button" onClick={nextStep} className="w-full mt-4">
                Continue
              </Button>
            </div>
          )}
          
          {step === 2 && (
            <div className="animate-fade-in">
              <div className="mb-6">
                <Label className="block mb-2">Upload Photos</Label>
                <div className="grid grid-cols-3 gap-2 mb-3">
                  {imagePreviews.map((preview, index) => (
                    <div key={index} className="relative">
                      <img 
                        src={preview} 
                        alt={`Preview ${index}`}
                        className="h-24 w-full object-cover rounded-lg border"
                      />
                      <button
                        type="button"
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                        onClick={() => removeImage(index)}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M18 6 6 18"></path>
                          <path d="m6 6 12 12"></path>
                        </svg>
                      </button>
                    </div>
                  ))}
                  
                  <label className="h-24 bg-rural-gray flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 cursor-pointer">
                    <UploadIcon size={24} className="text-gray-400" />
                    <span className="text-xs mt-1 text-gray-500">Add Photo</span>
                    <input 
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={handleImageChange}
                    />
                  </label>
                </div>
                {imagePreviews.length === 0 && (
                  <p className="text-xs text-gray-500">Upload at least 3 clear photos of your property</p>
                )}
              </div>
              
              <div className="mb-4">
                <Label className="block mb-2">Amenities Available</Label>
                <div className="grid grid-cols-2 gap-2">
                  {["WiFi", "Power Backup", "Water Supply", "Study Table", "Wardrobe", "TV", "Attached Bathroom", "Kitchen", "Meals Provided", "Laundry"].map(amenity => (
                    <div key={amenity} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`amenity-${amenity}`} 
                        checked={amenities.includes(amenity)}
                        onCheckedChange={() => toggleAmenity(amenity)}
                      />
                      <label
                        htmlFor={`amenity-${amenity}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {amenity}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mb-4">
                <Label className="block mb-2">Room Status</Label>
                <Select value={roomStatus} onValueChange={setRoomStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="available">Available Now</SelectItem>
                    <SelectItem value="soon">Available Soon</SelectItem>
                    <SelectItem value="reserved">Reserved</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex justify-between gap-3 mt-6">
                <Button type="button" variant="outline" onClick={prevStep}>
                  Back
                </Button>
                <Button type="button" onClick={nextStep} className="flex-1">
                  Continue
                </Button>
              </div>
            </div>
          )}
          
          {step === 3 && (
            <div className="animate-fade-in">
              <div className="bg-amber-50 border border-amber-200 p-3 rounded-lg mb-6">
                <div className="flex items-start">
                  <AlertTriangle className="text-amber-500 mr-2 mt-0.5" size={18} />
                  <div>
                    <h3 className="text-sm font-medium text-amber-800">Owner Verification Required</h3>
                    <p className="text-xs text-amber-700 mt-1">
                      To ensure safety and trust, we verify all property owners. 
                      Please provide a valid ID proof below.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mb-4">
                <Label htmlFor="ownerName">Your Full Name</Label>
                <Input 
                  id="ownerName" 
                  placeholder="As per your ID proof" 
                  className="mt-1" 
                  value={ownerName}
                  onChange={(e) => setOwnerName(e.target.value)}
                  required 
                />
              </div>
              
              <div className="mb-4">
                <Label htmlFor="ownerPhone">Phone Number</Label>
                <Input 
                  id="ownerPhone" 
                  type="tel" 
                  placeholder="10-digit mobile number" 
                  className="mt-1" 
                  value={ownerPhone}
                  onChange={(e) => setOwnerPhone(e.target.value)}
                  required 
                  pattern="[0-9]{10}"
                />
              </div>
              
              <div className="mb-6">
                <Label className="block mb-2">ID Proof (Aadhaar/PAN)</Label>
                <div className="bg-rural-gray rounded-lg border border-dashed border-gray-300 p-4 text-center cursor-pointer">
                  <UploadIcon size={24} className="mx-auto text-gray-400 mb-2" />
                  <p className="text-sm text-gray-500">Click to upload your ID proof</p>
                  <p className="text-xs text-gray-400 mt-1">Accepted formats: JPG, PNG, PDF</p>
                  <input type="file" className="hidden" accept="image/*,.pdf" />
                </div>
              </div>
              
              <div className="mb-6 flex items-start space-x-2">
                <Checkbox 
                  id="terms" 
                  checked={agreedToTerms}
                  onCheckedChange={(checked) => setAgreedToTerms(checked === true)}
                  required 
                />
                <div>
                  <Label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none"
                  >
                    I confirm that I'm the owner or authorized to list this property
                  </Label>
                  <p className="text-xs text-gray-500 mt-1">
                    By submitting, you agree to our Terms of Service and Privacy Policy
                  </p>
                </div>
              </div>
              
              <div className="flex justify-between gap-3">
                <Button type="button" variant="outline" onClick={prevStep}>
                  Back
                </Button>
                <Button 
                  type="submit" 
                  className="flex-1"
                  disabled={uploading}
                >
                  {uploading ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Uploading...
                    </span>
                  ) : (
                    'Submit Listing'
                  )}
                </Button>
              </div>
            </div>
          )}
        </form>
      </div>
      
      <SafetyButton />
    </div>
  );
};

export default Upload;
