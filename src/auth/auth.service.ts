/* eslint-disable prettier/prettier */
import { ForbiddenException, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { LoginDto, SignupDto } from './auth.dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly databaseService: DatabaseService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async login(loginData: LoginDto) {
    //FINDING ACCOUNT BY EMAIL
    const user = await this.databaseService.user.findUnique({
      where: { email: loginData.email },
    });

    //EMAIL NOT PRESENT
    if (!user) throw new ForbiddenException('Incorrect Email.');

    //COMPARING / VERIFYING PASSWORD
    const matched = await argon.verify(user.password, loginData.password);

    //PASSWORD NOT MATCHED
    if (!matched) throw new ForbiddenException('Incorrect Password.');

    //IF EVERYTHING MATCHES WE LOGGED IN AND RETURN USER TOKEN
    return this.signToken(user.id, user.email);
  }

  async signup(signupData: SignupDto) {
    //HASHING THE PASSWORD
    const hash_pass = await argon.hash(signupData.password);

    try {
      //SAVING DATA IN DB
      await this.databaseService.user.create({
        data: {
          name: signupData.name,
          email: signupData.email,
          password: hash_pass,
        },
      });

      //LOGINING IN USER
      return this.login({
        email: signupData.email,
        password: signupData.password,
      });
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ForbiddenException('Email is already registered.');
      } else {
        throw error;
      }
    }
  }

  //FUNCTION THAT GENERATES JWT TOKEN
  async signToken(
    id: string,
    email: string,
  ): Promise<{ access_token: string }> {
    const payload = { sub: id, email };
    const secret = this.configService.get('JWT_SECRET');

    const token = await this.jwtService.signAsync(payload, {
      expiresIn: '30m',
      secret: secret,
    });

    return { access_token: token };
  }
}
