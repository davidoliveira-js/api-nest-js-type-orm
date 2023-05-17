import {
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  UseGuards,
  Request,
  Body,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { Public } from 'src/decorators/public.decorator';
import { RefreshTokenAuthGuard } from './refresh-token.auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(RefreshTokenAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('logout')
  async signOut(
    @Request() req,
    @Body() data: { refreshToken: string }
  ) {
    return await this.authService.logout(req, data.refreshToken);
  }
}
