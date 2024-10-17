import {
  IUser,
  IRealUserMe,
  IRealUser,
  ICreateUser,
} from "@/interfaces/user.interface";
const API_BASE = "https://3133319-bo35045.twc1.net/api/v0/";
const authDetails = process.env.REACT_APP_AUTH_DETAILS||""
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "@/store";

export interface editUserDTO {
  id: number;
  first_name: string;
  date_joined: string;
  count_visits: number;
  avatar: string;
  purpose: string;
  occupation: string;
  smoking: string;
  pets: string;
  first_aid: string;
  social_interaction: string;
  home_town: string;
  my_town: string;
  is_favorite: boolean;
  email: string;
  date_birthday: string;
  gender: string;
  type_auth: string;
  password: string;
}

class Api {
  //   private userName = "";
  //   constructor() {
  //     this.login();
  //   }
  //   login() {
  //     fetch(API_BASE + `login`, {
  //       method: "GET",
  //       credentials: "include",
  //       headers: authDetails,
  //     })
  //       .then((r) => r.json())
  //       .then((j) => (console.log(j)))
  //       .catch((error) => console.error("Request failed:", error));
  //   }

  async createUser(createUserDto: ICreateUser) {
    //verify phone and captcha????
    try {
      const data = await fetch(API_BASE + `users/`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(createUserDto),
      });
      const user = await data.json();
      return user;
    } catch (error) {
      console.error("Request failed:", error);
    }
  }

  async listUsers() {
    //   const users: Array<IUser> = [];
    let users: Array<IUser> = [];
    try {
      const data = await fetch(API_BASE + "users", {
        method: "GET",
        credentials: "include",
        headers: {
          Authorization: authDetails,
        },
      });
      const json = await data.json();
      users = json;
      return users;
    } catch (error) {
      console.error("Request failed:", error);
    }
    //   return users as Array<IUser>;
  }
  async getUser(id: number) {
    try {
      const data = await fetch(API_BASE + `users/${id}/`, {
        method: "GET",
        credentials: "include",
        headers: {
          Authorization: authDetails,
        },
      });
      const user = await data.json();
      return user;
    } catch (error) {
      console.error("Request failed:", error);
    }
  }
  async getMe() {
    try {
      const data = await fetch(API_BASE + "users/me/", {
        method: "GET",
        credentials: "include",
        headers: {
          Authorization: authDetails,
        }, //need to parse when auth implemented
      });
      const user = await data.json();
      return user;
    } catch (error) {
      console.error("Request failed:", error);
    }
  }
  async complaintUser({ id, text }: { id: number; text: string }) {
    //mb check id!==me.id
    try {
      const data = await fetch(API_BASE + `complaint_user/${id}/`, {
        method: "POST",
        credentials: "include",
        headers: {
          Authorization: authDetails,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: text }),
      });
      const json = await data.json();
      return data.status;
    } catch (error) {
      console.error("Request failed:", error);
    }
  }

  async banUser(id: number) {
    try {
      const data = await fetch(API_BASE + `ban_user/${id}/`, {
        method: "POST",
        credentials: "include",
        headers: {
          Authorization: authDetails,
          "Content-Type": "application/json",
        },
      });
      const json = await data.json();
      return data.status;
    } catch (error) {
      console.error("Request failed:", error);
    }
  }

  async addToFavorites(id: number) {
    try {
      const data = await fetch(API_BASE + `add_favorite_user/${id}/`, {
        method: "POST",
        credentials: "include",
        headers: {
          Authorization: authDetails,
          "Content-Type": "application/json",
        },
      });
      const json = await data.json();
      return data.status;
    } catch (error) {
      console.error("Request failed:", error);
    }
  }
  async removeFromFavorites(id: number) {
    try {
      const data = await fetch(API_BASE + `remove_favorite_user/${id}/`, {
        method: "POST",
        credentials: "include",
        headers: {
          Authorization: authDetails,
          "Content-Type": "application/json",
        },
      });
      const json = await data.json();
      return data.status;
    } catch (error) {
      console.error("Request failed:", error);
    }
  }

  async editUser(newUser: IRealUser | null) {
    // const fetched = await this.getMe();
    // if (fetched) changedUser = fetched;
    // if (changedUser) {
    //   const { username, is_staff, is_active, is_superuser, ...editUserDto } =
    //     changedUser;
    // //   console.log(editUserDto);
    //   editUserDto.id = 1;
    //   editUserDto.first_name = "1211";
    try {
      const data = await fetch(API_BASE + `users/`, {
        method: "PUT",
        credentials: "include",
        headers: {
          Authorization: authDetails,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });
      // const user = await data.json();
      // console.log(user);
      // return user;
    } catch (error) {
      console.error("Request failed:", error);
    }
  }

  async deleteUser() {
    try {
      const data = await fetch(API_BASE + `users/`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          Authorization: authDetails,
          "Content-Type": "application/json",
        },
      });
      const json = await data.json();
      return data.status;
    } catch (error) {
      console.error("Request failed:", error);
    }
  }
}

export const usrApi = createApi({
  reducerPath: "usrApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).authSlice.token;
      if (token) {
        headers.set("authorization", `Basic ${token}`);
      }
      return headers;
    },
    credentials: "include",
  }),
  endpoints: (build) => ({
    getMe: build.query<IRealUserMe, void>({
      query: () => ({
        url: "users/me",
      }),
    }),
    getUser: build.query<IRealUser, number>({
      query: (id) => ({
        url: `users/${id}`,
      }),
    }),
  }),
});
export const { useGetMeQuery, useGetUserQuery } = usrApi;

const userApi = new Api();
export default userApi;
