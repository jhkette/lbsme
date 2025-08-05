import { format } from "date-fns";
import { useUser } from "@/contexts/UserContext/UserProvider";
import {SuspenseTextIntro} from "@/components/suspense/SuspenseComponents";
function IntroHome() {
  const date = new Date();
  const formattedDate = format(date, "EEEE, do MMMM yyyy");
  const { user } = useUser();
  return (
    <div>
      {user?.familyName && user?.givenName ? (
      <h1 className="font-bold text-4xl mt-8 pb-4 text-lbtext">
        Hello {user?.givenName} {user?.familyName},
      </h1>) :(
        <SuspenseTextIntro/>
      )}
      <p className="text-lg pb-12 font-semibold text-lbtextdark">Today is {formattedDate}</p>
    </div>
  );
}

export default IntroHome;
