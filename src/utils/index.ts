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
  return new Date().toLocaleTimeString('zh-CN')
}

export const createLogEntry = (
  message: string,
  type: LogEntry['type'] = 'info'
): LogEntry => {
  return {
    timestamp: formatTimestamp(),
    message,
    type
  }
}

export const isValidAddress = (address: string): boolean => {
  try {
    ethers.utils.getAddress(address)
    return true
  } catch {
    return false
  }
}

export const parseEther = (value: string): ethers.BigNumber => {
  return ethers.utils.parseEther(value)
}

export const shortenTxHash = (hash: string): string => {
  if (!hash) return ''
  return `${hash.slice(0, 10)}...${hash.slice(-8)}`
}

export const getErrorMessage = (error: any): string => {
  if (error?.reason) return error.reason
  if (error?.message) return error.message
  if (typeof error === 'string') return error
  return '未知错误'
}

export const sleep = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    return false
  }
}
