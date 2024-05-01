/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ContactsService } from './contacts.service';
import { Request } from 'express';
import { CreateContactDto } from './create-contact.dto';
// import { UpdateContactDto } from './update-contact.dto';

@UseGuards(AuthGuard('jwt'))
@Controller('contacts')
export class ContactsController {
  constructor(private contactsService: ContactsService) {}

  //TO GET ALL CONTACTS LIST
  @Get()
  getContacts(@Req() req: Request) {
    return this.contactsService.getContacts(req.user['id']);
  }

  //TO GET CONTACTS BY NAME
  @Get('/name/:name')
  getContactsByName(@Req() req: Request, @Param('name') contactName: string) {
    return this.contactsService.getContactsByName(req.user['id'], contactName);
  }

  //TO GET CONTACTS BY NUMBER
  @Get('/number/:number')
  getContactsByNumber(@Req() req: Request, @Param('number') contactNumber: string) {
    return this.contactsService.getContactsByNumber(req.user['id'], contactNumber);
  }

  //CREATING NEW CONTACT
  @Post()
  createContact(@Req() req: Request, @Body(ValidationPipe) contactInfo: CreateContactDto) {
    return this.contactsService.createContact(req.user['id'], contactInfo);
  }

  //EDITING CONTACTS INFO
  // @Patch(':key')
  // editContactByKey(@Req() req: Request, @Param('key') key: string, @Body(ValidationPipe) updatedContactInfo: UpdateContactDto) {
  //   return this.contactsService.editContactByKey(req.user['id'], key, updatedContactInfo);
  // }
}
