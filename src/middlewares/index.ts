import { NextFunction, Request, Response } from 'express';
import { DatabaseUserInterface } from '../interface/UserInterface';
import User from '../model/User';

export const isAdminProtected = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { user }: any = req;
  if (user) {
    User.findOne(
      { username: user.username },
      (err: Error, doc: DatabaseUserInterface) => {
        if (err) throw err;
        if (doc?.isAdmin) {
          next();
        } else {
          res.send('SOrry, it is admin protected');
        }
      },
    );
  } else {
    res.send('sorry you are not  loggedin');
  }
};
