import { FixedDeals } from "@/interfaces/FixedDeals";
import {
  FD_LINK_BROADBAND,
  FD_LINK_MOBILE,
  FD_LINK_CAR_INS,
  FD_LINK_HOME_INS,
  FD_LINK_ENERGY,
  FD_LINK_PET_INS,
  FD_LINK_TRAVEL_INS,
} from "@/lib/consts";



export const FIXED_DEALS = [
  {
    name: FixedDeals.Broadband,
    uri: FD_LINK_BROADBAND,
    icon: "/images/deal-icons/broadband.svg",
  },
  {
    name: FixedDeals.CarInsurance,
    uri: FD_LINK_CAR_INS,
    icon: "/images/deal-icons/car-insurance.svg",
  },
  {
    name: FixedDeals.Energy,
    uri: FD_LINK_ENERGY,
    icon: "/images/deal-icons/energy.svg",
  },
  {
    name: FixedDeals.HomeInsurance,
    uri: FD_LINK_HOME_INS,
    icon: "/images/deal-icons/home-insurance.svg",
  },
  {
    name: FixedDeals.Mobile,
    uri: FD_LINK_MOBILE,
    icon: "/images/deal-icons/mobile.svg",
  },
  {
    name: FixedDeals.PetInsurance,
    uri: FD_LINK_PET_INS,
    icon: "/images/deal-icons/pet-insurance.svg",
  },
  {
    name: FixedDeals.TravelInsurance,
    uri: FD_LINK_TRAVEL_INS,
    icon: "/images/deal-icons/travel-insurance.svg",
  },
];