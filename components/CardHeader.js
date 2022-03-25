import React from 'react'
import profilePic from '../assets/profile-pic.avif'
import logo from '../assets/logo.png'
import { IoIosNotifications } from 'react-icons/io'
import Image from 'next/image'
import { useContext } from 'react'
import { TinderContext } from '../context/TinderContext'

const style = {
  wrapper: `flex items-center bg-white w-full h-20 p-8 justify-evenly`,
  profileImage: `object-cover rounded-full`,
  logo: `object-contain`,
  notificationIcon: `text-3xl cursor-pointer text-gray-400 absolute`,
  notifications: `h-2 w-2 flex rounded-full relative bg-red-500 -top-3 -right-5`,
}

const CardHeader = () => {
  const { currentUser } = useContext(TinderContext)

  return (
    <div className={style.wrapper}>
      <Image
        src={currentUser?.imageUrl || profilePic}
        width={40}
        height={40}
        alt='profile-pic'
        className={style.profileImage}
      />
      <Image
        src={logo}
        height={150}
        width={200}
        alt='logo'
        className={style.logo}
      />
      <div className='flex items-center'>
        <IoIosNotifications className={style.notificationIcon} />
        <div className={style.notifications} />
      </div>
    </div>
  )
}

export default CardHeader
