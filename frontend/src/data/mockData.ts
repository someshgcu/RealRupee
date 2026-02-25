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
  source: string;
  contact?: string;
}

export interface Transaction {
  id: string;
  date: string;
  amount: number;
  coinAmount: number;
  type: "Credit" | "Debit";
  status: "Success" | "Pending" | "Failed";
  method: string;
  service: string;
  relatedPropertyId?: string;
  relatedPropertyTitle?: string;
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
    subtype: "Apartments",
    price: 25000000,
    pricePerSqft: 22500,
    area: 1100,
    areaUnit: "Square feet",
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
    amenities: ["Swimming Pool", "Gymnasium", "Car Parking", "24 X 7 Security", "Power Backup"],
    ownerId: "u1",
  },
  {
    id: "p2",
    title: "Modern Villa in Whitefield",
    type: "Residential",
    subtype: "Villas",
    price: 45000000,
    pricePerSqft: 15000,
    area: 3000,
    areaUnit: "Square feet",
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
    amenities: ["Landscaped Gardens", "Club House", "Swimming Pool", "Gymnasium", "24 X 7 Security", "Car Parking"],
    ownerId: "o2",
  },
  {
    id: "p3",
    title: "Commercial Office Space in BKC",
    type: "Commercial",
    subtype: "Office Space",
    price: 18000000,
    pricePerSqft: 30000,
    area: 600,
    areaUnit: "Square feet",
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
    amenities: ["Car Parking", "24 X 7 Security", "Power Backup", "CCTV"],
    ownerId: "u1",
  },
  {
    id: "p4",
    title: "2BHK Flat in Andheri East",
    type: "Residential",
    subtype: "Apartments",
    price: 12000000,
    pricePerSqft: 18000,
    area: 670,
    areaUnit: "Square feet",
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
    amenities: ["Gymnasium", "Car Parking", "24 X 7 Security", "Children Play Area"],
    ownerId: "o3",
  },
  {
    id: "p5",
    title: "Farmhouse Plot in Karjat",
    type: "Agricultural",
    subtype: "Farm House",
    price: 8000000,
    pricePerSqft: 800,
    area: 10000,
    areaUnit: "Square feet",
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
    amenities: ["Street Lighting", "Storm Water Drains"],
    ownerId: "u1",
  },
  {
    id: "p6",
    title: "Penthouse in Powai",
    type: "Residential",
    subtype: "Apartments",
    price: 55000000,
    pricePerSqft: 35000,
    area: 1570,
    areaUnit: "Square feet",
    beds: 4,
    baths: 3,
    balconies: 2,
    parking: 2,
    facing: "North East",
    location: "Powai, Mumbai",
    city: "Mumbai",
    imageUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&h=400&fit=crop",
    status: "Active",
    isValidated: true,
    isFeatured: true,
    postedDate: "2026-02-08",
    description: "Stunning penthouse with panoramic lake views, private terrace, and Italian marble flooring.",
    amenities: ["Swimming Pool", "Gymnasium", "Club House", "Car Parking", "Intercom"],
    ownerId: "o4",
  },
  {
    id: "p7",
    title: "Studio Apartment in Hinjewadi",
    type: "Residential",
    subtype: "Studio Apartments",
    price: 4500000,
    pricePerSqft: 12500,
    area: 360,
    areaUnit: "Square feet",
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
    amenities: ["Gymnasium", "24 X 7 Security", "Power Backup"],
    ownerId: "u1",
  },
  {
    id: "p8",
    title: "Independent House in Wagholi",
    type: "Residential",
    subtype: "Independent House",
    price: 9500000,
    pricePerSqft: 6300,
    area: 1500,
    areaUnit: "Square feet",
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
    description: "Spacious independent house in gated community with private garden and modern amenities.",
    amenities: ["Landscaped Gardens", "Club House", "Swimming Pool", "24 X 7 Security", "Car Parking"],
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
  { id: "v1", name: "Priya Sharma", date: "2026-02-23", propertyId: "p1", propertyTitle: "Luxury 3BHK Apartment in Bandra West", source: "Direct Search", contact: "+91 99887 76655" },
  { id: "v2", name: "Amit Patel", date: "2026-02-22", propertyId: "p1", propertyTitle: "Luxury 3BHK Apartment in Bandra West", source: "Featured Listing", contact: "+91 88776 55443" },
  { id: "v3", name: "Sneha Reddy", date: "2026-02-21", propertyId: "p3", propertyTitle: "Commercial Office Space in BKC", source: "Google Search" },
  { id: "v4", name: "Vikram Singh", date: "2026-02-20", propertyId: "p5", propertyTitle: "Farmhouse Plot in Karjat", source: "Referral", contact: "+91 66554 33221" },
  { id: "v5", name: "Kavitha Nair", date: "2026-02-19", propertyId: "p1", propertyTitle: "Luxury 3BHK Apartment in Bandra West", source: "Social Media" },
  { id: "v6", name: "Arjun Mehta", date: "2026-02-18", propertyId: "p7", propertyTitle: "Studio Apartment in Hinjewadi", source: "Direct Search", contact: "+91 44332 11009" },
  { id: "v7", name: "Deepa Iyer", date: "2026-02-17", propertyId: "p4", propertyTitle: "2BHK Flat in Andheri East", source: "Google Search" },
  { id: "v8", name: "Ravi Kumar", date: "2026-02-16", propertyId: "p1", propertyTitle: "Luxury 3BHK Apartment in Bandra West", source: "Featured Listing", contact: "+91 22110 99887" },
];

