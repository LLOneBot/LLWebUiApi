import { WebSocketServer as WebSocketClass } from 'ws';
import { ServerAdapterCallback, ServerConfig } from '../../common/types';
import { ServerAdapter, defaultServerAdapterCallback } from './adapter';
/**
 * @description Api接口WS实现类
 */
export class WebSocketAdapter implements ServerAdapter {
	private app: WebSocketClass|undefined ;
	public CurrentConfig: ServerConfig;
	private DataCallBack: ServerAdapterCallback = defaultServerAdapterCallback;
	constructor(Config: ServerConfig) {
		this.CurrentConfig = Config;
	}
	public setCallBack(Callback: ServerAdapterCallback) {
		this.DataCallBack = Callback;
	}
	public onListening() {
		this.app = new WebSocketClass({port:this.CurrentConfig.Port});
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		this.app.on('connection', (_wsClient, _req)=>{});
		this.DataCallBack('listeing','callback');
	}
	public setConfig() {

	}
	public getConfig() {

	}
}