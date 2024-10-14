import { X } from 'lucide-react'
import { FC, ReactNode } from 'react'

import { Button } from './button'
import { cn } from '@/lib/utils'

interface HeaderProps {
   title?: ReactNode
   onClose?: () => void
   disableClose?: () => void
   className?: string
   closeButton?: ReactNode
   children?: ReactNode
}

interface BodyProps {
   className?: string
   children?: ReactNode
}

interface FooterProps {
   hideBorder?: boolean
   className?: string
   children?: ReactNode
}

interface DialogProps {
   open: boolean
   onClose?: () => void
   className?: string
   wrapperClassname?: string
   pageClassname?: string
   children?: ReactNode
}

const Dialog: FC<DialogProps> & {
   Header: FC<HeaderProps>
   Body: FC<BodyProps>
   Footer: FC<FooterProps>
} = ({ open, onClose, children, className, wrapperClassname, pageClassname }) => {
   return (
      <div
         tabIndex={-1}
         aria-hidden='true'
         className={cn(
            'fixed left-0 right-0 top-0 z-[49] flex h-[calc(100%)] max-h-full w-full items-center justify-center overflow-y-auto overflow-x-hidden bg-zinc-100 bg-opacity-30',
            !open && 'hidden',
            wrapperClassname
         )}
         onClick={() => onClose?.()}
      >
         <div
            className={cn(
               'relative max-h-full w-full shadow-sm',
               className,
               `min-w-2xl max-w-2xl p-4`
            )}
            onClick={(e) => e.stopPropagation()}
         >
            <div
               className={cn('relative rounded-lg bg-zinc-100 text-zinc-900 shadow', pageClassname)}
            >
               {children}
            </div>
         </div>
      </div>
   )
}

const Header: FC<HeaderProps> = ({ title, onClose, children, className, closeButton }) => {
   return (
      <div className={cn('flex flex-col rounded-t px-6 py-4', className)}>
         <div className='flex items-center justify-between'>
            <h1 className='text-2xl font-bold text-zinc-900'>{title}</h1>
            {closeButton
               ? closeButton
               : !!onClose && (
                    <Button variant='outline' size='icon' className='bg-zinc-100' onClick={onClose}>
                       <X className='size-4 text-gray-400' />
                    </Button>
                 )}
         </div>
         {children}
      </div>
   )
}

const Body: FC<BodyProps> = ({ children, className }) => {
   return <div className={cn('space-y-4 p-6 pt-2', className)}>{children}</div>
}

const Footer: FC<FooterProps> = ({ children, hideBorder = true, className }) => {
   return (
      <div
         className={cn(
            'flex items-center rounded-b p-6',
            hideBorder ? 'pt-0' : 'border-t border-gray-500',
            className
         )}
      >
         {children}
      </div>
   )
}

Dialog.Header = Header
Dialog.Body = Body
Dialog.Footer = Footer

export default Dialog
