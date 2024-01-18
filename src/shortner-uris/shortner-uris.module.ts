import { Module } from '@nestjs/common';
import { ShortnerUrisService } from './shortner-uris.service';
import { ShortnerUrisController } from './shortner-uris.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShortnerUrisRepository } from './shortner-uris.repository';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ShortnerUrisRepository]),
    AuthModule,
    UsersModule
  ],
  providers: [ShortnerUrisService],
  controllers: [ShortnerUrisController]
})
export class ShortnerUrisModule { }
