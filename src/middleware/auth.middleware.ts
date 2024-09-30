import { JWT_SECRET_KEY } from '@app/config/config';
import { ExpressRequest } from '@app/types/expressRequest.interface';
import { UserService } from '@app/user/user.service';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService) {}
  async use(req: ExpressRequest, _: Response, next: NextFunction) {
    if (!req.headers.authorization) {
      req.user = null;
      next();
      return;
    }
    const token = req.headers.authorization.split(' ')[1];
    try {
      const decode = verify(token, JWT_SECRET_KEY) as {
        id: number;
        email: string;
        username: string;
      };
      const user = await this.userService.findUserById(decode.id);

      req.user = user;
      next();
    } catch (error) {
      req.user = null;
      next();
    }
  }
}
