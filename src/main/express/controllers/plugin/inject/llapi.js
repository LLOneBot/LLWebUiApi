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