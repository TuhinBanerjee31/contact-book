/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { UpdateUserDto } from './update-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly databaseService: DatabaseService) {}

  async editProfile(id: string, updatedData: UpdateUserDto) {
    const user = await this.databaseService.user.update({
      where: { id: id },
      data: { ...updatedData },
    });

    return user;
  }
}
