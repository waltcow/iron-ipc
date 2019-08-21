## iron-ipc

 Module for type-safe inter process communication (IPC) in electron.

## Usage



```ts

// shared/ipc.ts

import * as electron from 'electron';
import { IronIpcMain, IronIpcRenderer } from 'iron-ipc';

export const enum Channel {
    addTodos: "addTodos";
    removeTodos: "removeTodos";
}

interface IpcChannelMap {
  [Channel.addTodos]: {
      id: number,
      title: string,
      content: string
  };
  [Channel.removeTodos]: number
}

const ipcRenderer: IronIpcRenderer<IpcChannelMap> = electron.ipcRenderer;
const ipcMain: IronIpcMain<IpcChannelMap> = electron.ipcMain;

export { ipcMain, ipcRenderer };

...

import { ipcMain, Channel } from "shard/ipc"

ipcMain.on(Channel.addTodos, (event, payload) => {
    let title = payload.title
    ...
});


```
