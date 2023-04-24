export interface User {
    id: number;
    up: number;
    down: number;
    total: number;
    remark: string;
    enable: boolean;
    expiryTime: number;
    clientStats: ClientStat[];
    listen: string;
    uuid: string;
    port: number;
    protocol: string;
    settings: string | UserServiceSetting;
    streamSettings: string;
    tag: string;
    sniffing: string;
}
export interface ClientStat {
    id: number;
    inboundId: number;
    enable: boolean;
    email: string;
    up: number;
    down: number;
    expiryTime: number;
    total: number;
}
export interface UserServiceSetting {
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
}
