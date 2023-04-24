import { Obj } from "./interfaces/Inbound";
/**
 * Completable with https://github.com/MHSanaei/3x-ui/
 */
export declare class X3UI {
    private panelCredentials;
    private axios;
    private remark;
    constructor(credentials: IPanelCredentials, remark: string);
    login(): Promise<boolean>;
    createInbound(inboundData: ICreateInbound): Promise<boolean>;
    getAllInbounds(): Promise<{
        ok: boolean;
        data?: undefined;
    } | {
        ok: boolean;
        data: Obj[];
    }>;
    getInboundIdByPort(port: number): Promise<{
        ok: boolean;
        data?: undefined;
    } | {
        ok: boolean;
        data: number;
    }>;
    createClient(inboundId: number, clientData: IClient): Promise<boolean>;
    updateClient(inboundId: number, uuid: string, data: IClient): Promise<{
        ok: boolean;
        msg: string;
    } | {
        ok: boolean;
        msg?: undefined;
    }>;
    deleteClient(inboundId: number, uuid: string): Promise<boolean | {
        ok: boolean;
        msg: string;
    }>;
    getClientStatsByUuid(inboundId: number, uuid: string): Promise<{
        ok: boolean;
        msg: string;
        data?: undefined;
    } | {
        ok: boolean;
        data: import("./interfaces/Inbound").ClientStat;
        msg?: undefined;
    }>;
    generateLink(client: IClient, protocol: IProtocol, host: string, port: number, requestHost?: string): void;
    private vlessGenerator;
    private vmessGenerator;
    private fixClient;
}
export declare function gbToBytes(gb: number): number;
export interface IResult {
    success: boolean;
}
export interface IPanelCredentials {
    baseUrl: string;
    username: string;
    password: string;
}
export interface IVmess {
    v: string;
    ps: string;
    add: string;
    port: number;
    id: string;
    aid: number;
    net: string;
    type: string;
    host: string;
    path: string;
    tls: string;
    sni: string;
    fp: string;
    alpn: string;
    allowInsecure: boolean;
}
export interface ICreateInbound {
    remark?: string;
    port: number;
    protocol: IProtocol;
}
export declare enum Protocol {
    Vmess = "vmess",
    Vless = "vless"
}
export interface IClient {
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
export declare enum IProtocol {
    VMESS = "vmess",
    VLESS = "vless"
}
