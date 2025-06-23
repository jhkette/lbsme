import { Subscription } from '@/interfaces/Subscription'
import { format, parseISO } from 'date-fns';
import Image from 'next/image';
import { CalendarPlus } from 'lucide-react';
interface TransactionDetailProps{
    sub: Subscription
}
export default function TransactionDetail(sub: TransactionDetailProps) {
    console.log(sub)
    const icon = sub.sub.merchant.icon
  return (
    <div className='flex flex-row py-2 gap-8 items-center'> {icon != "unknown" ? <Image src={icon} alt={icon} width={40} height={40} className='' /> : <CalendarPlus  color="#ededed" size={40} />}<p>{format(parseISO(sub.sub.dates.lastPaymentDate),"do MMM yyyy")}</p></div>
  )
}

