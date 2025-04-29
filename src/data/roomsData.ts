
export interface RoomData {
  id: string;
  title: string;
  description: string;
  location: string;
  price: number;
  rating: number;
  imageUrl: string;
  images: string[];
  isVerified: boolean;
  amenities: string[];
  owner: {
    name: string;
    phone: string;
    isVerified: boolean;
    rating: number;
  };
  latitude: number;
  longitude: number;
  reviews: {
    id: string;
    userName: string;
    rating: number;
    comment: string;
    date: string;
  }[];
}

export const roomsData: RoomData[] = [
  {
    id: "room1",
    title: "Cozy Single Room near College",
    description: "A bright and airy single room available for students. The room is fully furnished with a comfortable bed, study table, and wardrobe. Common kitchen and bathroom facilities are shared with other tenants. The property is located in a quiet residential area with good connectivity to public transport.",
    location: "Chandpur, Rajasthan",
    price: 5000,
    rating: 4.5,
    imageUrl: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxhbGx8fHx8fHx8fHwxNjQ5OTczMDI5&ixlib=rb-1.2.1&q=80&w=1080",
    images: [
      "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxhbGx8fHx8fHx8fHwxNjQ5OTczMDI5&ixlib=rb-1.2.1&q=80&w=1080",
      "https://images.unsplash.com/photo-1721322800607-8c38375eef04?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxhbGx8fHx8fHx8fHwxNjQ5OTczMDI5&ixlib=rb-1.2.1&q=80&w=1080",
      "https://images.unsplash.com/photo-1483058712412-4245e9b90334?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxhbGx8fHx8fHx8fHwxNjQ5OTczMDI5&ixlib=rb-1.2.1&q=80&w=1080"
    ],
    isVerified: true,
    amenities: ["WiFi", "Study Table", "Wardrobe", "Power Backup", "Water Supply"],
    owner: {
      name: "Rahul Singh",
      phone: "+91-9876543210",
      isVerified: true,
      rating: 4.8
    },
    latitude: 26.5123,
    longitude: 74.3021,
    reviews: [
      {
        id: "rev1",
        userName: "Amit Kumar",
        rating: 4.5,
        comment: "Great place for students! The room is well-maintained and the landlord is helpful.",
        date: "2023-10-15"
      },
      {
        id: "rev2",
        userName: "Priya Sharma",
        rating: 4.0,
        comment: "Good value for money. Quiet neighborhood and close to the market.",
        date: "2023-09-22"
      }
    ]
  },
  {
    id: "room2",
    title: "Spacious PG with Meals",
    description: "A fully furnished PG accommodation with three meals included. The room comes with a comfortable bed, study table, and attached bathroom. The property features a common dining area and recreation zone. Located in a peaceful village environment, ideal for students and working professionals.",
    location: "Bhiwani, Haryana",
    price: 8000,
    rating: 4.2,
    imageUrl: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxhbGx8fHx8fHx8fHwxNjQ5OTczMDI5&ixlib=rb-1.2.1&q=80&w=1080",
    images: [
      "https://images.unsplash.com/photo-1721322800607-8c38375eef04?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxhbGx8fHx8fHx8fHwxNjQ5OTczMDI5&ixlib=rb-1.2.1&q=80&w=1080",
      "https://images.unsplash.com/photo-1483058712412-4245e9b90334?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxhbGx8fHx8fHx8fHwxNjQ5OTczMDI5&ixlib=rb-1.2.1&q=80&w=1080",
      "https://images.unsplash.com/photo-1487958449943-2429e8be8625?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxhbGx8fHx8fHx8fHwxNjQ5OTczMDI5&ixlib=rb-1.2.1&q=80&w=1080"
    ],
    isVerified: true,
    amenities: ["3 Meals Daily", "WiFi", "Power Backup", "Attached Bathroom", "TV", "Laundry"],
    owner: {
      name: "Suman Devi",
      phone: "+91-9765432180",
      isVerified: true,
      rating: 4.5
    },
    latitude: 28.7938,
    longitude: 76.1323,
    reviews: [
      {
        id: "rev3",
        userName: "Rajesh Verma",
        rating: 4.2,
        comment: "Food is good and rooms are clean. The owner is very caring.",
        date: "2023-11-05"
      },
      {
        id: "rev4",
        userName: "Meena Kumari",
        rating: 4.0,
        comment: "Decent place for the price. The meals are nutritious and freshly cooked.",
        date: "2023-10-30"
      }
    ]
  },
  {
    id: "room3",
    title: "2BHK with Modern Amenities",
    description: "A spacious 2BHK apartment perfect for sharing. The property features modern amenities including a fully equipped kitchen, comfortable furniture, and a balcony with a scenic view. Located in a rural setting with proximity to essential services.",
    location: "Nainital Outskirts, Uttarakhand",
    price: 12000,
    rating: 4.8,
    imageUrl: "https://images.unsplash.com/photo-1483058712412-4245e9b90334?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxhbGx8fHx8fHx8fHwxNjQ5OTczMDI5&ixlib=rb-1.2.1&q=80&w=1080",
    images: [
      "https://images.unsplash.com/photo-1483058712412-4245e9b90334?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxhbGx8fHx8fHx8fHwxNjQ5OTczMDI5&ixlib=rb-1.2.1&q=80&w=1080",
      "https://images.unsplash.com/photo-1487958449943-2429e8be8625?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxhbGx8fHx8fHx8fHwxNjQ5OTczMDI5&ixlib=rb-1.2.1&q=80&w=1080",
      "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxhbGx8fHx8fHx8fHwxNjQ5OTczMDI5&ixlib=rb-1.2.1&q=80&w=1080"
    ],
    isVerified: false,
    amenities: ["Fully Furnished", "Kitchen", "Hot Water", "Mountain View", "Parking", "WiFi"],
    owner: {
      name: "Vikram Joshi",
      phone: "+91-8765432190",
      isVerified: false,
      rating: 4.3
    },
    latitude: 29.3803,
    longitude: 79.4636,
    reviews: [
      {
        id: "rev5",
        userName: "Ananya Patel",
        rating: 4.8,
        comment: "Beautiful location with amazing views. The apartment is well-maintained and spacious.",
        date: "2023-11-10"
      },
      {
        id: "rev6",
        userName: "Rohit Singh",
        rating: 4.7,
        comment: "Excellent place to stay. The amenities are great and the owner is responsive.",
        date: "2023-09-18"
      }
    ]
  },
  {
    id: "room4",
    title: "Traditional Rural Cottage",
    description: "Experience rural living in this traditional cottage with modern comforts. The cottage features a single bedroom, living area, and kitchenette. Surrounded by farmlands, this property offers a peaceful retreat from city life while maintaining proximity to educational institutions.",
    location: "Palakkad, Kerala",
    price: 7500,
    rating: 4.6,
    imageUrl: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxhbGx8fHx8fHx8fHwxNjQ5OTczMDI5&ixlib=rb-1.2.1&q=80&w=1080",
    images: [
      "https://images.unsplash.com/photo-1487958449943-2429e8be8625?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxhbGx8fHx8fHx8fHwxNjQ5OTczMDI5&ixlib=rb-1.2.1&q=80&w=1080",
      "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxhbGx8fHx8fHx8fHwxNjQ5OTczMDI5&ixlib=rb-1.2.1&q=80&w=1080",
      "https://images.unsplash.com/photo-1721322800607-8c38375eef04?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxhbGx8fHx8fHx8fHwxNjQ5OTczMDI5&ixlib=rb-1.2.1&q=80&w=1080"
    ],
    isVerified: true,
    amenities: ["Garden", "Kitchenette", "WiFi", "Natural Ventilation", "Traditional Architecture"],
    owner: {
      name: "Lakshmi Nair",
      phone: "+91-7654321890",
      isVerified: true,
      rating: 4.9
    },
    latitude: 10.7867,
    longitude: 76.6609,
    reviews: [
      {
        id: "rev7",
        userName: "Vishnu Menon",
        rating: 4.9,
        comment: "A perfect blend of traditional living and modern comforts. The surroundings are serene and beautiful.",
        date: "2023-11-02"
      },
      {
        id: "rev8",
        userName: "Deepa Thomas",
        rating: 4.5,
        comment: "The cottage is clean and comfortable. The host is very hospitable.",
        date: "2023-10-12"
      }
    ]
  }
];
