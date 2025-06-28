import { Subscription } from '@/interfaces/Subscription'
import { format, parseISO } from 'date-fns';
import Image from 'next/image';
import { Repeat } from 'lucide-react';
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
        {icon != "unknown" ? (
          <Image src={icon} alt={props.sub.displayName} width={50} height={50} />
        ) : (
          <Repeat color="#EDECEC" size={50} />
        )}
          <p className="bg-lbbgblue text-white px-3 py-1 rounded-lg text-xs">
          {" "}
          {props.sub?.paymentMethod
            ? props.sub?.paymentMethod
            : "Unknown"}{" "}
        </p>

         <p className="bg-lbbgblue text-white px-3 py-1 rounded-lg text-xs">
          {" "}
          {props.sub?.type
            ? props.sub?.type
            : "Unknown"}{" "}
        </p>
        <p className={clsx(
          'block max-w-[160px] text-wrap ',
          props.sub.displayName.length > 35 && 'text-[10px]'
        )}>
          {props.sub.displayName && props.sub.displayName}
        </p>
       

      </div>
      <div className='flex flex-col'>
      <p className='font-semibold'>
        {props.renewal
          ? format(parseISO(props.sub.dates.renewalDate), "do MMM yyyy")
          : format(parseISO(props.sub.dates.lastPaymentDate), "do MMM yyyy")}
      </p>
      <p className='text-xs text-orange-400'>{props.renewal && `Subscriptions renews in ${props.sub.dates.endsInDays} days`}</p>
      </div>
    </div>
  )
}

