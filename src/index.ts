import * as electron from 'electron';

type BaseChannelMap = Record<string, any>

type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends ((k: infer I) => void) ? I : never;

type Omit<T, U> = Pick<T, Exclude<keyof T, U>>;

type IntersectMethodType<S> = UnionToIntersection<S[keyof S]>;

type SendMethodType<ChannelMap extends BaseChannelMap> = IntersectMethodType<{
    [C in keyof ChannelMap]: (
    ChannelMap[C] extends void ?
    (channel: C) => void :
    (channel: C, payload: ChannelMap[C]) => void
)}>;

type SendToMethodType<ChannelMap extends BaseChannelMap> = IntersectMethodType<{
    [C in keyof ChannelMap]: (
    ChannelMap[C] extends void ?
    (webContentsId: number, channel: C) => void :
    (webContentsId: number, channel: C, payload: ChannelMap[C]) => void
)}>;

type ListenerRegisterType<ChannelMap extends BaseChannelMap> = IntersectMethodType<{
    [C in keyof ChannelMap]: (
    channel: C,
    listener: ChannelMap[C] extends void ?
    (event: electron.Event) => void :
    (event: electron.Event, payload: ChannelMap[C]) => void
) => void }>;

type RemoveAllListenersSignatures<ChannelMap extends BaseChannelMap> = IntersectMethodType<{
    [C in keyof ChannelMap]: (channel: C) => void
}>;

type StrictIpcModule<ChannelMap extends BaseChannelMap, LooseModule extends electron.EventEmitter> =
    Omit<LooseModule, 'on' | 'once' | 'removeAllListeners' | 'removeListener'> & {
    on: ListenerRegisterType<ChannelMap>;
    once: ListenerRegisterType<ChannelMap>;
    removeAllListeners: RemoveAllListenersSignatures<ChannelMap>;
    removeListener: ListenerRegisterType<ChannelMap>;
};

export type IronIpcRenderer<ChannelMap extends BaseChannelMap> = Omit<
    StrictIpcModule<ChannelMap, electron.IpcRenderer>,
    'send' | 'sendSync' | 'sendTo' | 'sendToHost'
    > & {
    send: SendMethodType<ChannelMap>;
    sendSync: SendMethodType<ChannelMap>;
    sendTo: SendToMethodType<ChannelMap>;
    sendToHost: SendMethodType<ChannelMap>;
};

export type IronIpcMain<ChannelMap extends BaseChannelMap> = StrictIpcModule<ChannelMap, electron.IpcMain>;
