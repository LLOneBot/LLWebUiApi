; 'use strict';

(() => {
  const loadPlugin = async (pluginSlug) => {
    const { manifest: pluginMeta, path: originPath } = LiteLoader.plugins[pluginSlug];
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
    window.__FAKE_REQUIRE__ = FakeRequire;

    // Hook fetch
    const RealFetch = window.fetch; 
    const FakeFetch = (...args) => {
      const [ originUrl, originConfig = {}, ...originArgs ] = args;

      if (originUrl.indexOf('local:///') === 0) {
        let newUrl = originUrl.replace('local:///', '');
        newUrl = newUrl.replace(originPath.plugin, document.baseURI);
        return RealFetch(newUrl, originConfig, ...originArgs);
      }

      if (originUrl.indexOf(window.location.origin) !== 0) {
        return RealFetch(
          `${window.location.origin}/plugin/${pluginSlug}/proxy/`,
          {
            ...originConfig,
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              url: originUrl,
            }),
          }
        );
      }

      return RealFetch(originUrl, originConfig, ...originArgs);
    }
    window.fetch = FakeFetch;

    document.title = pluginMeta.name + ' - Plugin iframe';

    // Load preload.js
    const PreloadRes = await fetch(document.baseURI + pluginMeta.injects.preload);
    const PreloadRaw = await PreloadRes.text();
    const PreloadJS = `;const require = window.__FAKE_REQUIRE__;${PreloadRaw}`;
    eval(PreloadJS);

    // Load renderer.js
    const { onSettingWindowCreated } = await import(document.baseURI + pluginMeta.injects.renderer);
    const settingView = document.querySelector('#app');
    await onSettingWindowCreated(settingView);

    document.querySelectorAll('.fake-bar.nav-bar.liteloader .nav-item.liteloader').forEach(dom => {
      if (dom.dataset.pluginSlug === pluginSlug) {
        dom.dispatchEvent(new CustomEvent('click'));
      }
    });
  }

  window._LOAD_PLUGIN_ = loadPlugin;
})();
