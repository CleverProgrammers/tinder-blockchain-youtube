import { useState, createContext, useEffect } from 'react'
import { useMoralis } from 'react-moralis'
import { faker } from '@faker-js/faker'

export const TinderContext = createContext()

export const TinderProvider = ({ children }) => {
  const { authenticate, isAuthenticated, user, Moralis } = useMoralis()
  const [cardsData, setCardsData] = useState([])
  const [currentAccount, setCurrentAccount] = useState()
  const [currentUser, setCurrentUser] = useState()

  useEffect(() => {
    checkWalletConnection()

    if (isAuthenticated) {
      requestUsersData(user.get('ethAddress'))
      requestCurrentUserData(user.get('ethAddress'))
    }
  }, [isAuthenticated])

  const checkWalletConnection = async () => {
    if (isAuthenticated) {
      const address = user.get('ethAddress')
      setCurrentAccount(address)
      requestToCreateUserProfile(address, faker.name.findName())
    } else {
      setCurrentAccount('')
    }
  }

  const connectWallet = async () => {
    if (!isAuthenticated) {
      try {
        await authenticate({
          signingMessage: 'Log in using Moralis',
        })
      } catch (error) {
        console.error(error)
      }
    }
  }

  const disconnectWallet = async () => {
    await Moralis.User.logOut()
    setCurrentAccount('')
  }

  const handleRightSwipe = async (cardData, currentUserAddress) => {
    const likeData = {
      likedUser: cardData.walletAddress,
      currentUser: currentUserAddress,
    }

    try {
      await fetch('/api/saveLike', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(likeData),
      })

      const response = await fetch('/api/checkMatches', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(likeData),
      })

      const responseData = await response.json()

      const matchStatus = responseData.data.isMatch

      if (matchStatus) {
        console.log('match')

        const mintData = {
          walletAddresses: [cardData.walletAddress, currentUserAddress],
          names: [cardData.name, currentUser.name],
        }

        await fetch('/api/mintMatchNft', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(mintData),
        })
      }
    } catch (error) {
      console.error(error)
    }
  }

  const requestToCreateUserProfile = async (walletAddress, name) => {
    try {
      await fetch(`/api/createUser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userWalletAddress: walletAddress,
          name: name,
        }),
      })
    } catch (error) {
      console.error(error)
    }
  }

  const requestCurrentUserData = async walletAddress => {
    try {
      const response = await fetch(
        `/api/fetchCurrentUserData?activeAccount=${walletAddress}`,
      )
      const data = await response.json()

      setCurrentUser(data.data)
    } catch (error) {
      console.error(error)
    }
  }

  const requestUsersData = async activeAccount => {
    try {
      const response = await fetch(
        `/api/fetchUsers?activeAccount=${activeAccount}`,
      )
      const data = await response.json()

      setCardsData(data.data)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <TinderContext.Provider
      value={{
        connectWallet,
        disconnectWallet,
        cardsData,
        handleRightSwipe,
        currentAccount,
        currentUser,
      }}
    >
      {children}
    </TinderContext.Provider>
  )
}
