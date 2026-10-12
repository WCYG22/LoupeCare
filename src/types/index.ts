export type Role = 'student' | 'clinician' | 'admin';

export type CampusLocation = 
  | 'IMU Bukit Jalil (Oral Health Centre Level 3)'
  | 'UM Faculty of Dentistry (Clinical Lounge)'
  | 'UKM Kampus KL (Dental Library Annex)'
  | 'UiTM Sungai Buloh (Specialist Polyclinic)';

export type ServiceStageId = 1 | 2 | 3 | 4;

export interface RegisteredLoupe {
  id: string;
  brandModel: string;
  serialNumber: string;
  type: 'Galilean HD' | 'Prismatic Keplerian' | 'TTL Ergonomic';
  magnification: string;
  workingDistance: string;
  frameMaterial: string;
  healthScore: number; // 0-100
  nanoCoatDaysRemaining: number;
  lastServicedDate: string;
  nextRecommendedService: string;
  torqueSpec: string;
  currentStatus: 'Optimal' | 'Maintenance Due' | 'In Servicing' | 'Ready for Pickup';
  currentLockerCode?: string;
  currentLockerLocation?: string;
}

export interface InspectionCheckItem {
  id: string;
  label: string;
  area: 'frame' | 'optics' | 'hinges' | 'nosepads' | 'seals';
  status: 'passed' | 'warning' | 'flagged';
  notes: string;
}

export interface ServiceStage {
  id: ServiceStageId;
  title: string;
  subtitle: string;
  status: 'completed' | 'current' | 'pending';
  timestamp?: string;
  technician: string;
  parameters: {
    label: string;
    value: string;
  }[];
  description: string;
}

export interface LoanerLoupe {
  id: string;
  model: string;
  magnification: '2.5x' | '3.0x' | '3.5x';
  type: 'Galilean' | 'Prismatic';
  workingDistance: '350mm' | '420mm' | '480mm';
  pupillaryDistances: string[];
  weight: string;
  availableLocation: CampusLocation;
  isAvailable: boolean;
}

export interface MohCertificate {
  certificateId: string;
  batchId: string;
  loupeSerial: string;
  ownerName: string;
  ownerAffiliation: string;
  serviceDate: string;
  validUntil: string;
  leadTechnician: string;
  enzymaticSolution: string;
  cavitationFreq: string;
  antiFogPolymerBatch: string;
  torqueReading: string;
  standardsVerified: string[];
}

export interface SubscriptionTier {
  id: string;
  name: string;
  targetAudience: string;
  priceRM: number;
  period: string;
  features: string[];
  badge?: string;
  servicesPerYear: number;
  includesLoaner: boolean;
  courierPickup: boolean;
}

export interface InAppNotification {
  id: string;
  type: 'stage_complete' | 'loaner_ready' | 'inspection_ready' | 'pickup_ready' | 'maintenance_due';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  actionLabel?: string;
  actionTab?: 'loupe' | 'tracker' | 'loaners' | 'profile';
  actionType?: 'pickup' | 'inspection' | 'loaner' | 'tracker';
}
