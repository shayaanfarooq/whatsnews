import { FC } from 'react'

interface MessageProps {
   heading: string
   body?: string
}

const Message: FC<MessageProps> = ({ heading, body }) => {
   return (
      <div className='flex flex-col gap-4 text-left'>
         <h1 className='text-left text-3xl font-bold text-zinc-900'>{heading}</h1>
         {body && <p className='text-lg text-zinc-700'>{body}</p>}
      </div>
   )
}

export default Message
