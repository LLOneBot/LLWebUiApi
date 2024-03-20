import * as jwt from 'jsonwebtoken';
import { RequestHandler } from 'express';
import { CoreConfig } from '@/main/helper/config';

const isEmpty = (data: any) => data === undefined || data === null || data === '';

export const Login: RequestHandler = (req, res) => {
  const { username, password, remember } = req.body;

  if (isEmpty(username) || isEmpty(password)) {
    return res.status(400)
      .json({
        msg: 'Username or password is not specific',
      });
  }
  let config = CoreConfig.getInstance().get().Server;
  if (username !== config.Username || password !== config.Password) {  // XXX: Change it before release
    return res.status(400)
      .json({
        msg: 'Incorrect username or password',
      });
  }

  res.json({
    msg: 'ok',
    data: {
      token: jwt.sign(
        {
          admin: true,
        },
        '1145141919810', // XXX: Change it before release
        {
          expiresIn: 3600 * 24 * (remember ? 7 : 1),
        }
      ),
    },
  });
}