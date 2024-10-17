import { IUser, IRealUserMe, IRealUser } from "@/interfaces/user.interface";
const API_BASE = "https://3133319-bo35045.twc1.net/api/v0/";

const authDetails = process.env.REACT_APP_AUTH_DETAILS||""

class ChatApi {
  async listChats() {
    try {
      const data = await fetch(API_BASE + "chat/", {
        method: "GET",
        credentials: "include",
        headers: {
          Authorization: authDetails,
        },
        
      });
      const chats = await data.json();
      return chats;
    } catch (error) {
      console.error("Request failed:", error);
    }
  }

  async startChat(id:number){
    try {
        const data = await fetch(API_BASE + `start_chat/${id}/`, {
          method: "GET",
          credentials: "include",
          headers: {
            Authorization: authDetails,
          },
          
        });
        const chat = await data.json();
        return chat;
      } catch (error) {
        console.error("Request failed:", error);
      }
  }
  async confirmChat(id:number){
    try {
        const data = await fetch(API_BASE + `start_chat/${id}/`, {
          method: "GET",
          credentials: "include",
          headers: {
            Authorization: authDetails,
          },
          
        });
        const chat = await data.json();
      } catch (error) {
        console.error("Request failed:", error);
      }
  }

  async startConnectAlert(){
    try {
        const data = await fetch(API_BASE + `start_connect_alert/`, {
          method: "GET",
          credentials: "include",
          headers: {
            Authorization: authDetails,
          },
          
        });
        const info = await data.json();
      } catch (error) {
        console.error("Request failed:", error);
      }
  }

  async startConnect(id: number){
    try {
        const data = await fetch(API_BASE + `start_connect/${id}`, {
          method: "GET",
          credentials: "include",
          headers: {
            Authorization: authDetails,
          },
          
        });
        const info = await data.json();
        return info;
      } catch (error) {
        console.error("Request failed:", error);
      }
  }

  async sendMessage(message:{id:number,sender_id:number,recipient_id:number,type:string,text:string,is_urgently:boolean,is_from_app:boolean}){
    try {
        const data = await fetch(API_BASE + `message/${message.id}`, {
          method: "POST",
          credentials: "include",
          headers: {
            Authorization: authDetails,
            "Content-Type": "application/json",
          },
          body:JSON.stringify(message)
        });
        const chat = await data.json();
        return chat;
      } catch (error) {
        console.error("Request failed:", error);
      }
  }
}

const chatApi = new ChatApi();
export default chatApi;
