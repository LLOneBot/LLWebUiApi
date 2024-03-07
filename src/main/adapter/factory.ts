import { ServerConfig } from '../../common/types';
import { ServerAdapter } from './adapter';
import { HttpAdapter } from './http';
/**
 * @description 工厂类 生成对应Api接口提供类
 */
export class ServerFactory {
	static getServer(AdapterName: string, Config: ServerConfig): ServerAdapter {
		if (AdapterName === 'HTTP') {
			return new HttpAdapter(Config);
		}
		// 未实现 先实现 HTTP再说
		/**else if (AdapterName === 'WS') {
			return new WebSocketAdapter(Config);
		} else if (AdapterName === 'SOCK') {
			return new SocketAdapter(Config);
		}
		*/
		return new HttpAdapter(Config);
		
	}
}