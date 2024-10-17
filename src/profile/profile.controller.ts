import { User } from '@app/decorators/user.decorator';
import { Controller, Get, Param } from '@nestjs/common';
import { IProfileInterface } from './types/profileResponse.innterface';
import { ProfileService } from './profile.service';

@Controller('profile')
export class ProfileController {

    constructor(private readonly profileService: ProfileService) {}
  @Get(':username')
  async getProfile(
    @User('id') currentId: number,
    @Param('username') profileUsername: string,
  ): Promise<IProfileInterface> {
      
      const profile = await this.profileService.getProfile(profileUsername);
  }
}
