import { ethers } from 'ethers'

export interface WalletState {
  provider: ethers.providers.Web3Provider | ethers.providers.JsonRpcProvider | null
  signer: ethers.Signer | null
  userAddress: string | null
  isConnected: boolean
  isConnecting: boolean
  networkStatus: string
  error: string | null
}

export interface ContractState {
  address: string
  contract: ethers.Contract | null
  isVerified: boolean
  currentPacketId: number
  isLoading: boolean
  error: string | null
}

export interface RedPacketInfo {
  sender: string
  totalAmount: ethers.BigNumber
  remainingAmount: ethers.BigNumber
  totalCount: number
  remainingCount: number
  isActive: boolean
}

export interface LogEntry {
  timestamp: string
  message: string
  type: 'info' | 'success' | 'error' | 'warning'
}

export interface EventLog {
  type: 'PacketCreated' | 'PacketClaimed' | 'PacketRefunded'
  packetId: number
  address: string
  amount?: string
  count?: number
  blockNumber: number
  transactionHash: string
}

export interface Network {
  chainId: number
  name: string
  rpcUrl: string
}
