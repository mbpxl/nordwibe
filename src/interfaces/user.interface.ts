import { ENotificationsTypes } from "@/components/Notification";
import { IParameter } from "./parameter.interface";
import { TAnimals, THabits } from "@/config";
import { IFlat } from "./flat.interface";
import { IArticle } from "./article.interface";

export interface IFavourites {
  users: IUser[];
  flats: Array<IFlat>;
  articles: Array<IArticle>;
}

export interface IRealUserMe {
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
  is_favorite: true;
  username: string;
  email: string;
  date_birthday: string;
  gender: string;
  type_auth: string;
  is_staff: boolean;
  is_active: boolean;
  last_login: string;
  is_superuser: true;
}

export interface IRealUser {
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
  is_favorite: true;
}

export interface IUser {
  id: number;
  name: string;
  age: number;
  username: string;
  animals: Array<TAnimals>;
  habits: Array<THabits>;
  parameters: Array<IParameter>;
  favourites: IFavourites;
  city: string;
  notifications: [ENotificationsTypes, string, boolean][];
  contact: {
    telegram: string;
    vk: string;
    phone: string;
    mail: string;
  };
}

export interface ICreateUser {
  telephone_code?: string;
  captcha_token: string;
  user_secret: string;
  username: string;
  email: string;
  first_name: string;
  password: string;

  date_birthday?: Date | null;
  gender?: string;
  type_auth?: string;
  purpose?: string;
  occupation?: string;
  smoking?: string;
  pets?: string;
  first_aid?: string;
  social_interaction?: string;
  home_town?: string | null;
  my_town?: string | null;
}

export const createIUserFromRealUserMe = (realUserMe: IRealUserMe): IUser => {
  return {
    ...realUserMe,
    name: realUserMe.first_name,
    age: 0, // Здесь мы оставляем age как undefined, так как оно отсутствует в IRealUserMe
    animals: [], // Создаем пустой массив для animals
    habits: [], // Создаем пустой массив для habits
    parameters: [], // Создаем пустой массив для parameters
    favourites: {} as IFavourites, // Инициализируем favourites как пустой объект
    city: realUserMe.home_town || realUserMe.my_town, // Используем home_town или my_town
    notifications: [], // Создаем пустой массив для notifications
    contact: {
      telegram: "",
      vk: "",
      phone: "",
      mail: "",
    },
    username: realUserMe.username,
  };
};

export const createIUserFromRealUser = (
  realUser: IRealUser | undefined
): IUser => {
  if (realUser)
    return {
      ...realUser,
      name: realUser.first_name,
      age: 0,
      animals: [], // Создаем пустой массив для animals
      habits: [], // Создаем пустой массив для habits
      parameters: [], // Создаем пустой массив для parameters
      favourites: {} as IFavourites, // Инициализируем favourites как пустой объект
      city: realUser.home_town || realUser.my_town, // Используем home_town или my_town
      notifications: [], // Создаем пустой массив для notifications
      contact: {
        telegram: "",
        vk: "",
        phone: "",
        mail: "",
      },
      username: realUser.first_name,
    };
  return {
    id: 0,
    name: "",
    age: 0,
    animals: [], // Создаем пустой массив для animals
    habits: [], // Создаем пустой массив для habits
    parameters: [], // Создаем пустой массив для parameters
    favourites: {} as IFavourites, // Инициализируем favourites как пустой объект
    city: "", // Используем home_town или my_town
    notifications: [], // Создаем пустой массив для notifications
    contact: {
      telegram: "",
      vk: "",
      phone: "",
      mail: "",
    },
    username: "",
  };
};

export const createEmptyIUser = ():IUser=>{
  return {
    id: 0,
    name: "",
    age: 0,
    animals: [], // Создаем пустой массив для animals
    habits: [], // Создаем пустой массив для habits
    parameters: [], // Создаем пустой массив для parameters
    favourites: {} as IFavourites, // Инициализируем favourites как пустой объект
    city: "", // Используем home_town или my_town
    notifications: [], // Создаем пустой массив для notifications
    contact: {
      telegram: "",
      vk: "",
      phone: "",
      mail: "",
    },
    username: "",
  };
}
