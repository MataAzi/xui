export interface ISetting {
  clients: Client[];
  disableInsecureEncryption: boolean;
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

export interface IStreamSetting {
  network: string;
  security: string;
  wsSettings: WsSettings;
}

export interface WsSettings {
  acceptProxyProtocol: boolean;
  path: string;
  headers: Headers;
}

export interface Headers {}
