import { Subscription } from '@/interfaces/Subscription'
import { format, parseISO } from 'date-fns';
import Image from 'next/image';
import Circle from '@/components/lbcoreui/Circle';
import {clsx} from "clsx"
interface TransactionDetailProps{
    sub: Subscription
    renewal: boolean
}
export default function TransactionDetail(props: TransactionDetailProps) {
   if (!props.sub) {
    return null;
  }
    const icon = props.sub.merchant.icon
  return (
    
    <div className='flex flex-row justify-between py-2 gap-8 items-center border-b-1'> 
      <div className='flex flex-row items-center gap-4'>
        {icon !== "unknown" && icon !== null ?(
          <Image src={icon} alt={props.sub.displayName} width={50} height={50} />
        ) : (
          <Circle/>
        )}
         

         <p className=" bg-lbbgblue text-white px-3 py-1 rounded-lg text-xs">
          {" "}
          {props.sub?.type
            ? props.sub?.type
            : "Unknown"}{" "}
        </p>
        {props.sub.merchant.name && props.sub.merchant.name.length > 40 ? (
            <p className="text-xs block max-w-[190px] lg:max-w-[240px] text-wrap">{props.sub.merchant.name}</p>
          ) : (
            <p className="text-sm md:text-base block max-w-[190px] lg:max-w-[240px] text-wrap">{props.sub.merchant.name ? props.sub.merchant.name : ""}</p>
          )}
       

      </div>
      <div className='flex flex-col'>
      <p className='font-semibold'>
        {props.renewal
          ? format(parseISO(props.sub.dates.renewalDate), "do MMM yyyy")
          : format(parseISO(props.sub.dates.lastPaymentDate), "do MMM yyyy")}
      </p>
      <p className='text-xs text-orange-400'>{props.renewal && `Subscription renews in ${props.sub.dates.endsInDays} days`}</p>
      </div>
    </div>
  )
}

