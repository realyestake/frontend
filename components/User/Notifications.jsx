import React from 'react';
import RequestCard from '../Admin/RequestCard';
import RequestCardMobile from '../Admin/RequestCardMobile';
import NotificationCard from './Card/NotificationCard';


const Notifications = ({_id, notifications}) => {
  console.log("okkkkk", _id);
  return (
    <>

        <div className='flex flex-col-reverse gap-4 mt-4'>
          {notifications && notifications.map((notification, index) => (
            <NotificationCard key={index} notification={notification} />
          ))}
          {notifications && notifications.length === 0 && (
            <div className='flex justify-center items-center h-[300px]'>
              <p className='text-white text-[18px] font-normal'>No Notifications</p>
            </div>
          )}
          {notifications==undefined && (
            <div className='flex justify-center items-center h-[300px]'>
              <p className='text-white text-[18px] font-normal'>Someting went Wrong</p>
            </div>
          )}
        </div>


    </>
  )
}

export default Notifications