import axiosI, { AxiosInstance } from "axios";
import formUrlEncoded from "form-urlencoded";
import { IAddInbound } from "./interfaces/IAddInbound";
import { ISetting } from "./interfaces/ISetting";
import crypto from "crypto";
import { IInboundList } from "./interfaces/Inbound";
import { IReallityStream, IWSStreamSetting } from "./interfaces/IStreamSetting";

/**
 * Completable with https://github.com/MHSanaei/3x-ui/
 */
export class X3UI {
  private panelCredentials: IPanelCredentials;
  private axios: AxiosInstance;
  private remark: string;
  constructor(credentials: IPanelCredentials, remark: string) {
    this.panelCredentials = credentials;
    this.axios = axiosI.create({
      baseURL: credentials.baseUrl,
    });
    this.remark = remark;
  }

  public async login() {
    try {
      // Set Data
      const data = {
        username: this.panelCredentials.username,
        password: this.panelCredentials.password,
      };
      // Encode JSON Data to FormUrlEncoded
      const encodedData = formUrlEncoded(data);
      // Send Login Request
      const loginResult = await this.axios.post("/login", encodedData);
      // Check The Result Of login
      if (!loginResult.data.success) {
        return { ok: false, msg: "username or password wrong" };
      }
      // Set Cookie For Authentication
      this.axios.defaults.headers.common["Cookie"] =
        loginResult.headers["set-cookie"];

      return { ok: true };
    } catch (e) {
      return { ok: false, msg: e };
    }
  }

  public async createInbound(inboundData: ICreateInbound, type: StreamType) {
    try {
      let inbound: IAddInbound;
      // Destruct inboundData

      const { port, protocol, remark = this.remark } = inboundData;

      let streamSettings: IWSStreamSetting | IReallityStream;
      // Create stream setting 'ws'
      // TODO : Improve This To Handle http / quick and ...
      if (type === StreamType.ws)
        streamSettings = {
          network: "ws",
          security: "none",
          wsSettings: {
            acceptProxyProtocol: false,
            headers: {},
            path: inboundData.wsPath,
          },
        };
      else if (type === StreamType.reality) {
        streamSettings = {
          network: "tcp",
          security: "reality",
          realitySettings: {
            show: false,
            xver: 0,
            dest: "zula.ir:443",
            serverNames: ["zula.ir", "www.zula.ir"],
            privateKey: "mM54nqp8x8L6J4VkJqwFEF-vINDVGTCYlGvhRmXMxXg",
            minClient: "",
            maxClient: "",
            maxTimediff: 0,
            shortIds: ["1f5529d6"],
            settings: {
              publicKey: "JviAOhjc4r3k7fM6FHKrZu0rm3DodPh-kMJeOCnsLiA",
              fingerprint: "firefox",
              serverName: "",
            },
          },
          tcpSettings: { acceptProxyProtocol: false, header: { type: "none" } },
        };
      }
      // Create Setting Object
      // Client Is Disabled And it's Just for creating inbound
      if (protocol === Protocol.VMESS) {
        const setting: ISetting = {
          clients: [
            {
              id: crypto.randomUUID(),
              alterId: 0,
              email: generateRandomString(10),
              enable: false,
              expiryTime: new Date().getTime(),
              limitIp: 1,
              totalGB: 1,
              subId: "",
              tgId: "",
            },
          ],
          disableInsecureEncryption: false,
        };

        // Create inbound obj
        inbound = {
          enable: true,
          down: 0,
          total: 0,
          up: 0,
          expiryTime: 0,
          listen: "",
          port,
          protocol,
          remark,
          // Stringify setting object
          settings: JSON.stringify(setting),
          // Stringify streamSetting object
          streamSettings: JSON.stringify(streamSettings),
          sniffing: JSON.stringify({
            enabled: true,
            destOverride: ["http", "tls"],
          }),
        };
      } else {
        const setting: ISetting = {
          clients: [
            {
              id: crypto.randomUUID(),
              alterId: 0,
              email: generateRandomString(10),
              enable: false,
              expiryTime: new Date().getTime(),
              limitIp: 1,
              totalGB: 1,
              subId: "",
              tgId: "",
            },
          ],
          decryption: "none",
          fallbacks: [],
        };

        // Create inbound obj
        inbound = {
          enable: true,
          down: 0,
          total: 0,
          up: 0,
          expiryTime: 0,
          listen: "",
          port,
          protocol,
          remark,
          // Stringify setting object
          settings: JSON.stringify(setting),
          // Stringify streamSetting object
          streamSettings: JSON.stringify(streamSettings),
          sniffing: JSON.stringify({
            enabled: true,
            destOverride: ["http", "tls"],
          }),
        };
      }

      // Post inbound data formUrlEncoded
      const result = <IResult>(
        (await this.axios.post("/xui/inbound/add", formUrlEncoded(inbound)))
          .data
      );
      // Check If Result is success
      if (result.success) return { ok: true };
    } catch (e) {
      return { ok: false, msg: e };
    }
  }

