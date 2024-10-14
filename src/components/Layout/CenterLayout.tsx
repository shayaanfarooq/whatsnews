import { FC, ReactNode } from 'react'

import { cn } from '@/lib/utils'

interface CenterLayoutProps {
   children: ReactNode
   className?: string
}

const CenterLayout: FC<CenterLayoutProps> = ({ children, className }) => {
   return <div className={cn('mx-auto max-w-4xl', className)}>{children}</div>
}

export default CenterLayout
