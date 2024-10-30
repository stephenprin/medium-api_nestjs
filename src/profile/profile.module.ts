import { FollowEntity } from './profile.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthGuard } from '@app/guards/auth.guard';
import { UserEntity } from '@app/user/user.entity';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, FollowEntity])],
  controllers: [ProfileController],
  providers: [ProfileService, AuthGuard],
  exports: [],
})
export class ProfileModule {}
