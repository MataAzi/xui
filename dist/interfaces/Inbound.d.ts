export interface IInboundList {
    success: boolean;
    msg: string;
    obj: Obj[];
}
export interface Obj {
    id: number;
    up: number;
    down: number;
    total: number;
    remark: string;
    enable: boolean;
    expiryTime: number;
    clientStats: ClientStat[];
    listen: string;
    port: number;
    protocol: string;
    settings: string;
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
