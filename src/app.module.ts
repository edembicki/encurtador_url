import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShortnerUrisModule } from './shortner-uris/shortner-uris.module';
import { typeOrmConfig } from './typeorm.config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    ShortnerUrisModule,
    AuthModule,
    UsersModule
  ]
})
export class AppModule { }
