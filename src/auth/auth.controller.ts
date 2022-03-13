import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signUp(@Body() createAuthDto: AuthDto) {
    return this.authService.signup(createAuthDto);
  }

  @Post('signin')
  signIn(@Body() createAuthDto: AuthDto) {
    return this.authService.signin(createAuthDto);
  }
}
