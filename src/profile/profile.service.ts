import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { ProfileType } from './types/profile.types';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '@app/user/user.entity';
import { Repository } from 'typeorm';
import { IProfileInterface } from './types/profileResponse.innterface';
import { FollowEntity } from './profile.entity';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(FollowEntity)
    private readonly followRepository: Repository<FollowEntity>,
  ) {}
  async getProfile(
    currentUserId: number,
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

  async followProfile(
    currentUserId: number,
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
    if (currentUserId === user.id) {
      throw new HttpException(
        'Follower and following cannot be equal',
        HttpStatus.BAD_REQUEST,
      );
    }
    const follow = await this.followRepository.findOne({
      where: {
        followerId: currentUserId,
        followingId: user.id,
      },
    });

    if (!follow) {
      const createFollow = new FollowEntity();
      createFollow.followerId = currentUserId;
      createFollow.followingId = user.id;
      await this.followRepository.save(createFollow);
    }

    return { ...user, following: true };
  }

  buildProfileResponse(profile: ProfileType): IProfileInterface {
    delete profile.email;
    return { profile };
  }
}
