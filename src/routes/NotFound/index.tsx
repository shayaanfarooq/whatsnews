import CenterLayout from '@/components/Layout/CenterLayout'
import Message from '@/components/Message'

const NotFoundPage = () => {
   return (
      <div className='p-6'>
         <CenterLayout>
            <Message heading='404 Not Found' body='The page you are trying to access is invalid' />
         </CenterLayout>
      </div>
   )
}

export default NotFoundPage
