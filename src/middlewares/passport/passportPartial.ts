import { Request, Response, NextFunction } from 'express';
import passport from './passport';

function isUser(user: unknown): user is Express.User {
  return user instanceof Object;
}

export function authenticatePartial(strategyName: string) {
  return (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate(
      strategyName,
      { session: false },
      (
        _err: any,
        user?: Express.User | false | null,
        _info?: object | string | Array<string | undefined>,
      ) => {
        if (isUser(user)) {
          req.user = user;
        }
        next();
      },
    )(req, res, next);
  };
}
