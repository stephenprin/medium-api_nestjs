import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from '@app/dto/createUser.dto';
import { UserResponseInterface } from '@app/types/userResponse.interface';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('user/create')
  async createUser(
    @Body('user') createUserDto: CreateUserDto,
  ): Promise<UserResponseInterface> {
    const user = await this.userService.createUser(createUserDto);
    return this.userService.buildUserResponse(user);
  }
}