export const transactions: Transaction[] = [
  {
    id: "t1",
    date: "2026-02-22",
    amount: 999,
    coinAmount: 50,
    type: "Debit",
    status: "Success",
    method: "UPI",
    service: "Property Validation",
    relatedPropertyId: "p1",
    relatedPropertyTitle: "Luxury 3BHK Apartment in Bandra West",
  },
  {
    id: "t2",
    date: "2026-02-20",
    amount: 0,
    coinAmount: 100,
    type: "Credit",
    status: "Success",
    method: "Reward",
    service: "Referral Bonus",
  },
  {
    id: "t3",
    date: "2026-02-18",
    amount: 499,
    coinAmount: 25,
    type: "Debit",
    status: "Success",
    method: "Net Banking",
    service: "Legal Opinion",
    relatedPropertyId: "p3",
    relatedPropertyTitle: "Commercial Office Space in BKC",
  },
  {
    id: "t4",
    date: "2026-02-15",
    amount: 0,
    coinAmount: 50,
    type: "Credit",
    status: "Success",
    method: "Reward",
    service: "Property Listing Bonus",
    relatedPropertyId: "p5",
    relatedPropertyTitle: "Farmhouse Plot in Karjat",
  },
  {
    id: "t5",
    date: "2026-02-14",
    amount: 1499,
    coinAmount: 75,
    type: "Debit",
    status: "Pending",
    method: "Credit Card",
    service: "Priority Listing",
    relatedPropertyId: "p7",
    relatedPropertyTitle: "Studio Apartment in Hinjewadi",
  },
  {
    id: "t6",
    date: "2026-02-10",
    amount: 0,
    coinAmount: 25,
    type: "Credit",
    status: "Success",
    method: "Reward",
    service: "Profile Completion Bonus",
  },
];

export const cities = ["Mumbai", "Bangalore", "Pune", "Delhi", "Hyderabad", "Chennai"];

// Strict property types per spec
export const propertyTypes = ["Residential", "Commercial", "Agricultural", "Development"];

// Strict subtypes per spec
export const propertySubtypes: Record<string, string[]> = {
  Residential: ["Apartments", "Builder Floor", "Independent House", "Villas", "Studio Apartments", "Open Plots", "Project"],
  Commercial: ["Office Space", "Retail Shops", "Ware Houses", "Industrial", "Commercial Buildings", "Others", "Project"],
  Agricultural: ["Agricultural Land", "Farm House", "Farm Plots", "Others"],
  Development: ["Commercial", "Apartment", "Plot Development", "Independent House", "Others"],
};

// Condition: only for Residential
export const conditions = ["New", "Resale", "Foreclosure"];

// Facing options per spec (no hyphens)
export const facingOptions = ["North", "East", "West", "South", "North East", "North West", "South East", "South West"];

// Area units per spec
export const areaUnits = ["Square feet", "Square yards", "Cents", "Acres"];

// Exact 25 amenities per spec
export const amenitiesList = [
  "24 X 7 Security",
  "Amphitheater",
  "Banquet Hall",
  "Basketball Court",
  "Car Parking",
  "CCTV",
  "Children Play Area",
  "Closed Car Parking",
  "Club House",
  "Gated Community",
  "Gymnasium",
  "Indoor Games",
  "Intercom",
  "Jogging Track",
  "Landscaped Gardens",
  "Library",
  "Multipurpose Room",
  "Power Backup",
  "Rain Water Harvesting",
  "Sewage Treatment Plant",
  "Staff Quarter",
  "Street Lighting",
  "Storm Water Drains",
  "Swimming Pool",
  "Vaastu Compliant",
];

// Exact 20 documents per spec
export const documentChecklist = [
  "Sale Deed",
  "Encumbrance Certificate",
  "Legal Opinion",
  "Mutation Register Extract",
  "General Power of Attorney",
  "NOC",
  "Sale Agreement",
  "Allotment Letter",
  "Court Order",
  "Property Media",
  "Additional Docs",
  "Layout Permission",
  "Building Plan",
  "Property Tax / Receipts",
  "Possession Letters",
  "Occupancy Certificate",
  "Computation Certificate",
  "NALA Certificate",
  "RERA Approval",
  "Permission from Authorised Body",
];

export function formatPrice(price: number): string {
  if (price >= 10000000) return `₹${(price / 10000000).toFixed(2)} Cr`;
  if (price >= 100000) return `₹${(price / 100000).toFixed(2)} L`;
  return `₹${price.toLocaleString("en-IN")}`;
}
