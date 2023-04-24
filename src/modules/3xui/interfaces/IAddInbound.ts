import { Protocol } from "..";
import { ISetting, IStreamSetting } from "./ISetting";

export interface IAddInbound {
  up: number;
  down: number;
  total: number;
  remark: string;
  enable: boolean;
  expiryTime: number;
  listen: string;
  port: number;
  protocol: Protocol;
  settings: string;
  streamSettings: string;
  sniffing: boolean;
}

export interface IAddClient {
  id: string;
  settings: ISetting;
}
