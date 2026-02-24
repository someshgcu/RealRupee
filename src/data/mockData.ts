export interface Property {
  id: string;
  title: string;
  type: string;
  subtype: string;
  price: number;
  pricePerSqft: number;
  area: number;
  areaUnit: string;
  beds: number;
  baths: number;
  balconies: number;
  parking: number;
  facing: string;
  location: string;
  city: string;
  imageUrl: string;
  status: "Active" | "Awaiting Approval" | "Under Review" | "Sold";
  isValidated: boolean;
  isFeatured: boolean;
  postedDate: string;
  description: string;
  amenities: string[];
  ownerId: string;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  propertyId: string;
  propertyTitle: string;
  date: string;
  status: "New" | "Contacted" | "Closed";
}

export interface Visitor {
  id: string;
  name: string;
  date: string;
  propertyId: string;
  propertyTitle: string;
}

export interface DashboardStats {
  totalProperties: number;
  shortlistCount: number;
  visitorCount: number;
  leadsCount: number;
  transactionCount: number;
  coins: number;
}

export interface CurrentUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  coins: number;
}

export const currentUser: CurrentUser = {
  id: "u1",
  name: "Rajesh Kumar",
  email: "rajesh@example.com",
  phone: "+91 98765 43210",
  avatar: "",
  coins: 250,
};

export const dashboardStats: DashboardStats = {
  totalProperties: 5,
  shortlistCount: 12,
  visitorCount: 48,
  leadsCount: 7,
  transactionCount: 2,
  coins: 250,
};

