import { ArrayNotEmpty, IsNotEmpty } from 'class-validator';

type CreateMessageDto = {
  role: string;
  content: string;
};

export class CreateChatDto {
  @IsNotEmpty()
  ownerId: number;

  @IsNotEmpty()
  @ArrayNotEmpty()
  messages: CreateMessageDto[];
}
