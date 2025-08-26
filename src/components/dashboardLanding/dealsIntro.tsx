  interface DealIntro {
  name: string;
    description: React.ReactNode;
    link: string
}

  
  export const DealsIntro: DealIntro[] = [
  {
    name: "Free trials",
    description: (
      <p className="text-center text-sm md:text-base text-lbtextgrey font-bold">
        View a selection of <span className="text-lbgreen font-bold text-lg">Free trials</span>
      </p>
    ),
    link: "/dashboard/marketplace/free-trials"
  },
  {
    name: "Best deals",
    description: (
      <p className="text-center text-sm md:text-base  text-lbtextgrey font-bold">
        A selection of <span className="text-lbgreen font-bold text-lg">offers and deals</span>
      </p>
    ),
     link: "/dashboard/marketplace/best-deals"
  },
  {
    name: "Business deals",
    description: (
      <p className="text-center text-sm md:text-base  text-lbtextgrey font-bold">
        View a selection of deals <span className="text-lbgreen font-bold text-lg">catered for businesses</span>
      </p>
    ),
    link: "/dashboard/marketplace/sme-deals"
  },
];