  public async getAllInbounds() {
    // Get All Inbounds
    const result = <IInboundList>(
      (await this.axios.post("/xui/inbound/list")).data
    );
    if (!result.success) return { ok: false };
    // Return All inbounds
    return { ok: true, data: result.obj };
  }

  public async getInboundIdByPort(port: number) {
    try {
      // Get All inbounds
      const inbounds = await this.getAllInbounds();
      // Return false on error
      if (!inbounds.ok) return { ok: false };
      // Get specific inbound by port
      const specificInbound = inbounds.data?.find((x) => x.port === port);
      // Return false on no specific inbound
      if (!specificInbound) return { ok: false };
      // return Inbound id
      return { ok: true, data: specificInbound.id };
    } catch (e) {
      return { ok: false, msg: e };
    }
  }

  public async createClient(inboundId: number, clientData: IClient) {
    try {
      // Set Data and convert GB to Bytes
      const data = {
        id: inboundId,
        settings: JSON.stringify({
          clients: [{ ...clientData, totalGB: gbToBytes(clientData.totalGB) }],
        }),
      };
      // form url encode the object
      const encoded = formUrlEncoded(data);
      // post data
      const result = <IResult>(
        (await this.axios.post("/xui/inbound/addClient", encoded)).data
      );
      if (result.success) return { ok: true };
      return { ok: false };
    } catch (e) {
      return { ok: false, msg: e };
    }
  }

  public async updateClient(inboundId: number, uuid: string, data: IClient) {
    try {
      // Fix gb to byte
      const client = this.fixClient(data);
      // Get all inbounds
      const inbounds = await this.getAllInbounds();
      if (!inbounds.data)
        return {
          ok: false,
          msg: "cannot get all inbounds, maybe network error or bad x-ui database",
        };
      // Find specific inbound
      const specificInbound = inbounds.data.find((x) => x.id === inboundId);
      if (!specificInbound) return { ok: false, msg: "inbound not found" };
      // Parse setting as json
      const parsedSetting = <ISetting>JSON.parse(specificInbound?.settings);
      // Find client with the same uuid
      const clientId = parsedSetting.clients.findIndex((x) => x.id === uuid);
      //
      if (clientId === -1)
        return {
          ok: false,
          msg: "Cannot find specific client in that inbound",
        };
      const encodedData = formUrlEncoded({
        id: inboundId,
        settings: JSON.stringify({ clients: [{ ...client }] }),
      });
      const result = <IResult>(
        (
          await this.axios.post(
            `/xui/inbound/updateClient/${clientId}`,
            encodedData
          )
        ).data
      );
      if (!result.success) return { ok: false, msg: "cannot update client" };
      return { ok: true };
    } catch (e) {
      return { ok: false, msg: e };
    }
  }

  public async deleteClient(inboundId: number, uuid: string) {
    try {
      const result = await this.axios.post(
        `/xui/inbound/${inboundId}/delClient/${uuid}`
      );
      if (result.data.success) return { ok: true };
      else return { ok: false, msg: "Unspecific error" };
    } catch (e) {
      return { ok: false, msg: e };
    }
  }

  public async getClient(inboundId: number, uuid: string) {
    try {
      // Get all inbounds
      const inbounds = await this.getAllInbounds();
      if (!inbounds.data)
        return {
          ok: false,
          msg: "cannot get all inbounds, maybe network error or bad x-ui database",
        };
      // Find specific inbound
      const specificInbound = inbounds.data.find((x) => x.id === inboundId);
      if (!specificInbound) return { ok: false, msg: "inbound not found" };
      // Parse setting as json
      const parsedSetting = <ISetting>JSON.parse(specificInbound?.settings);
      // Find client with the same uuid
      const client = parsedSetting.clients.find((x) => x.id === uuid);
      if (!client) return { ok: false, msg: "client not found" };
      return { ok: true, data: client };
    } catch (e) {
      return { ok: false, msg: e };
    }
  }

