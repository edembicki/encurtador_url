import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShortnerUrisModule } from './modules/shortner-uris.module';
import { typeOrmConfig } from './typeorm.config';
import { AuthModule } from './modules/auth.module';
import { UsersModule } from './modules/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    ShortnerUrisModule,
    AuthModule,
    UsersModule
  ]
})
export class AppModule { }
