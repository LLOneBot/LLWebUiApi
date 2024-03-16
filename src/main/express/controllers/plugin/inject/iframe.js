; 'use strict';

(() => {
  const loadPlugin = async (pluginSlug) => {
    const pluginMeta = LiteLoader.plugins[pluginSlug].manifest;
    const ipcWs = new IPCWebSocket();
    const FakeElectron = {
      ipcRenderer: {
        invoke: (channel, ...args) => {
          console.log('[Electron][IPC][Invoke]', channel, args);
          return ipcWs.invoke(channel, ...args);
        },
        send: (channel, ...args) => {
          console.log('[Electron][IPC][Send]', channel, args);
          return ipcWs.send(channel, ...args);
        },
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
    const RealFetch = window.fetch;
    const FakeFetch = async function (...args) {
      if (args.length > 0) {
        if (args[0].substr(0, 9) === "local:///") {
          // 重写地址
          console.log("[Electron][Fetch][Rewrite]", args[0]);
        }
      }
      return RealFetch(...args);
    }
    window.fetch = FakeFetch;
    window.__FAKE_REQUIRE__ = FakeRequire;

    document.title = pluginMeta.name + ' - Plugin iframe';

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
