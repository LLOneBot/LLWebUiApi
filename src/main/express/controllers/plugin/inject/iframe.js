;'use strict';

(() => {
  const loadPlugin = async (pluginSlug) => {
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

    // Load preload.js
    const PreloadRes = await fetch(`/plugin/${pluginSlug}/preload.js`);
    const PreloadRaw = await PreloadRes.text();
    const PreloadJS = `;const require = window.__FAKE_REQUIRE__;${PreloadRaw}`;
    eval(PreloadJS);

    // Load renderer.js
    const { onSettingWindowCreated } = await import(`/plugin/${pluginSlug}/renderer.js`);
    const settingView = document.querySelector('#app');
    onSettingWindowCreated(settingView);
  }

  window._LOAD_PLUGIN_ = loadPlugin;
})();
