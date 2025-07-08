import { format } from "date-fns";
import { useUser } from "@/contexts/UserContext/UserProvider";

function IntroHome() {
  const date = new Date();
  const formattedDate = format(date, "EEEE, do MMMM yyyy");
  const { user } = useUser();
  return (
    <div>
      <h1 className="font-bold text-4xl mt-8 pb-4 text-lbtext">
        Hello {user?.givenName} {user?.familyName},
      </h1>
      <p className="text-lg pb-12 font-semibold text-lbtextdark">Today is {formattedDate}</p>
    </div>
  );
}

export default IntroHome;
