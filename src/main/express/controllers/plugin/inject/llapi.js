;window.LiteLoader={ LLDATA };
window.LiteLoader.api = {
  openPath(path) {
    console.log('[LiteLoader][OpenPath]', path);
  },
  openExternal(uri) {
    console.log('[LiteLoader][OpenExternal]', uri);
    window.open(uri, '_blank');
  },
  disablePlugin(slug) {
    console.log('[LiteLoader][DisablePlugin]', uri);
  },

  config: {
    get(slug, defaultConfig = {}) {
      console.log('[LiteLoader][Config][Get]', slug, defaultConfig);
      return new Promise(async (_res, _rej) => {
        const res = await axios({
          method: 'GET',
          url: `/plugin/${slug}/config`,
        });
        const resBody = res.data;

        if (res.status !== 200 || resBody.msg !== 'ok') {
          return _rej(resBody);
        }

        const result = { ...defaultConfig, ...resBody.data };
        _res(result);
      });
    },
    set(slug, newConfig) {
      console.log('[LiteLoader][Config][Set]', slug, newConfig);
      return new Promise(async (_res, _rej) => {
        const res = await axios({
          method: 'POST',
          url: `/plugin/${slug}/config`,
          data: newConfig,
        });
        const resBody = res.data;

        if (res.status !== 200 || resBody.msg !== 'ok') {
          return _rej(resBody);
        }

        _res();
      });
    },
  }
};

window.addEventListener('load', () => { // For some plugin
  const navbarDom = document.createElement('div');
  navbarDom.classList.add('fake-bar', 'nav-bar', 'liteloader');

  for (const slug in LiteLoader.plugins) {
    const {
      disabled,
      manifest: {
        name,
        injects: {
          renderer
        }
      }
    } = LiteLoader.plugins[slug];
    if (disabled || !renderer) continue;

    const navItemDom = document.createElement('div');
    navItemDom.classList.add('nav-item', 'liteloader');
    navItemDom.dataset.pluginSlug = slug;

    const navItemIconDom = document.createElement('i');
    navItemIconDom.classList.add('q-icon', 'icon');

    const navItemLabelDom = document.createElement('div');
    navItemLabelDom.classList.add('name');
    navItemLabelDom.innerHTML = name;

    navItemDom.appendChild(navItemIconDom);
    navItemDom.appendChild(navItemLabelDom);

    navbarDom.appendChild(navItemDom);
  }

  document.body.appendChild(navbarDom);
});