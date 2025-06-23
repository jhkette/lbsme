import React from "react";

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


export function SuspenseTransactions(){
  return(
    <div className="loading w-1/2 p-4 rounded-lg shadow-lg bg-white h-80 ">
    
      </div>
  )

}


export function SuspenseDashboardGraph() {
  return (
    <div className="loading w-1/2 p-4 rounded-lg shadow-lg bg-white h-80 mr-8">
      </div>
  )
}
