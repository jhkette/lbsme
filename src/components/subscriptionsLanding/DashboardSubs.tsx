import React from 'react'

export default function DashboardSubs() {
 

  const subscriptions = 12; // Placeholder for total subscriptions, can be replaced with actual data
  const monthlySpending = 250; // Placeholder for monthly spending, can be replaced with actual data
  const yearlSpending = 3000; // Placeholder for yearly spending, can be replaced with actual data
  const expectedMonthlySavings = 50; // Placeholder for expected monthly savings, can be replaced with actual data
  const expectedYearlySavings = 600; // Placeholder for expected yearly savings, can be replaced with actual data
  return (
    <div className='flex flex-row text-lbtext justify-center shadow-lg bg-white rounded-lg p-4 w-full h-36 z-1' >
        <div className='flex flex-col justify-center items-center w-1/5'>
            <p className='text-4xl font-semibold py-2'>{subscriptions}</p>
            <p className='text-lg font-base'>Subscriptions</p>
        </div>
        <div className='flex flex-col justify-center items-center w-1/5'>
        <p className='text-4xl font-semibold py-2'>{monthlySpending}</p>
            <p className='text-lg font-base'>Monthly Spend</p>
        </div>
         <div className='flex flex-col justify-center items-center w-1/5'>
        <p className='text-4xl font-semibold py-2'>{yearlSpending}</p>
            <p className='text-lg font-base'>Yearly subcsriptions</p>
        </div>
        <div className='flex flex-col justify-center items-center w-1/5'>
        <p className='text-4xl font-semibold text-lbgreen py-2'>{expectedMonthlySavings}</p>
            <p className='text-lg font-base'>Expected Monthly Saving</p>
        </div>
         <div className='flex flex-col justify-center items-center w-1/5'>
        <p className='text-4xl font-semibold text-lbgreen py-2'>{expectedYearlySavings}</p>
            <p className='text-lg font-base'>Yearly Savings</p>
        </div>
    </div>
  )
}
