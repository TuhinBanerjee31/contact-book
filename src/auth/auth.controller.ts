/* eslint-disable prettier/prettier */
import { Body, Controller, HttpCode, HttpStatus, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, SignupDto } from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  //POST METHOD FOR ROUTE '/auth/login'
  @Post('login')
  login(@Body(ValidationPipe) loginData: LoginDto) {
    console.log({loginData})
    return this.authService.login(loginData);
  }

  //POST METHOD FOR ROUTE '/auth/signup'
  @HttpCode(HttpStatus.OK) //SPECIFYING HTTP STATUS OF THE ROUTE
  @Post('signup')
  signin(@Body(ValidationPipe) signupData: SignupDto) {
    console.log({signupData})
    return this.authService.signup(signupData);
  }

}
