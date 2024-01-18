import { Module } from '@nestjs/common';
import { ShortnerUrisService } from '../services/shortner-uris.service';
import { ShortnerUrisController } from '../controllers/shortner-uris.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShortnerUrisRepository } from '../repositories/shortner-uris.repository';
import { AuthModule } from '../modules/auth.module';
import { UsersModule } from '../modules/users.module';

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