  public async getClientStatsByUuid(inboundId: number, uuid: string) {
    try {
      // Get all inbounds
      const inbounds = await this.getAllInbounds();
      if (!inbounds.data)
        return {
          ok: false,
          msg: "cannot get all inbounds, maybe network error or bad x-ui database",
        };
      // Find specific inbound
      const specificInbound = inbounds.data.find((x) => x.id === inboundId);
      if (!specificInbound) return { ok: false, msg: "inbound not found" };
      // Parse setting as json
      const parsedSetting = <ISetting>JSON.parse(specificInbound?.settings);
      // Find client with the same uuid
      const client = parsedSetting.clients.find((x) => x.id === uuid);
      if (!client) return { ok: false, msg: "client not found" };
      // Find stats by email
      const stats = specificInbound.clientStats.find(
        (x) => x.email === client.email
      );
      if (!stats) return { ok: false, msg: "client has no statics" };
      return { ok: true, data: stats };
    } catch (e) {
      return { ok: false, msg: e };
    }
  }

  public realityGenerateLink(
    client: IClient,
    host: string,
    port: number,
    pbk: string,
    sni: string,
    sid: string,
    fpi: string
  ) {
    return this.vlessRealityGenerator(client, host, port, pbk, sni, sid, fpi);
  }

  private vlessRealityGenerator(
    client: IClient,
    host: string,
    port: number,
    pbk: string,
    sni: string,
    sid: string,
    fpi: string
  ) {
    return `vless://${client.id}@${host}:${port}?type=tcp&security=reality&fp=${fpi}&pbk=${pbk}&sni=${sni}&sid=${sid}#${this.remark}`;
  }

  public wsGenerateLink(
    client: IClient,
    protocol: Protocol,
    host: string,
    port: number,
    path: string,
    hasTls = false,
    requestHost?: string
  ) {
    if (protocol === Protocol.VLESS)
      return this.vlessWSGenerator(
        client,
        host,
        port,
        path,
        hasTls,
        requestHost
      );
    else
      return this.vmessWSGenerator(
        client,
        host,
        port,
        path,
        hasTls,
        requestHost
      );
  }

  private vlessWSGenerator(
    client: IClient,
    host: string,
    port: number,
    path: string,
    hasTls = false,
    requestHost?: string
  ) {
    return `vless://${client.id}@${host}:${port}?type=ws&path=${path}${
      requestHost ? "&host=" + requestHost : ""
    }#${this.remark}`;
  }

  private vmessWSGenerator(
    client: IClient,
    host: string,
    port: number,
    path: string,
    hasTls = false,
    requestHost?: string
  ) {
    const data: IVmess = {
      v: "2",
      ps: this.remark,
      add: host,
      id: client.id,
      aid: client.alterId,
      net: "ws",
      type: "none",
      host: requestHost ?? "",
      path,
      tls: hasTls ? "tls" : "none",
      port,
      allowInsecure: false,
      alpn: "",
      fp: "",
      sni: "",
    };

    const encoded = Buffer.from(JSON.stringify(data)).toString("base64");
    return `vmess://${encoded}`;
  }

  private fixClient(data: IClient) {
    return {
      ...data,
      totalGB: gbToBytes(data.totalGB),
    };
  }
}

export function gbToBytes(gb: number) {
  return gb * 1024 * 1024 * 1024;
}

function generateRandomString(length: number) {
  return crypto
    .randomBytes(Math.ceil(length / 2))
    .toString("hex") // convert to hexadecimal format
    .slice(0, length); // return the required number of characters
}

export interface IResult {
  success: boolean;
}

export interface IPanelCredentials {
  baseUrl: string;
  username: string;
  password: string;
}

interface IVmess {
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
  protocol: Protocol;
  wsPath: string;
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

export enum Protocol {
  VMESS = "vmess",
  VLESS = "vless",
}

export enum StreamType {
  ws,
  reality,
}
