import { IProtocol } from "./IProtocol";
import { ISetting } from "./ISetting";
export interface IAddInbound {
    up: number;
    down: number;
    total: number;
    remark: string;
    enable: boolean;
    expiryTime: number;
    listen: string;
    port: number;
    protocol: IProtocol;
    settings: string;
    streamSettings: string;
    sniffing: boolean;
}
export interface IAddClient {
    id: string;
    settings: ISetting;
}
