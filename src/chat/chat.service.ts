import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Chat, Prisma } from '@prisma/client';
import OpenAI from 'openai';
import { CreateChatDto } from './dto/create-chat.dto';
import { ConfigService } from '@nestjs/config';
import { UpdateChatMessageDto } from './dto/update-chat-message.dto';

@Injectable()
export class ChatService {
  private readonly openai: OpenAI;
  constructor(
    private prisma: PrismaService,
    private configService: ConfigService,
  ) {
    this.openai = new OpenAI({
      apiKey: this.configService.get('OPENAI_API_KEY'), // This is the default and can be omitted
    });
  }

  async create(createChatDto: CreateChatDto) {
    // const lastMessage = createChatDto.messages.slice(-1)[0];

    // const data: Prisma.ChatCreateInput = {
    //   ...createChatDto,
    //   messages: {
    //     create: lastMessage,
    //   },
    // };

    const messages =
      createChatDto.messages as OpenAI.Chat.Completions.ChatCompletionMessageParam[];

    const res = await this.completionCreate(messages);

    // return this.prisma.chat.create({ data });
    return res;
  }

  async createChatMessage(
    id: number,
    updateChatMessageDto: UpdateChatMessageDto,
  ) {
    console.log('id', id);
    const messages =
      updateChatMessageDto.messages as OpenAI.Chat.Completions.ChatCompletionMessageParam[];

    const res = await this.completionCreate(messages);

    // return this.prisma.chat.create({ data });
    return res;
  }

  async completionCreate(
    messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[],
  ) {
    const systemMessage: OpenAI.Chat.Completions.ChatCompletionMessageParam = {
      role: 'system',
      content: 'You are a helpful assistant.',
    };

    const res = await this.openai.chat.completions.create({
      model: 'gpt-3.5-turbo-0125',
      temperature: 0.7,
      messages: [
        systemMessage,
        ...messages,
        // {
        //   role: 'user',
        //   content: 'Who are you',
        // },
      ],
      // response_format: {
      //   type: 'json_object',
      // },
      // stream: false,
    });
    return res.choices[0].message;
  }

  findAll() {
    return this.prisma.chat.findMany();
  }

  findOne(id: number) {
    return this.prisma.chat.findUnique({
      where: { id },
      include: {
        messages: true,
      },
    });
  }

  update(id: number) {
    return `This action updates a #${id} chat`;
  }

  remove(id: number) {
    return `This action removes a #${id} chat`;
  }
}
