import { contextBridge, ipcRenderer } from 'electron';
import { CHANNE_CORE_LOG, CHANNEL_LOGIN_QRCODE } from './common/channels';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
ipcRenderer.on(CHANNEL_LOGIN_QRCODE, (_event, _arg) => {
});
const LLWebUiApi = {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	pushLog: (data: any) => {
		ipcRenderer.send(CHANNE_CORE_LOG, data);
	},
	LoginQrCode: (data:string) => {
		return ipcRenderer.send(CHANNEL_LOGIN_QRCODE,data);
	},
	FlushQrCode: ()=>{}
};
export type LLWebUiApiType = typeof LLWebUiApi;

// 在window对象下导出只读对象
contextBridge.exposeInMainWorld('LLWebUiApi', LLWebUiApi);