import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RefreshToken } from './entites/refresh-token.entity';
import { MoreThanOrEqual, Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class RefreshTokensService {
  constructor(
    @InjectRepository(RefreshToken)
    private refreshTokensRepository: Repository<RefreshToken>,
    private jwtService: JwtService,
  ) {}

  async findOne(token: string) {
    return this.refreshTokensRepository.findOne({
      where: {
        token,
        expiryDate: MoreThanOrEqual(new Date()),
      },
    });
  }

  async create(token: string, userId: string) {
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 3);
    return this.refreshTokensRepository.save({
      token,
      expiryDate,
      user: { id: userId },
    });
  }

  async refreshTokens(refreshToken: string) {
    const token = await this.refreshTokensRepository.findOne({
      where: {
        token: refreshToken,
        expiryDate: MoreThanOrEqual(new Date()),
      },
    });

    if (!token) {
      throw new UnauthorizedException('Refresh token is invalid');
    }
    console.log({ token });
    return this.generateUserTokens(token.user.id);
  }

  async generateUserTokens(userId: string) {
    const accessToken = this.jwtService.sign({ userId }, { expiresIn: '7d' });
    const refreshToken = uuidv4();

    await this.create(refreshToken, userId);
    return { accessToken, refreshToken };
  }
}
