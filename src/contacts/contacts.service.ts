/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateContactDto } from './create-contact.dto';
import { UpdateContactDto } from './update-contact.dto';

@Injectable()
export class ContactsService {
  constructor(private databaseService: DatabaseService) {}

  getContacts(id: string) {
    return this.databaseService.contact.findMany({ where: { userId: id } });
  }

  getContactsByName(id: string, name: string) {
    return this.databaseService.contact.findMany({
      where: { name, userId: id },
    });
  }

  getContactsByNumber(id: string, number: string) {
    return this.databaseService.contact.findMany({
      where: { phoneNumber: number, userId: id },
    });
  }

  async createContact(id: string, contactInfo: CreateContactDto) {
    const newContact = await this.databaseService.contact.create({
      data: {
        userId: id,
        ...contactInfo,
      },
    });

    return newContact;
  }

  // async editContactByKey(
  //   id: string,
  //   key: string,
  //   updatedContactInfo: UpdateContactDto,
  // ) {

  // }
}
