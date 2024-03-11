import { DATA_DIR } from './utils';
import fs from 'fs';
import path from 'path';

export enum LogLevel { All, Debug, Info, Warn, Error, None };
const LogLevelText = ["ALL", "Debug", "Info", "Warn", "Error", "None"];

class CoreLog {
	private CoreLogLevel: LogLevel = LogLevel.Warn;
	private ConsoleLog: boolean = false;
	public FilePath: string = '';
	static CurrentInstance: CoreLog;
	constructor() {
		this.FilePath = path.resolve(DATA_DIR, 'log-' + this.getTime() + '.txt');
	}
	public static getInstance(): CoreLog {
		if (!CoreLog.CurrentInstance) {
			CoreLog.CurrentInstance = new CoreLog();
			return CoreLog.CurrentInstance;
		}
		return CoreLog.CurrentInstance;
	}
	public pushLog(Level: LogLevel, ...msg: any[]) {
		if (Level < this.CoreLogLevel) {
			return;
		}
		let logMsg = '';
		const currentDateTime = new Date().toLocaleString();
		for (const msgItem of msg) {
			// 判断是否是对象 进行Dump
			if (typeof msgItem === 'object') {
				logMsg += JSON.stringify(msgItem) + ' ';
				continue;
			}
			logMsg += msgItem + ' ';
		}
		const LevelText = LogLevelText[Level]; // 获取LevelInfo等级Text
		if (this.ConsoleLog === true) {
			console.log(`[ WebUiApi ] ${currentDateTime} ${LevelText}: ${logMsg}`); // 仅有Main进程输出std Log
		}
		logMsg = `${currentDateTime} ${LevelText}: ${logMsg}\n\n`;
		fs.appendFileSync(this.FilePath, logMsg);
	}
	public setLevel(Level: LogLevel) {
		this.CoreLogLevel = Level;
	}
	public getLevel() {
		return this.CoreLogLevel;
	}
	public readFile() {
		return fs.readFileSync(this.FilePath, 'utf-8');
	}
	public setConsole(Open: boolean) {
		this.ConsoleLog = Open;
	}
	private getTime() {
		const date = new Date();
		const year = date.getFullYear();
		const month = date.getMonth() + 1;
		const day = date.getDate();
		const currentDate = `${year}-${month}-${day}`;
		return currentDate;
	}
}
// 仅Main使用
export { CoreLog };