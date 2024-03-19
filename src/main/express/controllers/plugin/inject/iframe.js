; 'use strict';

(() => { // <setting-option>
const OptionTemplate = document.createElement('template');
OptionTemplate.innerHTML = `<li part="parent">
  <span part="text"><slot></slot></span>
  <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" part="check-icon">
    <path d="M2 7L6.00001 11L14 3" stroke="currentColor" stroke-linejoin="round"></path>
  </svg>
</li>`;

window.customElements.define('setting-option', class extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.append(OptionTemplate.content.cloneNode(true));
  }
});
})();

(() => { // <setting-select>
const SelectTemplate = document.createElement('template');
SelectTemplate.innerHTML = `<style>
  .hidden { display: none !important; }
</style>
<div part="parent">
  <div part="button">
    <input type="text" placeholder="请选择" part="current-text" />
    <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" part="button-arrow">
      <path d="M12 6.0001L8.00004 10L4 6" stroke="currentColor" stroke-linejoin="round"></path>
    </svg>
  </div>
  <ul class="hidden" part="option-list"><slot></slot></ul>
</div>`;

window.customElements.define('setting-select', class extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.append(SelectTemplate.content.cloneNode(true));

    this._button = this.shadowRoot.querySelector('div[part="button"]');
    this._text = this.shadowRoot.querySelector('input[part="current-text"]');
    this._context = this.shadowRoot.querySelector('ul[part="option-list"]');

    const buttonClick = () => {
      const isHidden = this._context.classList.toggle('hidden');
      window[`${isHidden ? 'remove': 'add'}EventListener`]('pointerdown', windowPointerDown);
    };

    const windowPointerDown = ({ target }) => {
      if (!this.contains(target)) buttonClick();
    };

    this._button.addEventListener('click', buttonClick);
    this._context.addEventListener('click', ({ target }) => {
      if (target.tagName !== 'SETTING-OPTION') return;
      buttonClick();

      if (target.hasAttribute('is-selected')) return;

      this.querySelectorAll('setting-option[is-selected]').forEach(dom => dom.toggleAttribute('is-selected'));
      target.toggleAttribute('is-selected');

      this._text.value = target.innerText;
      this.dispatchEvent(new CustomEvent('selected', {
        bubbles: true,
        composed: true,
        detail: {
          name: target.innerText,
          value: target.dataset.value,
        },
      }));
    });

    this._text.value = this.querySelector('setting-option[is-selected]').innerText;
  }
});
})();

(() => {
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
      sendSync: (channel, ...args) => {
        console.log('[Electron][IPC][SendSync]', channel, args);
        return ipcWs.sendSync(channel, ...args);
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
  };
  window.__FAKE_REQUIRE__ = FakeRequire;

  const parseLocalScheme = (url, pluginPath) => {
    if (url.indexOf('local:///') !== 0) return url;
    let result = url.replace('local:///', '');
    result = result.replace(pluginPath, document.baseURI);
    return result;
  };

  const loadPlugin = async (pluginSlug) => {
    const { manifest: pluginMeta, path: originPath } = LiteLoader.plugins[pluginSlug];

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
    const settingView = document.createElement('div');
    settingView.id = 'app';
    settingView.classList.add('liteloader', 'tab-view', pluginSlug);
    await onSettingWindowCreated(settingView);
    // Add divider
    settingView.querySelectorAll('setting-list').forEach((dom) => {
      const children = [ ...dom.children ];
      for (let i = 1; i < children.length; i++) {
        const child = children[i];
        if (child.tagName === 'SETTING-DIVIDER') continue;
        const divider = document.createElement('setting-divider');
        dom.insertBefore(divider, child);
      }
    });
    document.body.appendChild(settingView);

    document.querySelectorAll('.fake-bar.nav-bar.liteloader .nav-item.liteloader').forEach(dom => {
      if (dom.dataset.pluginSlug === pluginSlug) {
        dom.dispatchEvent(new CustomEvent('click'));
      }
    });
  }

  window._LOAD_PLUGIN_ = loadPlugin;
})();
