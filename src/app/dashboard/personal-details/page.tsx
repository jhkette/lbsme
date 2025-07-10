"use client";
import React from "react";
import { useUser } from "@/contexts/UserContext/UserProvider";
export default function page() {
  const { user } = useUser();

  return (
    <div className="px-16 w-full flex flex-col mt-12 relative">
      <h1 className="font-bold text-4xl my-8 text-lbtext">Personal Details</h1>
      <div className="flex flex-col gap-4 bg-white pl-16 pr-32 py-12 rounded-lg shadow-lg w-fit">
        <p>
          Name: {user?.givenName} {user?.familyName}
        </p>
        <p>Email: {user?.email}</p>
        <p>Postcode: {user?.postcode?.length ? user?.postcode : "Uknown"}</p>
        <p>Phone: {user?.phoneNumber?.length ? user?.phoneNumber : "Uknown"}</p>
        <p>Verified email: {user?.emailVerified}</p>
      </div>
    </div>
  );
}
