import { ServerConfig } from "../../common/types";
/**
* @description 外部Api接口抽象类
*/
export abstract class ServerAdapter {
	public CurrentConfig: ServerConfig | undefined = undefined;

	constructor() { }

	public setCallBack(_Callback: any) { }

	public onListening() { }

	public setConfig() { }

	public getConfig() { }
}