// 注入插件
import { onSettingWindowCreated } from './renderer.js';

(async () => {
  const settingView = document.querySelector('#app');
  const FakeElectron = {
    ipcRenderer: {
      invoke: (channel, ...args) => new Promise((res, rej) => {
        console.log('[Electron][IPC][Invoke]', channel, args);
      }),
      send: (channel, ...args) => new Promise((res, rej) => {
        console.log('[Electron][IPC][Send]', channel, args);
      }),
      on: (channel, ...args) => {
        console.log('[Electron][IPC][On]', channel, args);
      }
    },
    contextBridge: {
      exposeInMainWorld: (slug, obj) => {
        window[slug] = { ...obj };
      }
    }
  };
  const FakeRequire = (moduleName) => {
    if (moduleName === 'electron') return FakeElectron;
    else return {};
  }

  window.__FAKE_REQUIRE__ = FakeRequire;

  const PreloadRes = await fetch('./preload.js');
  const PreloadRaw = await PreloadRes.text();
  const PreloadJS = `const require = window.__FAKE_REQUIRE__;${PreloadRaw}`;

  eval(PreloadJS);

  onSettingWindowCreated(settingView);
})();