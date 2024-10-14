import { FC, ReactNode } from 'react'

import { cn } from '@/lib/utils'

interface CenterLayoutProps {
   children: ReactNode
   variant?: 'default' | 'wide'
}

const CenterLayout: FC<CenterLayoutProps> = ({ children, variant = 'default' }) => {
   return (
      <div className={cn('mx-auto', variant === 'default' ? 'max-w-4xl' : 'max-w-6xl')}>
         {children}
      </div>
   )
}

export default CenterLayout
