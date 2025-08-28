import { useEffect } from 'react'
import { useWalletStore } from '@/store'

export const useWallet = () => {
  const {
    provider,
    signer,
    userAddress,
    isConnected,
    isConnecting,
    networkStatus,
    error,
    initializeProvider,
    connectWallet,
    disconnectWallet,
    checkNetwork,
    setError
  } = useWalletStore()

  useEffect(() => {
    initializeProvider()
  }, [initializeProvider])

  const connect = async () => {
    if (isConnecting) return
    await connectWallet()
  }

  const disconnect = () => {
    disconnectWallet()
  }

  return {
    provider,
    signer,
    userAddress,
    isConnected,
    isConnecting,
    networkStatus,
    error,
    connect,
    disconnect,
    checkNetwork,
    setError
  }
}
