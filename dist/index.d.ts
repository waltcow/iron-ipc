import * as electron from 'electron';
declare type BaseChannelMap = Record<string, any>;
declare type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends ((k: infer I) => void) ? I : never;
declare type Omit<T, U> = Pick<T, Exclude<keyof T, U>>;
declare type IntersectMethodType<S> = UnionToIntersection<S[keyof S]>;
declare type SendMethodType<ChannelMap extends BaseChannelMap> = IntersectMethodType<{
    [C in keyof ChannelMap]: (ChannelMap[C] extends void ? (channel: C) => void : (channel: C, payload: ChannelMap[C]) => void);
}>;
declare type SendToMethodType<ChannelMap extends BaseChannelMap> = IntersectMethodType<{
    [C in keyof ChannelMap]: (ChannelMap[C] extends void ? (webContentsId: number, channel: C) => void : (webContentsId: number, channel: C, payload: ChannelMap[C]) => void);
}>;
declare type ListenerRegisterType<ChannelMap extends BaseChannelMap> = IntersectMethodType<{
    [C in keyof ChannelMap]: (channel: C, listener: ChannelMap[C] extends void ? (event: electron.Event) => void : (event: electron.Event, payload: ChannelMap[C]) => void) => void;
}>;
declare type RemoveAllListenersSignatures<ChannelMap extends BaseChannelMap> = IntersectMethodType<{
    [C in keyof ChannelMap]: (channel: C) => void;
}>;
declare type StrictIpcModule<ChannelMap extends BaseChannelMap, LooseModule extends electron.EventEmitter> = Omit<LooseModule, 'on' | 'once' | 'removeAllListeners' | 'removeListener'> & {
    on: ListenerRegisterType<ChannelMap>;
    once: ListenerRegisterType<ChannelMap>;
    removeAllListeners: RemoveAllListenersSignatures<ChannelMap>;
    removeListener: ListenerRegisterType<ChannelMap>;
};
export declare type IronIpcRenderer<ChannelMap extends BaseChannelMap> = Omit<StrictIpcModule<ChannelMap, electron.IpcRenderer>, 'send' | 'sendSync' | 'sendTo' | 'sendToHost'> & {
    send: SendMethodType<ChannelMap>;
    sendSync: SendMethodType<ChannelMap>;
    sendTo: SendToMethodType<ChannelMap>;
    sendToHost: SendMethodType<ChannelMap>;
};
export declare type IronIpcMain<ChannelMap extends BaseChannelMap> = StrictIpcModule<ChannelMap, electron.IpcMain>;
export {};
//# sourceMappingURL=index.d.ts.map