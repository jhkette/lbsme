import { format } from "date-fns";
import { useUser } from "@/contexts/UserContext/UserProvider";

function IntroHome() {
  const date = new Date();
  const formattedDate = format(date, "EEEE, do MMMM yyyy");
  const { user } = useUser();
  return (
    <div>
      <h1 className="font-bold text-4xl my-8 text-lbtext">
        Hello {user?.givenName} {user?.familyName},
      </h1>
      <p className="my-8 text-lg text-gray-700">Today is {formattedDate}</p>
    </div>
  );
}

export default IntroHome;
