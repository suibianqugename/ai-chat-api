import { ArrayNotEmpty, IsNotEmpty } from 'class-validator';

type CreateMessageDto = {
  role: string;
  content: string;
};

export class UpdateChatMessageDto {
  @IsNotEmpty()
  @ArrayNotEmpty()
  messages: CreateMessageDto[];
}
