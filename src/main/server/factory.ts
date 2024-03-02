import { ServerConfig } from '../../common/types';
import { ServerAdapter } from './adapter';
import { HttpAdapter } from './http';
import { WebSocketAdapter } from './ws';
import { SocketAdapter } from './sock';
/**
 * @description 工厂类 生成对应Api接口提供类
 */
export class ServerFactory {
	static getServer(AdapterName: string, Config: ServerConfig): ServerAdapter {
		if (AdapterName === 'HTTP') {
			return new HttpAdapter(Config);
		}
		else if (AdapterName === 'WS') {
			return new WebSocketAdapter(Config);
		} else if (AdapterName === 'SOCK') {
			return new SocketAdapter(Config);
		}
		return new HttpAdapter(Config);
		
	}
}