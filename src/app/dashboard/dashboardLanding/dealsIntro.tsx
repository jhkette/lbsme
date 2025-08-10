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
        View a selection of <span className="text-lbgreen">Free trials</span>
      </p>
    ),
    link: "/dashboard/marketplace/freetrials"
  },
  {
    name: "Best deals",
    description: (
      <p className="text-center text-sm md:text-base  text-lbtextgrey font-bold">
        A selection of <span className="text-lbgreen">offers and deals</span>
      </p>
    ),
     link: "/dashboard/marketplace/bestdeals"
  },
  {
    name: "View all",
    description: (
      <p className="text-center text-sm md:text-base  text-lbtextgrey font-bold">
        View a selection of <span className="text-lbgreen">trials and offers</span>
      </p>
    ),
    link: "/dashboard/marketplace"
  },
];