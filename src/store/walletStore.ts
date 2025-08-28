import { create } from 'zustand'
import { ethers } from 'ethers'
import { WalletState } from '@/types'
import { SEPOLIA_NETWORK, NETWORK_STATUS } from '@/constants'
import { isMetaMaskInstalled } from '@/utils'

interface WalletActions {
  initializeProvider: () => Promise<void>
  connectWallet: () => Promise<void>
  disconnectWallet: () => void
  checkNetwork: () => Promise<void>
  setNetworkStatus: (status: string) => void
  setError: (error: string | null) => void
}

type WalletStore = WalletState & WalletActions

export const useWalletStore = create<WalletStore>((set, get) => ({
  // State
  provider: null,
  signer: null,
  userAddress: null,
  isConnected: false,
  isConnecting: false,
  networkStatus: NETWORK_STATUS.CHECKING,
  error: null,

  // Actions
  initializeProvider: async () => {
    try {
      let provider: ethers.providers.Web3Provider | ethers.providers.JsonRpcProvider

      if (isMetaMaskInstalled()) {
        provider = new ethers.providers.Web3Provider(window.ethereum)
        set({ networkStatus: NETWORK_STATUS.METAMASK_CONNECTED })
      } else {
        provider = new ethers.providers.JsonRpcProvider(SEPOLIA_NETWORK.rpcUrl)
        set({ networkStatus: NETWORK_STATUS.PUBLIC_RPC })
      }

      set({ provider, error: null })

      // 检查网络
      const network = await provider.getNetwork()
      if (network.chainId === SEPOLIA_NETWORK.chainId) {
        set({ networkStatus: NETWORK_STATUS.SEPOLIA_CONNECTED })
      } else {
        set({ networkStatus: NETWORK_STATUS.WRONG_NETWORK })
      }
    } catch (error) {
      console.error('Provider initialization failed:', error)
      set({ 
        error: `网络连接失败: ${error instanceof Error ? error.message : '未知错误'}`,
        networkStatus: NETWORK_STATUS.CONNECTION_FAILED
      })
    }
  },

  connectWallet: async () => {
    const { provider } = get()
    
    if (!isMetaMaskInstalled()) {
      set({ error: '请安装 MetaMask' })
      return
    }

    if (!provider || !('send' in provider)) {
      set({ error: 'Provider 未初始化' })
      return
    }

    set({ isConnecting: true, error: null })

    try {
      // 请求账户权限
      await window.ethereum.request({ method: 'eth_requestAccounts' })
      
      const web3Provider = provider as ethers.providers.Web3Provider
      const signer = web3Provider.getSigner()
      const userAddress = await signer.getAddress()

      set({
        signer,
        userAddress,
        isConnected: true,
        isConnecting: false,
        error: null
      })

      // 监听账户变化
      window.ethereum.on('accountsChanged', (accounts: string[]) => {
        if (accounts.length === 0) {
          get().disconnectWallet()
        } else {
          set({ userAddress: accounts[0] })
        }
      })

      // 监听网络变化
      window.ethereum.on('chainChanged', () => {
        window.location.reload()
      })

    } catch (error) {
      console.error('Wallet connection failed:', error)
      set({
        error: `钱包连接失败: ${error instanceof Error ? error.message : '未知错误'}`,
        isConnecting: false
      })
    }
  },

  disconnectWallet: () => {
    set({
      signer: null,
      userAddress: null,
      isConnected: false,
      isConnecting: false,
      error: null
    })
  },

  checkNetwork: async () => {
    const { provider } = get()
    if (!provider) return

    try {
      const network = await provider.getNetwork()
      if (network.chainId === SEPOLIA_NETWORK.chainId) {
        set({ networkStatus: NETWORK_STATUS.SEPOLIA_CONNECTED, error: null })
      } else {
        set({ 
          networkStatus: NETWORK_STATUS.WRONG_NETWORK,
          error: '请切换到 Sepolia 测试网'
        })
      }
    } catch (error) {
      set({ 
        networkStatus: NETWORK_STATUS.CONNECTION_FAILED,
        error: '网络检查失败'
      })
    }
  },

  setNetworkStatus: (status: string) => {
    set({ networkStatus: status })
  },

  setError: (error: string | null) => {
    set({ error })
  }
}))
