import { FixedDeals } from "@/interfaces/FixedDeals";
import {
  FD_LINK_BROADBAND,
  FD_LINK_MOBILE,
  FD_LINK_CAR_INS,
  FD_LINK_BUSINESS_INS,
  FD_LINK_ENERGY,
  FD_LINK_FINANCE,

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
    name: FixedDeals.Finance,
    uri: FD_LINK_FINANCE,
    icon: "/images/deal-icons/money.svg",
  },
  {
    name: FixedDeals.Mobile,
    uri: FD_LINK_MOBILE,
    icon: "/images/deal-icons/mobile.svg",
  },
 
  {
    name: FixedDeals.BusinessInsurance,
    uri: FD_LINK_BUSINESS_INS,
    icon: "/images/deal-icons/travel-insurance.svg",
  },
];