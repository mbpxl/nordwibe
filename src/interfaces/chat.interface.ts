import { IMessage } from "./message.interface";
import { IRealUser, IUser } from "./user.interface";

export interface IChat{
    id: number,
    first_user: IRealUser,
    second_user: IRealUser,
    is_confirm_first_user?:boolean,
    is_confirm_second_user?:boolean,
    last_message_datetime?: string,
    created: string,
    is_last_sended_first?: boolean
    messages: IMessage[],
    is_with_support?: boolean
}