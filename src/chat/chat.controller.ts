import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { Prisma } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';
import { UpdateChatMessageDto } from './dto/update-chat-message.dto';

@ApiTags('chat')
@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  create(@Body() createChatDto: CreateChatDto) {
    // let chat: Prisma.ChatCreateInput;

    return this.chatService.create(createChatDto);
  }

  @Post(':id/message')
  async createChatMessage(
    @Param('id') id: string,
    @Body() updateChatMessageDto: UpdateChatMessageDto,
  ) {
    return this.chatService.createChatMessage(+id, updateChatMessageDto);
  }

  @Get()
  findAll() {
    return this.chatService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.chatService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateChatDto: UpdateChatDto) {
  //   return this.chatService.update(+id);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.chatService.remove(+id);
  }
}
