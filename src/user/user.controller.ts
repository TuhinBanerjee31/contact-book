/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Patch, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { UpdateUserDto } from './update-user.dto';
import { UserService } from './user.service';

@UseGuards(AuthGuard('jwt'))
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  //GETTING LOGGED IN USER PROFILE INFO
  @Get()
  getProfile(@Req() req: Request) {
    return req.user;
  }

  //UPDATING LOGGED IN USER PROFILE
  @Patch()
  editProfile(@Req() req: Request ,@Body(ValidationPipe) updatedData: UpdateUserDto){
    return this.userService.editProfile(req.user['id'], updatedData)
  }
}
