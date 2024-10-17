export interface ISendMessage{
    sender_id: number,
    recipient_id: number,
    type: string,
    text: string,
    is_urgently: boolean,
    is_from_app: boolean,
    //idk i guess below are not needed
    id?: number,
    sended?: string,
    readed?: string
}

export interface IMessage{
    sender_id: number,
    recipient_id: number,
    type: string,
    text: string,
    is_urgently: boolean,
    is_from_app: boolean,
    //idk i guess below are not needed
    id: number,
    sended: string,
    readed: string
}