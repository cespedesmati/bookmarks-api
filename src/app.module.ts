import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost', //process.env.POSTGRES_HOST, //como esta con docker tiene que ser el container_name de la db
      port: 5432,
      username: 'admin', //process.env.POSTGRES_USER,
      password: 'secret', //process.env.POSTGRES_PASSWORD,
      database: 'nestbookmarks', //process.env.POSTGRES_DB,
      autoLoadEntities: true,
      synchronize: true,
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    UserModule,
    BookmarkModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
