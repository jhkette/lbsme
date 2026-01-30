"use client"
 
import {useMemo, useState} from "react"
import { addDays, format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
 
import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

 
export default function DatePickerComponent({
  onDateChange,
}: {
  onDateChange?: (date: Date) => void
}) {
  const [date, setDate] = useState<Date>()
  const minDate = useMemo(() => addDays(new Date(), 1), []);
 
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          data-empty={!date}
          className="data-[empty=true]:text-muted-foreground border border-gray-300 h-12 my-2 w-full cursor-pointer justify-start text-left font-normal"
        >
          <CalendarIcon />
          {date ? format(date, "yyyy-MM-dd") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full text-left p-0 z-1000 relative left-0 border border-gray-300">
        <Calendar
          mode="single"
          selected={date}
          fromDate={minDate}
          disabled={{ before: minDate }}
          
          onSelect={(selectedDate) => {
            setDate(selectedDate);
            if (selectedDate) {
              onDateChange?.(selectedDate);
            }
          }}
        />
      </PopoverContent>
    </Popover>
  )
}