import React from 'react'

const NotificationCard = ({notification}) => {
  return (
    <div className='px-3 py-4 bg-[#ffffff38] rounded-[10px] border-2 border-[#ffffff1a] md:text-[16px] text-[12px]'>
        {notification}
    </div>
  )
}

export default NotificationCard