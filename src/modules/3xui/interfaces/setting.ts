export interface Setting {
    log: Log;
    api: API;
    inbounds: Inbound[];
    outbounds: Outbound[];
    policy: Policy;
    routing: Routing;
    stats: Stats;
}

export interface API {
    services: string[];
    tag: string;
}

export interface Inbound {
    listen: string;
    port: number;
    protocol: string;
    settings: InboundSettings;
    tag: string;
}

export interface InboundSettings {
    address: string;
}

export interface Log {
    loglevel: string;
    access: string;
}

export interface Outbound {
    tag?: string;
    protocol: string;
    settings: OutboundSettings;
    streamSettings?: StreamSettings;
}

export interface OutboundSettings {
    vnext?: Vnext[];
}

export interface Vnext {
    address: string;
    port: number;
    users: User[];
}

export interface User {
    id: string;
    alterId: number;
    email?: string,
    security?: string
}

export interface StreamSettings {
    network: string;
    wsSettings: any
}

export interface Policy {
    levels: Levels;
    system: System;
}

export interface Levels {
    "0": The0;
}

export interface The0 {
    statsUserUplink: boolean;
    statsUserDownlink: boolean;
}

export interface System {
    statsInboundDownlink: boolean;
    statsInboundUplink: boolean;
}

export interface Routing {
    rules: Rule[];
}

export interface Rule {
    user?: string[];
    outboundTag: string;
    type: string;
    inboundTag?: string[];
    ip?: string[];
    protocol?: string[];
}

export interface Stats {
}
