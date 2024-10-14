import CenterLayout from '@/components/Layout/CenterLayout'
import Message from '@/components/Message'

// 404
const NotFoundPage = () => {
   return (
      <CenterLayout className='w-full'>
         <Message heading='404 Not Found' body='The page you are trying to access is invalid' />
      </CenterLayout>
   )
}

export default NotFoundPage
