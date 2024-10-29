import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { ProfileType } from './types/profile.types';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '@app/user/user.entity';
import { Repository } from 'typeorm';
import { IProfileInterface } from './types/profileResponse.innterface';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}
  async getProfile(
    currentId: number,
    profileUsername: string,
  ): Promise<ProfileType> {
    const user = await this.userRepository.findOne({
      where: {
        username: profileUsername,
      },
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return { ...user, following: false };
  }
  buildProfileResponse(profile: ProfileType): IProfileInterface {
    delete profile.email;
    return { profile };
  }
}
