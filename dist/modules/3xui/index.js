"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IProtocol = exports.Protocol = exports.gbToBytes = exports.X3UI = void 0;
var axios_1 = __importDefault(require("axios"));
var form_urlencoded_1 = __importDefault(require("form-urlencoded"));
var crypto_1 = __importDefault(require("crypto"));
/**
 * Completable with https://github.com/MHSanaei/3x-ui/
 */
var X3UI = /** @class */ (function () {
    function X3UI(credentials, remark) {
        this.panelCredentials = credentials;
        this.axios = axios_1.default.create({
            baseURL: credentials.baseUrl,
        });
        this.remark = remark;
    }
    X3UI.prototype.login = function () {
        return __awaiter(this, void 0, void 0, function () {
            var data, encodedData, loginResult, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        data = {
                            username: this.panelCredentials.username,
                            password: this.panelCredentials.password,
                        };
                        encodedData = (0, form_urlencoded_1.default)(data);
                        return [4 /*yield*/, this.axios.post("/login", encodedData)];
                    case 1:
                        loginResult = _a.sent();
                        // Check The Result Of login
                        if (!loginResult.data.success) {
                            return [2 /*return*/, false];
                        }
                        // Set Cookie For Authentication
                        this.axios.defaults.headers.common["Cookie"] =
                            loginResult.headers["set-cookie"];
                        return [2 /*return*/, true];
                    case 2:
                        e_1 = _a.sent();
                        return [2 /*return*/, false];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    X3UI.prototype.createInbound = function (inboundData) {
        return __awaiter(this, void 0, void 0, function () {
            var port, protocol, _a, remark, setting, streamSettings, inbound, result, e_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        port = inboundData.port, protocol = inboundData.protocol, _a = inboundData.remark, remark = _a === void 0 ? this.remark : _a;
                        setting = {
                            clients: [
                                {
                                    id: crypto_1.default.randomUUID(),
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
                        streamSettings = {
                            network: "ws",
                            security: "none",
                            wsSettings: {
                                acceptProxyProtocol: false,
                                headers: {},
                                path: "/",
                            },
                        };
                        inbound = {
                            enable: true,
                            down: 0,
                            total: 0,
                            up: 0,
                            expiryTime: 0,
                            listen: "",
                            port: port,
                            protocol: protocol,
                            remark: remark,
                            // Stringify setting object
                            settings: JSON.stringify(setting),
                            // Stringify streamSetting object
                            streamSettings: JSON.stringify(streamSettings),
                            sniffing: true,
                        };
                        return [4 /*yield*/, this.axios.post("/xui/inbound/add", (0, form_urlencoded_1.default)(inbound))];
                    case 1:
                        result = ((_b.sent())
                            .data);
                        // Check If Result is success
                        if (result.success)
                            return [2 /*return*/, true];
                        return [2 /*return*/, false];
                    case 2:
                        e_2 = _b.sent();
                        return [2 /*return*/, false];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    X3UI.prototype.getAllInbounds = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.axios.post("/xui/inbound/list")];
                    case 1:
                        result = ((_a.sent()).data);
                        if (!result.success)
                            return [2 /*return*/, { ok: false }];
                        // Return All inbounds
                        return [2 /*return*/, { ok: true, data: result.obj }];
                }
            });
        });
    };
    X3UI.prototype.getInboundIdByPort = function (port) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var inbounds, specificInbound;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.getAllInbounds()];
                    case 1:
                        inbounds = _b.sent();
                        // Return false on error
                        if (!inbounds.ok)
                            return [2 /*return*/, { ok: false }];
                        specificInbound = (_a = inbounds.data) === null || _a === void 0 ? void 0 : _a.find(function (x) { return x.port === port; });
                        // Return false on no specific inbound
                        if (!specificInbound)
                            return [2 /*return*/, { ok: false }];
                        // return Inbound id
                        return [2 /*return*/, { ok: true, data: specificInbound.id }];
                }
            });
        });
    };
    X3UI.prototype.createClient = function (inboundId, clientData) {
        return __awaiter(this, void 0, void 0, function () {
            var data, encoded, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        data = {
                            id: inboundId,
                            settings: JSON.stringify({
                                clients: [__assign(__assign({}, clientData), { totalGB: gbToBytes(clientData.totalGB) })],
                            }),
                        };
                        encoded = (0, form_urlencoded_1.default)(data);
                        return [4 /*yield*/, this.axios.post("/xui/inbound/addClient", encoded)];
                    case 1:
                        result = ((_a.sent()).data);
                        if (result.success)
                            return [2 /*return*/, true];
                        return [2 /*return*/, false];
                }
            });
        });
    };
    X3UI.prototype.updateClient = function (inboundId, uuid, data) {
        return __awaiter(this, void 0, void 0, function () {
            var client, inbounds, specificInbound, parsedSetting, clientId, encodedData, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        client = this.fixClient(data);
                        return [4 /*yield*/, this.getAllInbounds()];
                    case 1:
                        inbounds = _a.sent();
                        if (!inbounds.data)
                            return [2 /*return*/, {
                                    ok: false,
                                    msg: "cannot get all inbounds, maybe network error or bad x-ui database",
                                }];
                        specificInbound = inbounds.data.find(function (x) { return x.id === inboundId; });
                        if (!specificInbound)
                            return [2 /*return*/, { ok: false, msg: "inbound not found" }];
                        parsedSetting = JSON.parse(specificInbound === null || specificInbound === void 0 ? void 0 : specificInbound.settings);
                        clientId = parsedSetting.clients.findIndex(function (x) { return x.id === uuid; });
                        //
                        if (clientId === -1)
                            return [2 /*return*/, { ok: false, msg: "Cannot find specific client in that inbound" }];
                        encodedData = (0, form_urlencoded_1.default)({
                            id: inboundId,
                            settings: JSON.stringify({ clients: [__assign({}, client)] }),
                        });
                        return [4 /*yield*/, this.axios.post("/xui/inbound/updateClient/".concat(clientId), encodedData)];
                    case 2:
                        result = ((_a.sent()).data);
                        if (!result.success)
                            return [2 /*return*/, { ok: false, msg: "cannot update client" }];
                        return [2 /*return*/, { ok: true }];
                }
            });
        });
    };
    X3UI.prototype.deleteClient = function (inboundId, uuid) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var inbounds, specificInbound, parsedSetting, email, clients, encodedData, result;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.getAllInbounds()];
                    case 1:
                        inbounds = _b.sent();
                        if (!inbounds.data)
                            return [2 /*return*/, {
                                    ok: false,
                                    msg: "cannot get all inbounds, maybe network error or bad x-ui database",
                                }];
                        specificInbound = inbounds.data.find(function (x) { return x.id === inboundId; });
                        if (!specificInbound)
                            return [2 /*return*/, { ok: false, msg: "inbound not found" }];
                        parsedSetting = JSON.parse(specificInbound === null || specificInbound === void 0 ? void 0 : specificInbound.settings);
                        email = (_a = parsedSetting.clients.find(function (x) { return x.id === uuid; })) === null || _a === void 0 ? void 0 : _a.email;
                        if (!email)
                            return [2 /*return*/, { ok: false, msg: "Client not found" }];
                        clients = parsedSetting.clients.filter(function (x) { return x.id !== uuid; });
                        encodedData = (0, form_urlencoded_1.default)({
                            id: inboundId,
                            settings: JSON.stringify({ clients: __spreadArray([], clients, true) }),
                        });
                        return [4 /*yield*/, this.axios.post("/xui/inbound/delClient/".concat(email), encodedData)];
                    case 2:
                        result = ((_b.sent())
                            .data);
                        if (!result.success)
                            return [2 /*return*/, false];
                        return [2 /*return*/, true];
                }
            });
        });
    };
    X3UI.prototype.getClientStatsByUuid = function (inboundId, uuid) {
        return __awaiter(this, void 0, void 0, function () {
            var inbounds, specificInbound, parsedSetting, client, stats;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getAllInbounds()];
                    case 1:
                        inbounds = _a.sent();
                        if (!inbounds.data)
                            return [2 /*return*/, {
                                    ok: false,
                                    msg: "cannot get all inbounds, maybe network error or bad x-ui database",
                                }];
                        specificInbound = inbounds.data.find(function (x) { return x.id === inboundId; });
                        if (!specificInbound)
                            return [2 /*return*/, { ok: false, msg: "inbound not found" }];
                        parsedSetting = JSON.parse(specificInbound === null || specificInbound === void 0 ? void 0 : specificInbound.settings);
                        client = parsedSetting.clients.find(function (x) { return x.id === uuid; });
                        if (!client)
                            return [2 /*return*/, { ok: false, msg: "client not found" }];
                        stats = specificInbound.clientStats.find(function (x) { return x.email === client.email; });
                        if (!stats)
                            return [2 /*return*/, { ok: false, msg: "client has no statics" }];
                        return [2 /*return*/, { ok: true, data: stats }];
                }
            });
        });
    };
    X3UI.prototype.generateLink = function (client, protocol, host, port, requestHost) {
        if (protocol === IProtocol.VLESS)
            this.vlessGenerator(client, host, port, requestHost);
        else
            this.vmessGenerator(client, host, port, requestHost);
    };
    X3UI.prototype.vlessGenerator = function (client, host, port, requestHost) {
        return "vless://".concat(client.id, "@").concat(host, ":").concat(port, "?type=ws&path=%2F").concat(requestHost ? "&host=" + requestHost : "", "#").concat(this.remark);
    };
    X3UI.prototype.vmessGenerator = function (client, host, port, requestHost) {
        var data = {
            v: "2",
            ps: this.remark,
            add: host,
            id: client.id,
            aid: client.alterId,
            net: "ws",
            type: "none",
            host: requestHost !== null && requestHost !== void 0 ? requestHost : "",
            path: "/",
            tls: "tls",
            port: port,
            allowInsecure: false,
            alpn: "",
            fp: "",
            sni: "",
        };
        var encoded = Buffer.from(JSON.stringify(data)).toString("base64");
        return "vmess://".concat(encoded);
    };
    X3UI.prototype.fixClient = function (data) {
        return __assign(__assign({}, data), { totalGB: gbToBytes(data.totalGB) });
    };
    return X3UI;
}());
exports.X3UI = X3UI;
function gbToBytes(gb) {
    return gb * 1024 * 1024 * 1024;
}
exports.gbToBytes = gbToBytes;
function generateRandomString(length) {
    return crypto_1.default
        .randomBytes(Math.ceil(length / 2))
        .toString("hex") // convert to hexadecimal format
        .slice(0, length); // return the required number of characters
}
var Protocol;
(function (Protocol) {
    Protocol["Vmess"] = "vmess";
    Protocol["Vless"] = "vless";
})(Protocol = exports.Protocol || (exports.Protocol = {}));
var IProtocol;
(function (IProtocol) {
    IProtocol["VMESS"] = "vmess";
    IProtocol["VLESS"] = "vless";
})(IProtocol = exports.IProtocol || (exports.IProtocol = {}));
