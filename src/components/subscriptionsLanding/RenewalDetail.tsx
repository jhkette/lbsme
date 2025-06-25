import { Subscription } from '@/interfaces/Subscription'
import { format, parseISO } from 'date-fns';
import Image from 'next/image';
import { Repeat } from 'lucide-react';
interface TransactionDetailProps{
    sub: Subscription
    renewal: Boolean
}
export default function TransactionDetail(props: TransactionDetailProps) {
  console.log(props, "transaction props")
   if (!props.sub) {
    return null;
  }
    console.log(props, "renewaldetail")
    const icon = props.sub.merchant.icon
  return (
    
    <div className='flex flex-row justify-between py-2 gap-8 items-center border-b-1'> 
    <div className='flex flex-row items-center'>
    {icon != "unknown" ? <Image src={icon} alt={props.sub.displayName} width={50} height={50} /> : 
    <Repeat  color="#EDECEC" size={50}  />}<p className='font-semibold'>{props.sub.displayName && props.sub.displayName}</p>
    </div>
    <p className='font-semibold'>{props.renewal ? format(parseISO(props.sub.dates.renewalDate),"do MMM yyyy") :format(parseISO(props.sub.dates.lastPaymentDate),"do MMM yyyy")}</p></div>
  )
}

