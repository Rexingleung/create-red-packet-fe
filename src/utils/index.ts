import { ethers } from 'ethers'
import { LogEntry } from '@/types'

export const formatAddress = (address: string): string => {
  if (!address) return ''
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}

export const formatEther = (value: ethers.BigNumber): string => {
  return parseFloat(ethers.utils.formatEther(value)).toFixed(6)
}

export const formatTimestamp = (): string => {
  return new Date().toLocaleTimeString('zh-CN', { 
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  })
}

export const createLogEntry = (message: string, type: LogEntry['type'] = 'info'): LogEntry => {
  return {
    timestamp: formatTimestamp(),
    message,
    type
  }
}

export const getStatusIcon = (type: LogEntry['type']): string => {
  const icons = {
    success: '✅',
    error: '❌',
    warning: '⚠️',
    info: 'ℹ️'
  }
  return icons[type]
}

export const validateAddress = (address: string): boolean => {
  try {
    ethers.utils.getAddress(address)
    return true
  } catch {
    return false
  }
}

export const sleep = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export const truncateText = (text: string, maxLength: number = 50): string => {
  if (text.length <= maxLength) return text
  return `${text.slice(0, maxLength)}...`
}

export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    return false
  }
}

export const isMetaMaskInstalled = (): boolean => {
  return typeof window !== 'undefined' && typeof window.ethereum !== 'undefined'
}

export const switchToSepolia = async (): Promise<boolean> => {
  if (!isMetaMaskInstalled()) return false
  
  try {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: '0xaa36a7' }] // Sepolia chain ID
    })
    return true
  } catch (error: any) {
    if (error.code === 4902) {
      try {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [{
            chainId: '0xaa36a7',
            chainName: 'Sepolia Test Network',
            nativeCurrency: {
              name: 'ETH',
              symbol: 'ETH',
              decimals: 18
            },
            rpcUrls: ['https://sepolia.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161'],
            blockExplorerUrls: ['https://sepolia.etherscan.io/']
          }]
        })
        return true
      } catch {
        return false
      }
    }
    return false
  }
}
