
export interface Donation {
  id: string;
  name: string;
  amount: number;
  message?: string;
  timestamp: Date;
}

export interface AppConfig {
  youtubeUrl: string;
  eventName: string;
  targetAmount: number;
}
