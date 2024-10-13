import { FC, ReactNode } from 'react'

interface CenterLayoutProps {
   children: ReactNode
}

const CenterLayout: FC<CenterLayoutProps> = ({ children }) => {
   return <div className='mx-auto max-w-4xl'>{children}</div>
}

export default CenterLayout
