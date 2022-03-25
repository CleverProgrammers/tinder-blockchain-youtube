import Image from 'next/image'
import fire from '../assets/fire.png'
import { useContext } from 'react'
import { TinderContext } from '../context/TinderContext'

const style = {
  wrapper: `h-24 py-11 text-white flex w-screen items-center px-16 justify-between`,
  main: `flex items-center gap-4`,
  tinderText: `text-5xl font-semibold mr-8 cursor-pointer`,
  leftMenu: `flex gap-8 text-lg`,
  menuItem: `cursor-pointer hover:text-red-400 duration-300 hover:scale-110`,
  rightMenu: `flex gap-3 items-center`,
  currentAccount: `px-2 py-1 border border-gray-500 rounded-full flex items-center`,
  accountAddress: `ml-2`,
  authButton: `bg-white font-bold text-red-500 px-6 py-3 items-center ml-4 rounded-lg hover:bg-red-500 duration-300 hover:text-white`,
}

const Header = () => {
  const { connectWallet, currentAccount, disconnectWallet } =
    useContext(TinderContext)

  return (
    <div
      className={`${style.wrapper} ${
        currentAccount ? 'bg-gray-900' : 'bg-transparent fixed'
      }`}
    >
      <div className={style.main}>
        <Image src={fire} alt='fire' height={45} width={45} />
        <h1 className={style.tinderText}>tinder</h1>

        <div className={style.leftMenu}>
          <div className={style.menuItem}>Products</div>
          <div className={style.menuItem}>Learn</div>
          <div className={style.menuItem}>Safety</div>
          <div className={style.menuItem}>Support</div>
          <div className={style.menuItem}>Download</div>
        </div>
      </div>
      <div className={style.rightMenu}>
        <div>ENGLISH</div>
        {currentAccount ? (
          <>
            <div className={style.currentAccount}>
              <Image
                src={
                  'https://moralis.io/wp-content/uploads/2021/05/moralisWhiteLogo.svg'
                }
                alt='moralis'
                height={20}
                width={20}
              />
              <span className={style.accountAddress}>
                {currentAccount.slice(0, 6)}...{currentAccount.slice(39)}
              </span>
            </div>
            <button
              className={style.authButton}
              onClick={() => disconnectWallet()}
            >
              Logout
            </button>
          </>
        ) : (
          <button className={style.authButton} onClick={() => connectWallet()}>
            Login
          </button>
        )}
      </div>
    </div>
  )
}

export default Header
