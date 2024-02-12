import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UpdateChatMessageDto } from './dto/update-chat-message.dto';

@ApiTags('chat')
@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @ApiOperation({
    summary: 'Add new message for exist chat',
  })
  @Post(':id')
  async createChatMessage(
    @Param('id') id: string,
    @Body() updateChatMessageDto: UpdateChatMessageDto,
  ) {
    return this.chatService.createChatMessage(+id, updateChatMessageDto);
  }

  @ApiOperation({
    summary: 'Create new chat',
  })
  @Post()
  create(@Body() createChatDto: CreateChatDto) {
    // let chat: Prisma.ChatCreateInput;

    return this.chatService.create(createChatDto);
  }

  @ApiOperation({
    summary: 'Get all chats for current user',
  })
  @Get()
  findAll() {
    return this.chatService.findAll();
  }

  @ApiOperation({
    summary: 'Get chat by ID',
  })
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
