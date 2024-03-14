import * as Utils from '@/main/helper/utils';

export const GetInfo = (req, res) => {
  const { pluginMeta } = res.locals;
  res.json({
    msg: 'ok',
    data: pluginMeta,
  });
}