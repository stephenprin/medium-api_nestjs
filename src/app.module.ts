import { TagModule } from './tag/tag.module';
import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import ormConfig from '../ormConfig';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forRoot(ormConfig), TagModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
