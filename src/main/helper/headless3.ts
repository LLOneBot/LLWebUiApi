// From Choroncat
import type { BrowserWindowConstructorOptions } from 'electron';
import { app, BrowserWindow } from 'electron';
import { setFlagsFromString } from 'node:v8';
import { runInNewContext } from 'node:vm';
import { DataClass } from './data';
import { WebState, WebStateCode } from '../../common/types';


export const initHeadless3 = () => {
	try {
		setFlagsFromString('--expose_gc');

		const gc = runInNewContext('gc') as () => void;
		setInterval(() => {
			gc();
		}, 5000);

		app.commandLine.appendSwitch('disable-software-rasterizer');
		app.commandLine.appendSwitch('disable-gpu');
		let handleClearWindowsTimer: NodeJS.Timeout | undefined = undefined;
		if (!app.isReady) app.disableHardwareAcceleration();

		const FakeBrowserWindow = new Proxy(BrowserWindow, {
			construct(
				_target: typeof BrowserWindow,
				args: [BrowserWindowConstructorOptions],
			) {
				args[0].width = 3;
				args[0].height = 3;

				const win = new BrowserWindow(...args);

				win.webContents.setFrameRate(1);
				win.webContents.on('paint', ({ preventDefault }) => preventDefault());
				win.setSize = () => { };
				win.setMinimumSize = () => { };
				win.setMaximumSize = () => { };
				win.setPosition = () => { };
				win.show = () => { };

				// headless 4
				if (!args[0].title && !handleClearWindowsTimer) {
					app.removeAllListeners('window-all-closed')
					handleClearWindowsTimer = setInterval(() => {
						if ((DataClass.getInstance().get("WebUiApiState") as WebState).WorkState = WebStateCode.WAIT_LOGIN) return
						setTimeout(() => {
							BrowserWindow.getAllWindows().forEach((v) => {
								v.removeAllListeners()
								// v.close()
								try {
									require('electron').BaseWindow.prototype.destroy.call(v)
								} catch (e) {
									//console.log('headless3: destroy failed: ', e)
								}
							})
						}, 5000)
					}, 5000)
				}

				type BWKeys = Exclude<keyof BrowserWindow, 'id' | 'webContents'>;
				type BWFunctions = BrowserWindow[BWKeys];

				const winOriginMethods = {} as Record<BWKeys, BWFunctions>;
		
				for (const i in win) {
				  const ii = i as BWKeys
		
				  if (typeof win[ii] === 'function') {
					winOriginMethods[ii] = win[ii] as () => void // .bind(win)
		
					win[ii] = ((...args: unknown[]) => {
					  // console.log('[headless3] win called ', ii, args)
					  if (ii === 'isDestroyed') {
						return false
					  }
					  return (
						winOriginMethods[ii] as (...p: unknown[]) => unknown
					  ).apply(win, args)
					}) as never
				  }
				}

				return win;
			},
		});

		type ModuleLoad = (
			request: string,
			parent: unknown,
			isMain: boolean,
		) => object

		const originLoad = require('module')._load as ModuleLoad;

		const newLoad: ModuleLoad = (request, parent, isMain) => {
			if (request === 'electron') {
				return {
					...originLoad(request, parent, isMain),
					BrowserWindow: FakeBrowserWindow,
				};
			}
			return originLoad(request, parent, isMain);
		};

		require('module')._load = newLoad;
	} catch (e) {
		//console.log('headless3: ', e);
	}
};