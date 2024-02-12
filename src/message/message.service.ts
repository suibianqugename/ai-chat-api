import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MessageService {
  constructor(private prisma: PrismaService) {}

  async create(createMessageDto: CreateMessageDto) {
    const { chatId, ...rest } = createMessageDto;

    const data: Prisma.MessageCreateInput = {
      ...rest,
      chat: {
        connect: {
          id: chatId,
        },
      },
    };

    return this.prisma.message.create({ data });
  }

  findAll() {
    return this.prisma.message.findMany();
  }

  findOne(id: number) {
    return this.prisma.message.findUnique({
      where: { id },
    });
  }

  update(id: number, updateMessageDto: UpdateMessageDto) {
    return `This action updates a #${id} message`;
  }

  remove(id: number) {
    return `This action removes a #${id} message`;
  }
}
