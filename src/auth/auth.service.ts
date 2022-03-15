import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as argon from 'argon2';
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async signup(authDto: AuthDto) {
    try {
      const hash = await argon.hash(authDto.password);

      const user = await this.userService.create({
        email: authDto.email,
        password: hash,
      });
      return { id: user.id, email: user.email };
    } catch (error) {
      throw new HttpException(error.driverError.detail, HttpStatus.BAD_REQUEST);
    }
  }

  async signin(authDto: AuthDto) {
    const findUser = await this.userService.findOneByMail(authDto.email);
    if (!findUser) {
      throw new HttpException('User does not exist.', HttpStatus.NOT_FOUND);
    }

    const checkPass = await argon.verify(findUser.password, authDto.password);
    if (!checkPass) {
      throw new UnauthorizedException();
    }

    return this.singToken(findUser.id, findUser.email);
  }

  async singToken(userId: string, email: string) {
    const payload = {
      sub: userId,
      email: email,
    };

    const secret = this.config.get('JWT_SECRET');

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '1h',
      secret: secret,
    });

    return {
      access_token: token,
      user: email,
    };
  }
}
