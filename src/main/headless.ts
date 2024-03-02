/* eslint-disable no-mixed-spaces-and-tabs */
import type { BrowserWindowConstructorOptions } from 'electron';
import { app, BrowserWindow } from 'electron';
import { setFlagsFromString } from 'node:v8';
import { runInNewContext } from 'node:vm';


export const initHeadless3 = () => {
	try {
		setFlagsFromString('--expose_gc');

		const gc = runInNewContext('gc') as () => void;

		setInterval(() => {
			gc();
		}, 5000);

		app.commandLine.appendSwitch('disable-software-rasterizer');
		app.commandLine.appendSwitch('disable-gpu');

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
				win.setSize = () => {};
				win.setMinimumSize = () => {};
				win.setMaximumSize = () => {};
				win.setPosition = () => {};
				win.show = () => {};
				return win;
			},
		});

    type ModuleLoad = (
      request: string,
      parent: unknown,
      isMain: boolean,
    ) => object

    // eslint-disable-next-line @typescript-eslint/no-var-requires, @typescript-eslint/no-unsafe-member-access
    const originLoad = require('module')._load as ModuleLoad;

    const newLoad: ModuleLoad = (request, parent, isMain) => {
    	console.log(request);
    	if (request === 'electron') {
    		return {
    			...originLoad(request, parent, isMain),
    			BrowserWindow: FakeBrowserWindow,
    		};
    	}
    	return originLoad(request, parent, isMain);
    };

    // eslint-disable-next-line @typescript-eslint/no-var-requires, @typescript-eslint/no-unsafe-member-access
    require('module')._load = newLoad;
	} catch (e) {
		console.log('headless3: ', e);
	}
};