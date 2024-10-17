import { IUser } from "./user.interface";

export interface IFlat {
  id: number;
  user: IUser;
  price: number;
}

export interface IRealFlat {
  address: string;
  type: string;
  type_extra: string
  i_am_owner: boolean;
  count_days_from: number;
  count_days_to: number;
  cost: number;
  is_have_bail: boolean;
  is_have_fines: boolean;
  cost_utilities: number;
  count_neighbors: number;
  count_rooms: number;
  floor: number;
  building_floor: number;
  repair_type: string;
  repair_type_extra: string;
  building_type: string;
  building_type_extra: string;
  sound_insulation_type: string;
  sound_insulation_type_extra: string;
  accessibility_type:string;
  accessibility_type_extra: string;
  is_sunny_side: boolean;
  is_have_elevator: boolean;
  is_have_balcony: boolean;
  is_have_parking_space: boolean;
  is_have_security: boolean;
  is_have_horizontal_bars: boolean;
  is_have_conditioner: boolean;
  is_have_garbage_chute: boolean;
  is_have_wifi: boolean;
  is_have_transport_close: boolean;
  is_possible_smoke: boolean;
  is_possible_animals: boolean;
  is_have_washing_machine: boolean;
  is_have_dryer: boolean;
  is_have_iron: boolean;
  is_have_dishwasher: boolean;
  is_have_hair_dryer: boolean;
  is_have_tv: boolean;
  is_have_guest_table: boolean;
  is_have_guest_cabinet: boolean;
  photos_ids: string[];
  description: string;
  id: number;
  creator_id: number;
  changed:string;
  created:string;
  is_active: boolean;
  viewes: number;
  is_favorite: boolean;
}
