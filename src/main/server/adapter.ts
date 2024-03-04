import { type ServerAdapterCallback, type ServerConfig } from '../../common/types';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function defaultServerAdapterCallback(ActionName: string, ArgData: string): string {
	console.log(ActionName, ArgData);
	return JSON.stringify({ code: 200, data: [] });
}

/**
* @description 外部Api接口抽象类
*/
export abstract class ServerAdapter {
	public CurrentConfig: ServerConfig | undefined = undefined;
	/**
	 * @description 初始化配置
	 */
	constructor() { }
	/**
	 * @description 注册数据处理回调函数
	 */
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	public setCallBack(_Callback: ServerAdapterCallback) { }
	/**
	 * @description 启动服务器
	 */
	public onListening() { }
	/**
	 * @description 重新设定配置属性
	 */
	public setConfig() { }
	/**
	  * @description 获取配置属性
	  */
	public getConfig() { }

}