import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';

enum Role {
  USER = 'user',
  ASSISTANT = 'assistant',
  SYSTEM = 'system',
}

export class CreateMessageDto {
  @IsNotEmpty()
  @IsNumber()
  chatId: number;

  @IsNotEmpty()
  @IsEnum(Role)
  role: Role;

  @IsNotEmpty()
  content: string;
}
