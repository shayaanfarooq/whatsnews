'use client'

import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons'
import { useState, useEffect } from 'react'

import { Button } from '@/components/ui/button'
import {
   Command,
   CommandEmpty,
   CommandGroup,
   CommandInput,
   CommandItem,
   CommandList
} from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'

type Option = {
   label: string
   value: string
}

type MultiSelectComboboxProps = {
   options: Option[]
   selectedValues: string[]
   onApply: (selected: string[]) => void
   placeholder?: string
   multiSelect?: boolean // Make multi-select optional
   label?: string
}

export function MultiSelectCombobox({
   options,
   selectedValues,
   onApply,
   placeholder = 'Select...',
   multiSelect = true, // Default to multi-select
   label = ''
}: MultiSelectComboboxProps) {
   const [open, setOpen] = useState(false)
   const [tempSelectedValues, setTempSelectedValues] = useState<string[]>(selectedValues)
   const [query, setQuery] = useState('')

   // Update tempSelectedValues when menu is opened or closed
   useEffect(() => {
      setTempSelectedValues(selectedValues) // Reset to actual selected values when menu opens
   }, [open, selectedValues])

   const filteredOptions =
      query === ''
         ? options
         : options.filter((option) => option.label.toLowerCase().includes(query.toLowerCase()))

   const toggleSelection = (value: string) => {
      if (multiSelect) {
         setTempSelectedValues((prev) =>
            prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
         )
      } else {
         setTempSelectedValues([value]) // For single-select, replace the selection
      }
   }

   const handleApply = () => {
      onApply(tempSelectedValues) // Apply changes
      setOpen(false) // Close the menu
   }

   return (
      <div className='flex flex-col space-y-2'>
         <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
               <Button
                  variant='outline'
                  role='combobox'
                  className={cn('w-[200px] justify-between')}
               >
                  {tempSelectedValues.length > 0
                     ? multiSelect
                        ? `${label ? `${label}: ` : ''}${tempSelectedValues.length} selected`
                        : options.find((opt) => opt.value === tempSelectedValues[0])?.label
                     : placeholder}
                  <CaretSortIcon className='ml-2 h-4 w-4 shrink-0 opacity-50' />
               </Button>
            </PopoverTrigger>
            <PopoverContent className='w-[200px] p-0'>
               <Command>
                  <CommandInput
                     placeholder='Search...'
                     className='h-9'
                     value={query}
                     onValueChange={setQuery}
                  />
                  <CommandList>
                     <CommandEmpty>No options found.</CommandEmpty>
                     <CommandGroup>
                        {filteredOptions.map((option) => (
                           <CommandItem
                              key={option.value}
                              onSelect={() => toggleSelection(option.value)}
                           >
                              {option.label}
                              {multiSelect ? (
                                 <CheckIcon
                                    className={cn(
                                       'ml-auto h-4 w-4',
                                       tempSelectedValues.includes(option.value)
                                          ? 'opacity-100'
                                          : 'opacity-0'
                                    )}
                                 />
                              ) : (
                                 <CheckIcon
                                    className={cn(
                                       'ml-auto h-4 w-4',
                                       tempSelectedValues[0] === option.value
                                          ? 'opacity-100'
                                          : 'opacity-0'
                                    )}
                                 />
                              )}
                           </CommandItem>
                        ))}
                     </CommandGroup>
                  </CommandList>
               </Command>
               <div className='flex justify-between p-2 border-t border-gray-200'>
                  {multiSelect && (
                     <Button variant='outline' size='sm' onClick={() => setTempSelectedValues([])}>
                        Clear All
                     </Button>
                  )}
                  <Button variant='default' size='sm' onClick={handleApply}>
                     Apply
                  </Button>
               </div>
            </PopoverContent>
         </Popover>
      </div>
   )
}
