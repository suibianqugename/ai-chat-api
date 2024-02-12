import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Chat, Prisma } from 'prisma/client';
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

    const { messages } = createChatDto;

    const res = await this.completionCreate(
      messages as OpenAI.Chat.Completions.ChatCompletionMessageParam[],
    );

    const data: Prisma.ChatCreateInput = {
      ...createChatDto,
      owner: {
        connect: { id: 1 },
      },
      messages: {
        createMany: {
          data: [
            ...messages,
            { role: res.role, content: res.content as string },
          ],
        },
      },
    };

    const savedData = await this.prisma.chat.upsert({
      where: { id: 0 },
      update: {},
      create: data,
      include: {
        messages: true,
      },
    });
    return savedData;
  }

  async createChatMessage(
    id: number,
    updateChatMessageDto: UpdateChatMessageDto,
  ) {
    const { messages } = updateChatMessageDto;
    const lastMessage = messages.slice(-1)[0];
    const res = await this.completionCreate(
      messages as OpenAI.Chat.Completions.ChatCompletionMessageParam[],
    );

    const responseMsgFromAi = {
      role: res.role,
      content: res.content as string,
    };

    const latestTwoMessage = [lastMessage, responseMsgFromAi];

    await this.prisma.chat.update({
      where: { id: id },
      data: {
        messages: {
          createMany: {
            data: [...latestTwoMessage],
          },
        },
      },
    });
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

  findAll(): Promise<Chat[]> {
    return this.prisma.chat.findMany({
      include: {
        messages: true,
      },
    });
  }

  findOne(id: number): Promise<Chat | null> {
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
