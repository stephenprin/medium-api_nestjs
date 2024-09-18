import { Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('user/create')
  async createUser(): Promise<any> {
    return await this.userService.createUser();
  }
}