export const properties: Property[] = [
  {
    id: "p1",
    title: "Luxury 3BHK Apartment in Bandra West",
    type: "Residential",
    subtype: "Apartment",
    price: 25000000,
    pricePerSqft: 22500,
    area: 1100,
    areaUnit: "sq.ft",
    beds: 3,
    baths: 2,
    balconies: 2,
    parking: 1,
    facing: "East",
    location: "Bandra West, Mumbai",
    city: "Mumbai",
    imageUrl: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&h=400&fit=crop",
    status: "Active",
    isValidated: true,
    isFeatured: true,
    postedDate: "2026-02-15",
    description: "Spacious 3BHK apartment with sea-facing balcony, modular kitchen, and premium fittings.",
    amenities: ["Swimming Pool", "Gym", "Parking", "Security", "Power Backup", "Lift"],
    ownerId: "u1",
  },
  {
    id: "p2",
    title: "Modern Villa in Whitefield",
    type: "Residential",
    subtype: "Villa",
    price: 45000000,
    pricePerSqft: 15000,
    area: 3000,
    areaUnit: "sq.ft",
    beds: 4,
    baths: 4,
    balconies: 3,
    parking: 2,
    facing: "North",
    location: "Whitefield, Bangalore",
    city: "Bangalore",
    imageUrl: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&h=400&fit=crop",
    status: "Active",
    isValidated: true,
    isFeatured: true,
    postedDate: "2026-02-10",
    description: "Premium villa with private garden, rooftop terrace, and smart home automation.",
    amenities: ["Garden", "Clubhouse", "Swimming Pool", "Gym", "Security", "Parking"],
    ownerId: "o2",
  },
  {
    id: "p3",
    title: "Commercial Office Space in BKC",
    type: "Commercial",
    subtype: "Office",
    price: 18000000,
    pricePerSqft: 30000,
    area: 600,
    areaUnit: "sq.ft",
    beds: 0,
    baths: 1,
    balconies: 0,
    parking: 1,
    facing: "West",
    location: "BKC, Mumbai",
    city: "Mumbai",
    imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop",
    status: "Awaiting Approval",
    isValidated: false,
    isFeatured: false,
    postedDate: "2026-02-20",
    description: "Fully furnished office space in prime commercial hub with excellent connectivity.",
    amenities: ["Lift", "Parking", "Security", "Power Backup", "Cafeteria"],
    ownerId: "u1",
  },
  {
    id: "p4",
    title: "2BHK Flat in Andheri East",
    type: "Residential",
    subtype: "Apartment",
    price: 12000000,
    pricePerSqft: 18000,
    area: 670,
    areaUnit: "sq.ft",
    beds: 2,
    baths: 2,
    balconies: 1,
    parking: 1,
    facing: "South",
    location: "Andheri East, Mumbai",
    city: "Mumbai",
    imageUrl: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&h=400&fit=crop",
    status: "Active",
    isValidated: true,
    isFeatured: false,
    postedDate: "2026-02-18",
    description: "Well-maintained 2BHK with excellent ventilation and nearby metro access.",
    amenities: ["Gym", "Parking", "Security", "Lift", "Children Play Area"],
    ownerId: "o3",
  },
  {
    id: "p5",
    title: "Farmhouse Plot in Karjat",
    type: "Land",
    subtype: "Agricultural",
    price: 8000000,
    pricePerSqft: 800,
    area: 10000,
    areaUnit: "sq.ft",
    beds: 0,
    baths: 0,
    balconies: 0,
    parking: 0,
    facing: "East",
    location: "Karjat, Maharashtra",
    city: "Mumbai",
    imageUrl: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&h=400&fit=crop",
    status: "Under Review",
    isValidated: false,
    isFeatured: false,
    postedDate: "2026-02-22",
    description: "Lush green farmhouse plot with mountain views and natural water source.",
    amenities: ["Road Access", "Water Source", "Electricity"],
    ownerId: "u1",
  },
  {
    id: "p6",
    title: "Penthouse in Powai",
    type: "Residential",
    subtype: "Penthouse",
    price: 55000000,
    pricePerSqft: 35000,
    area: 1570,
    areaUnit: "sq.ft",
    beds: 4,
    baths: 3,
    balconies: 2,
    parking: 2,
    facing: "North-East",
    location: "Powai, Mumbai",
    city: "Mumbai",
    imageUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&h=400&fit=crop",
    status: "Active",
    isValidated: true,
    isFeatured: true,
    postedDate: "2026-02-08",
    description: "Stunning penthouse with panoramic lake views, private terrace, and Italian marble flooring.",
    amenities: ["Swimming Pool", "Gym", "Clubhouse", "Concierge", "Parking", "Lift"],
    ownerId: "o4",
  },
  {
    id: "p7",
    title: "Studio Apartment in Hinjewadi",
    type: "Residential",
    subtype: "Apartment",
    price: 4500000,
    pricePerSqft: 12500,
    area: 360,
    areaUnit: "sq.ft",
    beds: 1,
    baths: 1,
    balconies: 1,
    parking: 0,
    facing: "West",
    location: "Hinjewadi, Pune",
    city: "Pune",
    imageUrl: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&h=400&fit=crop",
    status: "Active",
    isValidated: false,
    isFeatured: false,
    postedDate: "2026-02-19",
    description: "Compact studio apartment ideal for IT professionals, close to tech parks.",
    amenities: ["Gym", "Security", "Lift", "Power Backup"],
    ownerId: "u1",
  },
  {
    id: "p8",
    title: "Row House in Wagholi",
    type: "Residential",
    subtype: "Row House",
    price: 9500000,
    pricePerSqft: 6300,
    area: 1500,
    areaUnit: "sq.ft",
    beds: 3,
    baths: 3,
    balconies: 1,
    parking: 1,
    facing: "South",
    location: "Wagholi, Pune",
    city: "Pune",
    imageUrl: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&h=400&fit=crop",
    status: "Active",
    isValidated: true,
    isFeatured: false,
    postedDate: "2026-02-12",
    description: "Spacious row house in gated community with private garden and modern amenities.",
    amenities: ["Garden", "Clubhouse", "Swimming Pool", "Security", "Parking"],
    ownerId: "o5",
  },
];

