import { ArrayNotEmpty, IsEnum, IsNotEmpty } from 'class-validator';

enum Role {
  USER = 'user',
  ASSISTANT = 'assistant',
  SYSTEM = 'system',
}

class MessageDto {
  @IsNotEmpty()
  @IsEnum(Role)
  role: Role;

  @IsNotEmpty()
  content: string;
}

export class UpdateChatMessageDto {
  @IsNotEmpty()
  @ArrayNotEmpty()
  messages: MessageDto[];
}
