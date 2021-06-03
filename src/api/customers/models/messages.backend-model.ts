import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumberString } from 'class-validator';

export class MessagesCreateRequest {
  @Expose({ name: 'sender_user_id', toPlainOnly: true })
  @IsNotEmpty()
  @IsNumberString()
  public senderUserId: string;

  @Expose({ name: 'receiver_user_id', toPlainOnly: true })
  @IsNotEmpty()
  @IsNumberString()
  public receiverUserId: string;

  @IsNotEmpty()
  public content: string;
}
