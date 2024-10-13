'use client'

import { CalendarIcon } from '@radix-ui/react-icons'
import { format } from 'date-fns'
import * as React from 'react'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'

type DatePickerProps = {
   selectedDate?: Date
   onDateChange: (date: Date | undefined) => void
   placeholderText?: string
   buttonClassName?: string
   disableFuture?: boolean // New prop to disable future dates
}

export const DatePicker: React.FC<DatePickerProps> = ({
   selectedDate,
   onDateChange,
   placeholderText = 'Pick a date',
   buttonClassName = '',
   disableFuture = false // Default to allowing future dates
}) => {
   const [date, setDate] = React.useState<Date | undefined>(selectedDate)

   // When the date changes, call the provided onDateChange function
   const handleDateChange = (newDate: Date | undefined) => {
      setDate(newDate)
      onDateChange(newDate)
   }

   // Define the maximum selectable date (if disableFuture is true, limit to today)
   const today = new Date()
   const maxDate = disableFuture ? today : undefined

   return (
      <Popover>
         <PopoverTrigger asChild>
            <Button
               variant={'outline'}
               className={cn('w-[240px] justify-start text-left font-normal', buttonClassName)}
            >
               <CalendarIcon className='mr-2 h-4 w-4' />
               {date ? format(date, 'PPP') : <span>{placeholderText}</span>}
            </Button>
         </PopoverTrigger>
         <PopoverContent className='w-auto p-0' align='start'>
            <Calendar
               mode='single'
               selected={date}
               onSelect={handleDateChange}
               initialFocus
               toDate={maxDate} // Restrict selectable dates to today or earlier
            />
         </PopoverContent>
      </Popover>
   )
}
