import { contextBridge, ipcRenderer } from 'electron';
import { CHANNE_CORE_LOG } from './common/channels';

const LLWebUiApi = {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	pushLog: (data: any) => {
		ipcRenderer.send(CHANNE_CORE_LOG, data);
	},
	version: '1.0.0'
};
export type LLWebUiApiType = typeof LLWebUiApi;

// 在window对象下导出只读对象
contextBridge.exposeInMainWorld('LLWebUiApi', LLWebUiApi);