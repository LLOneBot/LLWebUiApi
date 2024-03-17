; 'use strict';

(() => {
  const parseLocalScheme = (url, pluginPath) => {
    if (url.indexOf('local:///') !== 0) return url;
    let result = url.replace('local:///', '');
    result = result.replace(pluginPath, document.baseURI);
    return result;
  };

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
        on: (channel, listener) => {
          console.log('[Electron][IPC][On]', channel, listener);
          return ipcWs.on(channel, listener);
        },
        off: (channel, listener) => {
          console.log('[Electron][IPC][Off]', channel, listener);
          return ipcWs.off(channel, listener);
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
      else return import(moduleName);
    }
    window.__FAKE_REQUIRE__ = FakeRequire;

    // Hook fetch
    const RealFetch = window.fetch;
    const FakeFetch = (...args) => {
      const [originUrl, originConfig = {}, ...originArgs] = args;

      if (originUrl.indexOf('local:///') === 0) {
        return RealFetch(parseLocalScheme(originUrl, originPath.plugin), originConfig, ...originArgs);
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

    // MutationObserver Html
    const observer = new MutationObserver((mutationsList) => {
      for (const mutation of mutationsList) {
        if (mutation.type !== 'childList' || !mutation.addedNodes) return;
        mutation.addedNodes.forEach((item) => {
          if (
            (!item.href || item.href.indexOf('local:///') !== 0) &&
            (!item.src || item.src.indexOf('local:///') !== 0)
          ) return;

          if (item.href) item.href = parseLocalScheme(item.href, originPath.plugin);
          if (item.src) item.src = parseLocalScheme(item.src, originPath.plugin);
        });
      }
    });
    observer.observe(document.documentElement, {
      attributes: true,
      childList: true,
      subtree: true,
    });

    document.title = pluginMeta.name + ' - Plugin iframe';

    // Load preload.js
    const PreloadRes = await fetch(document.baseURI + pluginMeta.injects.preload);
    const PreloadRaw = await PreloadRes.text();
    const PreloadJS = `;const require = window.__FAKE_REQUIRE__;${PreloadRaw}`;
    eval(PreloadJS);

    // Load renderer.js
    const { onSettingWindowCreated } = await import(document.baseURI + pluginMeta.injects.renderer);
    const settingView = document.querySelector('#app');
    settingView.classList.add('liteloader', 'tab-view', pluginSlug);
    await onSettingWindowCreated(settingView);

    document.querySelectorAll('.fake-bar.nav-bar.liteloader .nav-item.liteloader').forEach(dom => {
      if (dom.dataset.pluginSlug === pluginSlug) {
        dom.dispatchEvent(new CustomEvent('click'));
      }
    });
  }

  window._LOAD_PLUGIN_ = loadPlugin;
})();
