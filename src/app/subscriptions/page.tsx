import DashboardSubs from "@/components/subscriptionsLanding/DashboardSubs";
import { format } from "date-fns";

export default function Home() {
  const username = "Test user"; // Placeholder for username, can be replaced with actual user data
  const date = new Date(); 
  const formattedDate = format(date, "EEEE, do MMMM yyyy");
  return (
    <div className="px-12 w-full">
      <h1 className="font-bold text-5xl my-8 text-lbtext">
        Hello {username},
      </h1>
      <p className="my-8 text-lg text-gray-700">Today is {formattedDate}</p>
      <DashboardSubs/>
    </div>
  );
}
