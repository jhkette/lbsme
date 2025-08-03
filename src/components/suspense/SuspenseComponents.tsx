import React from "react";
// Suspense components for loading states
export function SuspenseIntro() {
  return (
    <div className="loading flex flex-row text-lbtext justify-center shadow-lg bg-white rounded-lg p-4 w-full h-36 z-1">
      <div className="flex flex-col justify-center items-center w-1/5"></div>
      <div className="flex flex-col justify-center items-center w-1/5"></div>
      <div className="flex flex-col justify-center items-center w-1/5"></div>
      <div className="flex flex-col justify-center items-center w-1/5"></div>
      <div className="flex flex-col justify-center items-center w-1/5"></div>
    </div>
  );
}

export function SuspenseDeals() {
  return (
    <div className="loading flex flex-row text-lbtext justify-center shadow-lg bg-white rounded-lg p-4 w-full h-[450px] z-1"></div>
  );
}

export function SuspenseTransactions() {
  return (
    <div className="loading w-1/2 p-4 rounded-lg shadow-lg bg-white h-110 "></div>
  );
}

export function SuspenseDashboardGraph() {
  return (
    <div className="loading w-1/2 p-4 rounded-lg shadow-lg bg-white h-110 mr-8"></div>
  );
}

export function SubscriptionsTable() {
  return (
    <div className="loading min-w-full bg-white shadow-lg rounded-lg h-500"></div>
  );
}

export function SuspenseSubscriptionDetail() {
  return (
    <div className="loading w-1/2 bg-white shadow-lg rounded-lg mr-12 mt-14 h-400"></div>
  );
}
