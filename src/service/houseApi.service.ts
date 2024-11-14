import { IHouseGeneral, IReadHouse } from "@/interfaces/house.interface";
import { IUser, IRealUserMe, IRealUser } from "@/interfaces/user.interface";
import { RootState } from "@/store";
const API_BASE = "https://3133319-bo35045.twc1.net/api/v0/";
const authDetails = process.env.REACT_APP_AUTH_DETAILS||""
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IRealFlat } from "@/interfaces/flat.interface";
import { truncateSync } from "fs";

class HouseApi {
  async listHouses() {
    try {
      const data = await fetch(API_BASE + "house/", {
        method: "GET",
        credentials: "include",
        headers: {
          Authorization: `Basic ${localStorage.getItem('token')}`,
        },
      });
      const houses = await data.json();
      return houses;
    } catch (error) {
      console.error("Request failed:", error);
    }
  }

  async uploadImages(formData: FormData) {
    try {
      const data = await fetch(API_BASE + `upload_images/`, {
        method: "POST",
        credentials: "include",
        headers: {
          Authorization: authDetails,
          "Content-Type": "multipart/form-data",
        },
        body: formData,
      });
      const json = await data.json();
      return data.status;
    } catch (error) {
      console.error("Request failed:", error);
    }
  }

  async getImages(ids: Array<String>) {
    const url = API_BASE + "get_images/";
    try {
      const data = await fetch(url + `?ids=${ids.join(",")}`, {
        method: "GET",
        credentials: "include",
        headers: {
          Authorization: authDetails,
        },
      });
      const images = await data.json();
      return images;
    } catch (error) {
      console.error("Request failed:", error);
    }
  }

  async getHouse(id: number) {
    try {
      const data = await fetch(API_BASE + `house/${id}/`, {
        method: "GET",
        credentials: "include",
        headers: {
          Authorization: authDetails,
        },
      });
      const house = await data.json();
      return house;
    } catch (error) {
      console.error("Request failed:", error);
    }
  }

  async complaintHouse({ id, text }: { id: number; text: string }) {
    try {
      const data = await fetch(API_BASE + `complaint_house/${id}/`, {
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

  async banHouse(id: number) {
    try {
      const data = await fetch(API_BASE + `ban_house/${id}/`, {
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
      const data = await fetch(API_BASE + `add_favorite_house/${id}/`, {
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
      const data = await fetch(API_BASE + `remove_favorite_house/${id}/`, {
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
  async deleteHouse(id: number) {
    try {
      const data = await fetch(API_BASE + `house/${id}/`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          Authorization: authDetails,
        },
      });
      const json = await data.json();
      return data.status;
    } catch (error) {
      console.error("Request failed:", error);
    }
  }

  async putHouse(id: number, updateHouseDTO: IHouseGeneral) {
    // const example ={
    //     "address": "aaaффф",
    //     "type": "UK",
    //     "type_extra": "",
    //     "count_days_from": 0,
    //     "count_days_to": 0,
    //     "cost": 0,
    //     "repair_type": "UK",
    //     "building_type": "UK",
    //     "sound_insulation_type": "UK",
    //     "accessibility_type": "UK",
    //     "photos_ids": [],
    //     "description": ""
    //   }
    try {
      const data = await fetch(API_BASE + `house/${id}/`, {
        method: "PUT",
        credentials: "include",
        headers: {
          Authorization: authDetails,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateHouseDTO),
      });
      const house = await data.json();
      return house;
    } catch (error) {
      console.error("Request failed:", error);
    }
  }

  async createHouse(createHouseDTO: IHouseGeneral) {
    // const example ={
    //     "address": "",
    //     "type": "UK",
    //     "type_extra": "",
    //     "i_am_owner": true,
    //     "count_days_from": 0,
    //     "count_days_to": 0,
    //     "cost": 0,
    //     "is_have_bail": true,
    //     "is_have_fines": true,
    //     "cost_utilities": 0,
    //     "count_neighbors": 0,
    //     "count_rooms": 0,
    //     "floor": 0,
    //     "building_floor": 0,
    //     "repair_type": "UK",
    //     "repair_type_extra": "",
    //     "building_type": "UK",
    //     "building_type_extra": "",
    //     "sound_insulation_type": "UK",
    //     "sound_insulation_type_extra": "",
    //     "accessibility_type": "UK",
    //     "accessibility_type_extra": "",
    //     "is_sunny_side": true,
    //     "is_have_elevator": true,
    //     "is_have_balcony": true,
    //     "is_have_parking_space": true,
    //     "is_have_security": true,
    //     "is_have_horizontal_bars": true,
    //     "is_have_conditioner": true,
    //     "is_have_garbage_chute": true,
    //     "is_have_wifi": true,
    //     "is_have_transport_close": true,
    //     "is_possible_smoke": true,
    //     "is_possible_animals": true,
    //     "is_have_washing_machine": true,
    //     "is_have_dryer": true,
    //     "is_have_iron": true,
    //     "is_have_dishwasher": true,
    //     "is_have_hair_dryer": true,
    //     "is_have_tv": true,
    //     "is_have_guest_table": true,
    //     "is_have_guest_cabinet": true,
    //     "photos_ids": [],
    //     "description": ""
    //   }
    try {
      const data = await fetch(API_BASE + `house/`, {
        method: "POST",
        credentials: "include",
        headers: {
          Authorization: authDetails,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(createHouseDTO),
      });
      const house = await data.json();
      return house;
    } catch (error) {
      console.error("Request failed:", error);
    }
  }
}

const houseApi = new HouseApi();
export default houseApi;
export interface EditHouseRequest{
  house: IHouseGeneral;
  id: number
}

export const hApi = createApi({
  reducerPath: "hApi",
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
  endpoints: (build) => ({
    listHouse: build.query<IRealFlat[], void>({
      query: () => ({
        url: "house/",
        credentials: "include",
        
      }),
    }),
    getHouse: build.query<IRealFlat,number>({
      query: (id) => ({
        url: `house/${id}`,
        credentials: "include",
        
      }),
    }),
    createHouse: build.mutation<IReadHouse, IHouseGeneral>({
      query: (house)=>({
          url: "house/",
          credentials:"include",
          method:"POST",
          body: house
      })
    }),
    uploadImages: build.mutation<number[],FormData>({
      query: (image)=>({
        url: "upload_images/",
        credentials:"include",
        // headers: {
        //   'Content-Type': 'multipart/form-data;'
        // },
        method:"POST",
        body: image,
    })
    }),
    editHouse: build.mutation<IReadHouse,EditHouseRequest>({
      query(req) {
        // const {id,...body} = data;
        return{
        url: `house/${req.id}`,
        credentials:"include",
        
        method:"PUT",
        body:req.house}
    }
    }),
  }),
});

export const { useListHouseQuery, useGetHouseQuery, useCreateHouseMutation,useUploadImagesMutation, useEditHouseMutation } = hApi;
