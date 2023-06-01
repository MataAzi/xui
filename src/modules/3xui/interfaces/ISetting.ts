export interface ISetting {
  clients: Client[];
  disableInsecureEncryption?: boolean;
  decryption?: string;
  fallbacks?: [];
}

export interface Client {
  id: string;
  alterId: number;
  email: string;
  limitIp: number;
  totalGB: number;
  expiryTime: number;
  enable: boolean;
  tgId: string;
  subId: string;
}