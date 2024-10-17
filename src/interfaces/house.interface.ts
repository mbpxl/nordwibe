type HouseType = "KV" | "AP" | "SP" | "UK";
type RepairType = "GR" | "MD" | "DS" | "SP" | "UK";
type BuildingType = "NC" | "SF" | "SB" | "OF" | "PH" | "SP" | "UK";
type SoundInsulationType = "SF" | "PT" | "MS" | "SP" | "UK";
type AccessibilityType = "HT" | "SP" | "UK";

export function toHouseType():HouseType{
  return "UK"
}

export function toRepairType(value: string | string[] | null): RepairType {
  if (value === null) {
    return "UK";
  }

  if (Array.isArray(value)) {
    return "UK";
  }
  switch (value) {
    case "Бабушкин":
      return "GR";
    case "Современный":
      return "MD";
    case "Дизайнерский":
      return "DS";
    case "Другой":
      return "SP";
    default:
      return "UK";
  }
}

export  function toBuildingType(value: string | string[] | null): BuildingType {
  if (value === null) {
    return "UK";
  }

  if (Array.isArray(value)) {
    return "UK";
  }
  switch (value) {
    case "Новостройка-жк":
      return "NC";
    case "Советский фонд":
      return "SF";
    case "Сталинки":
      return "SB";
    case "Старый фонд":
      return "OF";
    case "Частный дом":
      return "PH";
    case "Другой":
      return "SP";
    default:
      return "UK";
  }
}

export function toSoundIsolationType(value: string | string[] | null): SoundInsulationType {
  if (value === null) {
    return "UK";
  }

  if (Array.isArray(value)) {
    return "UK";
  }
  switch (value) {
    case "Хорошая":
    case "Идеальная":
      return "SF";
    case "Частично":
    case "Приемлемо":
      return "PT";
    case "Отсутствует":
    case "Картон":
      return "MS";
    case "Другой":
      return "SP";
    default:
      return "UK";
  }
}

export interface IHouseGeneral {
  address?: string | null;
  type: HouseType;
  type_extra?: string;
  i_am_owner?: boolean | null;
  count_days_from?: number | null;
  count_days_to?: number | null;
  cost?: number | null;
  is_have_bail?: boolean | null;
  is_have_fines?: boolean | null;
  cost_utilities?: number | null;
  count_neighbors?: number;
  count_rooms?: number;
  floor?: number | null;
  building_floor?: number | null;
  repair_type: RepairType;
  repair_type_extra?: string;
  building_type: BuildingType;
  building_type_extra?: string;
  sound_insulation_type: SoundInsulationType;
  sound_insulation_type_extra?: string;
  accessibility_type: AccessibilityType;
  accessibility_type_extra?: string;
  is_sunny_side?: boolean | null;
  is_have_elevator?: boolean | null;
  is_have_balcony?: boolean | null;
  is_have_parking_space?: boolean | null;
  is_have_security?: boolean | null;
  is_have_horizontal_bars?: boolean | null;
  is_have_conditioner?: boolean | null;
  is_have_garbage_chute?: boolean | null;
  is_have_wifi?: boolean | null;
  is_have_transport_close?: boolean | null;
  is_possible_smoke?: boolean | null;
  is_possible_animals?: boolean | null;
  is_have_washing_machine?: boolean | null;
  is_have_dryer?: boolean | null;
  is_have_iron?: boolean | null;
  is_have_dishwasher?: boolean | null;
  is_have_hair_dryer?: boolean | null;
  is_have_tv?: boolean | null;
  is_have_guest_table?: boolean | null;
  is_have_guest_cabinet?: boolean | null;
  photos_ids: number[];
  description?: string;
}

export interface IReadHouse {
  address?: string | null;
  type: HouseType;
  type_extra: string;
  i_am_owner?: boolean | null;
  count_days_from?: number | null;
  count_days_to?: number | null;
  cost?: number | null;
  is_have_bail?: boolean | null;
  is_have_fines?: boolean | null;
  cost_utilities?: number | null;
  count_neighbors?: number;
  count_rooms?: number;
  floor?: number | null;
  building_floor?: number | null;
  repair_type: RepairType;
  repair_type_extra: string;
  building_type: BuildingType;
  building_type_extra: string;
  sound_insulation_type: SoundInsulationType;
  sound_insulation_type_extra: string;
  accessibility_type: AccessibilityType;
  accessibility_type_extra: string;

  is_sunny_side?: boolean | null;
  is_have_elevator?: boolean | null;
  is_have_balcony?: boolean | null;
  is_have_parking_space?: boolean | null;
  is_have_security?: boolean | null;
  is_have_horizontal_bars?: boolean | null;
  is_have_conditioner?: boolean | null;
  is_have_garbage_chute?: boolean | null;
  is_have_wifi?: boolean | null;
  is_have_transport_close?: boolean | null;
  is_possible_smoke?: boolean | null;
  is_possible_animals?: boolean | null;
  is_have_washing_machine?: boolean | null;
  is_have_dryer?: boolean | null;
  is_have_iron?: boolean | null;
  is_have_dishwasher?: boolean | null;
  is_have_hair_dryer?: boolean | null;
  is_have_tv?: boolean | null;
  is_have_guest_table?: boolean | null;
  is_have_guest_cabinet?: boolean | null;

  photos_ids: number[];

  description?: string;
  id: number;
  creator_id: number;

  changed: string;
  created: string;
  is_active: boolean;

  viewes: number;
  is_favorite?: boolean | null;
}
