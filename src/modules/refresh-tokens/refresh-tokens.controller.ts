import { Body, Controller, Post } from '@nestjs/common';
import { RefreshTokensService } from './refresh-tokens.service';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@Controller('refresh-tokens')
export class RefreshTokensController {
  constructor(private readonly refreshTokensService: RefreshTokensService) {}

  @Post('refresh')
  refreshTokens(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.refreshTokensService.refreshTokens(
      refreshTokenDto.refreshToken,
    );
  }
}