export const leadsAndEnquiries: Lead[] = [
  {
    id: "l1",
    name: "Priya Sharma",
    email: "priya@email.com",
    phone: "+91 99887 76655",
    message: "I am interested in the 3BHK apartment. Is the price negotiable?",
    propertyId: "p1",
    propertyTitle: "Luxury 3BHK Apartment in Bandra West",
    date: "2026-02-23",
    status: "New",
  },
  {
    id: "l2",
    name: "Amit Patel",
    email: "amit.p@email.com",
    phone: "+91 88776 55443",
    message: "Can I schedule a site visit this weekend?",
    propertyId: "p1",
    propertyTitle: "Luxury 3BHK Apartment in Bandra West",
    date: "2026-02-22",
    status: "Contacted",
  },
  {
    id: "l3",
    name: "Sneha Reddy",
    email: "sneha.r@email.com",
    phone: "+91 77665 44332",
    message: "What is the maintenance charge for the commercial space?",
    propertyId: "p3",
    propertyTitle: "Commercial Office Space in BKC",
    date: "2026-02-21",
    status: "New",
  },
  {
    id: "l4",
    name: "Vikram Singh",
    email: "vikram@email.com",
    phone: "+91 66554 33221",
    message: "Is the farmhouse plot RERA registered?",
    propertyId: "p5",
    propertyTitle: "Farmhouse Plot in Karjat",
    date: "2026-02-20",
    status: "New",
  },
  {
    id: "l5",
    name: "Kavitha Nair",
    email: "kavitha@email.com",
    phone: "+91 55443 22110",
    message: "I would like to know more about the loan options available.",
    propertyId: "p1",
    propertyTitle: "Luxury 3BHK Apartment in Bandra West",
    date: "2026-02-19",
    status: "Closed",
  },
  {
    id: "l6",
    name: "Arjun Mehta",
    email: "arjun.m@email.com",
    phone: "+91 44332 11009",
    message: "Looking for bulk purchase options for the studio apartments.",
    propertyId: "p7",
    propertyTitle: "Studio Apartment in Hinjewadi",
    date: "2026-02-18",
    status: "New",
  },
  {
    id: "l7",
    name: "Deepa Iyer",
    email: "deepa@email.com",
    phone: "+91 33221 00998",
    message: "What are the possession timelines for the Andheri flat?",
    propertyId: "p4",
    propertyTitle: "2BHK Flat in Andheri East",
    date: "2026-02-17",
    status: "Contacted",
  },
];

export const propertyVisitors: Visitor[] = [
  { id: "v1", name: "Priya Sharma", date: "2026-02-23", propertyId: "p1", propertyTitle: "Luxury 3BHK Apartment in Bandra West" },
  { id: "v2", name: "Amit Patel", date: "2026-02-22", propertyId: "p1", propertyTitle: "Luxury 3BHK Apartment in Bandra West" },
  { id: "v3", name: "Sneha Reddy", date: "2026-02-21", propertyId: "p3", propertyTitle: "Commercial Office Space in BKC" },
  { id: "v4", name: "Vikram Singh", date: "2026-02-20", propertyId: "p5", propertyTitle: "Farmhouse Plot in Karjat" },
  { id: "v5", name: "Kavitha Nair", date: "2026-02-19", propertyId: "p1", propertyTitle: "Luxury 3BHK Apartment in Bandra West" },
  { id: "v6", name: "Arjun Mehta", date: "2026-02-18", propertyId: "p7", propertyTitle: "Studio Apartment in Hinjewadi" },
  { id: "v7", name: "Deepa Iyer", date: "2026-02-17", propertyId: "p4", propertyTitle: "2BHK Flat in Andheri East" },
  { id: "v8", name: "Ravi Kumar", date: "2026-02-16", propertyId: "p1", propertyTitle: "Luxury 3BHK Apartment in Bandra West" },
];

export const cities = ["Mumbai", "Bangalore", "Pune", "Delhi", "Hyderabad", "Chennai"];

export const propertyTypes = ["Residential", "Commercial", "Land"];
export const propertySubtypes: Record<string, string[]> = {
  Residential: ["Apartment", "Villa", "Penthouse", "Row House", "Independent House", "Studio"],
  Commercial: ["Office", "Shop", "Warehouse", "Showroom"],
  Land: ["Residential Plot", "Agricultural", "Industrial", "Commercial Plot"],
};

export const conditions = ["New Construction", "Under Construction", "Resale", "Ready to Move"];
export const facingOptions = ["North", "South", "East", "West", "North-East", "North-West", "South-East", "South-West"];

export const amenitiesList = [
  "Swimming Pool", "Gym", "Parking", "Security", "Power Backup", "Lift",
  "Garden", "Clubhouse", "Children Play Area", "Jogging Track", "Concierge",
  "Cafeteria", "Fire Safety", "Rainwater Harvesting", "Solar Panels", "CCTV",
];

export const documentChecklist = [
  "Sale Deed", "Title Deed", "Mother Deed", "Encumbrance Certificate", "Khata Certificate",
  "Property Tax Receipts", "Building Plan Approval", "Occupancy Certificate", "Completion Certificate",
  "RERA Registration", "NOC from Society", "Power of Attorney", "Allotment Letter",
  "Possession Letter", "Land Use Certificate", "Conversion Order", "Survey Map",
  "Mutation Register Extract", "Property Insurance", "Home Loan Sanction Letter",
];

export function formatPrice(price: number): string {
  if (price >= 10000000) return `${(price / 10000000).toFixed(2)} Cr`;
  if (price >= 100000) return `${(price / 100000).toFixed(2)} L`;
  return price.toLocaleString("en-IN");
}
