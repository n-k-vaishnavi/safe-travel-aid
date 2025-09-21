// Demo data for the Smart Tourist Safety Monitor

export interface Tourist {
  id: string;
  name: string;
  nationality: string;
  passportNumber: string;
  location: {
    lat: number;
    lng: number;
  };
  digitalId: {
    qrCode: string;
    blockchainHash: string;
    issuedAt: string;
  };
  status: 'safe' | 'warning' | 'emergency';
  lastSeen: string;
  phoneNumber: string;
  emergencyContact: string;
  plannedRoute: string;
  checkInTime: string;
}

export interface GeofenceZone {
  id: string;
  name: string;
  type: 'restricted' | 'unsafe' | 'safe' | 'border';
  coordinates: { lat: number; lng: number }[];
  alertLevel: 'low' | 'medium' | 'high';
  description: string;
}

export interface Alert {
  id: string;
  touristId: string;
  touristName: string;
  type: 'geofence' | 'panic' | 'inactive' | 'route_deviation';
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  location: { lat: number; lng: number };
  timestamp: string;
  resolved: boolean;
  eFireGenerated: boolean;
}

// Demo tourists data (focusing on Assam/Northeast India region)
export const demoTourists: Tourist[] = [
  {
    id: 'T001',
    name: 'Emma Johnson',
    nationality: 'USA',
    passportNumber: 'US123456789',
    location: { lat: 26.1445, lng: 91.7362 }, // Guwahati
    digitalId: {
      qrCode: 'BLOCKCHAIN_T001_HASH',
      blockchainHash: '0x1a2b3c4d5e6f7890abcdef1234567890',
      issuedAt: '2024-01-15T10:30:00Z'
    },
    status: 'safe',
    lastSeen: '2024-01-20T14:30:00Z',
    phoneNumber: '+1-555-0123',
    emergencyContact: '+1-555-0124',
    plannedRoute: 'Guwahati → Kaziranga → Shillong',
    checkInTime: '2024-01-20T08:00:00Z'
  },
  {
    id: 'T002',
    name: 'Raj Patel',
    nationality: 'India',
    passportNumber: 'IN987654321',
    location: { lat: 26.7271, lng: 94.1175 }, // Near Kaziranga
    digitalId: {
      qrCode: 'BLOCKCHAIN_T002_HASH',
      blockchainHash: '0x2b3c4d5e6f7890abcdef1234567890ab',
      issuedAt: '2024-01-16T09:15:00Z'
    },
    status: 'warning',
    lastSeen: '2024-01-20T13:45:00Z',
    phoneNumber: '+91-9876543210',
    emergencyContact: '+91-9876543211',
    plannedRoute: 'Kaziranga National Park Safari',
    checkInTime: '2024-01-20T06:30:00Z'
  },
  {
    id: 'T003',
    name: 'Sarah Wilson',
    nationality: 'UK',
    passportNumber: 'UK456789123',
    location: { lat: 25.5788, lng: 91.8933 }, // Shillong
    digitalId: {
      qrCode: 'BLOCKCHAIN_T003_HASH',
      blockchainHash: '0x3c4d5e6f7890abcdef1234567890abcd',
      issuedAt: '2024-01-17T11:45:00Z'
    },
    status: 'emergency',
    lastSeen: '2024-01-20T12:20:00Z',
    phoneNumber: '+44-7123456789',
    emergencyContact: '+44-7123456790',
    plannedRoute: 'Shillong → Cherrapunji → Dawki',
    checkInTime: '2024-01-20T07:15:00Z'
  }
];

export const demoGeofences: GeofenceZone[] = [
  {
    id: 'GF001',
    name: 'International Border - Bangladesh',
    type: 'restricted',
    coordinates: [
      { lat: 25.1000, lng: 89.7000 },
      { lat: 25.2000, lng: 89.9000 },
      { lat: 25.1500, lng: 90.0000 },
      { lat: 25.0500, lng: 89.8000 }
    ],
    alertLevel: 'high',
    description: 'International border area - restricted access'
  },
  {
    id: 'GF002',
    name: 'Dense Forest Area - Kaziranga Buffer',
    type: 'unsafe',
    coordinates: [
      { lat: 26.5000, lng: 93.8000 },
      { lat: 26.6000, lng: 94.0000 },
      { lat: 26.7000, lng: 93.9000 },
      { lat: 26.6500, lng: 93.7000 }
    ],
    alertLevel: 'medium',
    description: 'Wildlife area - potential animal encounters'
  }
];

export const demoAlerts: Alert[] = [
  {
    id: 'A001',
    touristId: 'T003',
    touristName: 'Sarah Wilson',
    type: 'panic',
    severity: 'critical',
    message: 'Emergency panic button activated by tourist',
    location: { lat: 25.5788, lng: 91.8933 },
    timestamp: '2024-01-20T12:20:00Z',
    resolved: false,
    eFireGenerated: true
  },
  {
    id: 'A002',
    touristId: 'T002',
    touristName: 'Raj Patel',
    type: 'geofence',
    severity: 'medium',
    message: 'Tourist approaching restricted border area',
    location: { lat: 26.7271, lng: 94.1175 },
    timestamp: '2024-01-20T13:45:00Z',
    resolved: false,
    eFireGenerated: false
  },
  {
    id: 'A003',
    touristId: 'T001',
    touristName: 'Emma Johnson',
    type: 'inactive',
    severity: 'low',
    message: 'No movement detected for 2 hours',
    location: { lat: 26.1445, lng: 91.7362 },
    timestamp: '2024-01-20T14:30:00Z',
    resolved: true,
    eFireGenerated: false
  }
];

export const languages = {
  en: {
    name: 'English',
    code: 'en',
    flag: '🇺🇸'
  },
  hi: {
    name: 'हिन्दी',
    code: 'hi',
    flag: '🇮🇳'
  },
  as: {
    name: 'অসমীয়া',
    code: 'as',
    flag: '🏛️'
  }
};