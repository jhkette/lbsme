import React from "react";
import { useUser } from "@/contexts/UserContext/UserProvider";
export default function AccountNotSubscribed() {
  const { user } = useUser();
  return (
    <div className="flex flex-row gap-12 rounded-2xl py-8  shadow-2xl bg-white h-fit border-1 border-gray-300">
      <div className="w-1/2 p-4  overflow-x-auto scrollbar-nice">
        <div className="flex flex-col items-start justify-start gap-4 mx-8 pb-1 my-2">
          <h2 className="text-2xl font-semibold text-lbtext">
            Your account details:
          </h2>{" "}
          <p className="text-lg font-semibold text-lbtext">
            Name:{" "}
            <span className="text-lbtextdark font-normal">
              {user?.givenName} {user?.familyName}
            </span>
          </p>
           <p className="text-lg font-semibold text-lbtext">
            Status:
            <span className="text-lbtextdark font-normal">
             Unsubscribed
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
