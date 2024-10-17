import { IChat } from "@/interfaces/chat.interface";
import { ISendMessage } from "@/interfaces/message.interface";
import { RootState } from "@/store";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const API_BASE = "https://3133319-bo35045.twc1.net/api/v0/";

export interface SendMessageRequest {
  message: ISendMessage;
  chatId: number;
}

export const chatApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).authSlice.token;
      if (token) {
        headers.set("authorization", `Basic ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Messages"],
  reducerPath: "chatApi",
  endpoints: (build) => ({
    startChat: build.query<IChat, number>({
      query: (userId) => ({
        url: `start_chat/${userId}/`,
        credentials: "include",
      }),
    }),
    confirmChat: build.query<IChat, number>({
      query: (chatId) => ({
        url: `confirm_chat/${chatId}/`,
        credentials: "include",
      }),
    }),
    listchat: build.query<IChat[], void>({
      query: () => ({
        url: "chat/",
        credentials: "include",
        
      }),
      providesTags:["Messages"]
    }),

    sendMessage: build.mutation<IChat, SendMessageRequest>({
      query: (request) => ({
        method:"POST",
        url: `message/${request.chatId}/`,
        credentials: "include",
        body: request.message,
        
      }),
      invalidatesTags:["Messages"]
    }),
  }),
});

export const {
  useStartChatQuery,
  useConfirmChatQuery,
  useListchatQuery,
  useSendMessageMutation,
} = chatApi;
