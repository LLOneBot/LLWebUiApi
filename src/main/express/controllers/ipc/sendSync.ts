import { ipcMain } from 'electron';
import { RequestHandler } from 'express';

export const IPCSendSyncHandler: RequestHandler = (req, res) => {
  const { channel, params = [] } = req.body;

  if (!channel || channel == '') {
    return res.status(400)
      .json({
        msg: 'No channel provided',
      });
  }

  ipcMain.once(channel, (event) => {
    const { returnValue } = event;

    res.json({
      msg: 'ok',
      data: returnValue,
    });
  });
  ipcMain.emit(
    channel,
    {},
    [ ...params ]
  );
};