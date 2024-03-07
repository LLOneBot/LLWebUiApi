import { Server as SocketClass } from 'net';
import { ServerAdapterCallback, ServerConfig } from '../../common/types';
import { ServerAdapter, defaultServerAdapterCallback } from './adapter';
/**
 * @description Api接口SOCK实现类
 */
export class SocketAdapter implements ServerAdapter {
	private app: SocketClass;
	public CurrentConfig: ServerConfig;
	private DataCallBack: ServerAdapterCallback = defaultServerAdapterCallback;
	constructor(Config: ServerConfig) {
		this.CurrentConfig = Config;
		this.app = new SocketClass();
	}
	public setCallBack(Callback: ServerAdapterCallback) {
		this.DataCallBack = Callback;
	}
	public onListening() {
		this.app.listen(this.CurrentConfig.Port,this.onListening);
		this.DataCallBack('listeing','callback');
	}
	public setConfig() {

	}
	public getConfig() {

	}
}