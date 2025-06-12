import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { RefreshTokensService } from '../refresh-tokens/refresh-tokens.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private refreshTokensService: RefreshTokensService,
  ) {}

  async signup(signupData: SignupDto) {
    const { email, password } = signupData;
    //check if user already exists
    const user = await this.usersService.findOne(email);
    if (user) {
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'User already exists',
          error: 'Bad Request',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    //Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = await this.usersService.create({
      ...signupData,
      password: hashedPassword,
    });

    // Return response
    return {
      statusCode: HttpStatus.CREATED,
      message: 'User created successfully',
      data: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        avatar: newUser.avatar,
      },
    };
  }

  async login(credentials: LoginDto) {
    const { email, password } = credentials;
    const user = await this.usersService.findOne(email);
    if (!user) {
      throw new HttpException(
        {
          statusCode: HttpStatus.UNAUTHORIZED,
          message: 'Invalid credentials',
          error: 'Unauthorized',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new HttpException(
        {
          statusCode: HttpStatus.UNAUTHORIZED,
          message: 'Incorrect username or password',
          error: 'Unauthorized',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
    const tokens = await this.refreshTokensService.generateUserTokens(user.id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Login successful',
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        ...tokens,
      },
    };
  }
}
