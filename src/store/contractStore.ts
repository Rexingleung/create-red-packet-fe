import { create } from 'zustand'
import { ethers } from 'ethers'
import { ContractState, RedPacketInfo, EventLog } from '@/types'
import { CONTRACT_ABI, GAS_LIMITS } from '@/constants'
import { useWalletStore } from './walletStore'

interface ContractActions {
  setAddress: (address: string) => void
  verifyContract: () => Promise<boolean>
  createRedPacket: (count: number, amount: string) => Promise<boolean>
  claimRedPacket: (packetId: number) => Promise<boolean>
  refundRedPacket: (packetId: number) => Promise<boolean>
  getPacketInfo: (packetId: number) => Promise<RedPacketInfo | null>
  hasClaimed: (packetId: number, userAddress: string) => Promise<boolean>
  getCurrentPacketId: () => Promise<number>
  queryEvents: () => Promise<EventLog[]>
  testReadFunctions: () => Promise<boolean>
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  reset: () => void
}

type ContractStore = ContractState & ContractActions

export const useContractStore = create<ContractStore>((set, get) => ({
  // State
  address: '',
  contract: null,
  isVerified: false,
  currentPacketId: 0,
  isLoading: false,
  error: null,

  // Actions
  setAddress: (address: string) => {
    set({ address, isVerified: false, contract: null, error: null })
  },

  verifyContract: async () => {
    const { address } = get()
    const { provider } = useWalletStore.getState()

    if (!address) {
      set({ error: '请输入合约地址' })
      return false
    }

    if (!provider) {
      set({ error: 'Provider 未初始化' })
      return false
    }

    set({ isLoading: true, error: null })

    try {
      // 检查合约代码
      const code = await provider.getCode(address)
      if (code === '0x') {
        set({ error: '合约不存在或未部署', isLoading: false })
        return false
      }

      // 创建合约实例
      const contract = new ethers.Contract(address, CONTRACT_ABI, provider)
      
      // 测试基本功能
      const currentId = await contract.getCurrentPacketId()
      
      set({
        contract,
        currentPacketId: currentId.toNumber(),
        isVerified: true,
        isLoading: false,
        error: null
      })

      return true
    } catch (error) {
      console.error('Contract verification failed:', error)
      set({
        error: `验证失败: ${error instanceof Error ? error.message : '未知错误'}`,
        isLoading: false,
        isVerified: false
      })
      return false
    }
  },

  createRedPacket: async (count: number, amount: string) => {
    const { contract } = get()
    const { signer } = useWalletStore.getState()

    if (!contract || !signer) {
      set({ error: '请先连接钱包并验证合约' })
      return false
    }

    set({ isLoading: true, error: null })

    try {
      const contractWithSigner = contract.connect(signer)
      const tx = await contractWithSigner.createRedPacket(count, {
        value: ethers.utils.parseEther(amount),
        gasLimit: GAS_LIMITS.CREATE_PACKET
      })

      await tx.wait()
      
      // 更新当前红包ID
      const newCurrentId = await contract.getCurrentPacketId()
      set({ currentPacketId: newCurrentId.toNumber(), isLoading: false })

      return true
    } catch (error) {
      console.error('Create red packet failed:', error)
      set({
        error: `创建红包失败: ${error instanceof Error ? error.message : '未知错误'}`,
        isLoading: false
      })
      return false
    }
  },

  claimRedPacket: async (packetId: number) => {
    const { contract } = get()
    const { signer } = useWalletStore.getState()

    if (!contract || !signer) {
      set({ error: '请先连接钱包并验证合约' })
      return false
    }

    set({ isLoading: true, error: null })

    try {
      const contractWithSigner = contract.connect(signer)
      const tx = await contractWithSigner.claimRedPacket(packetId, {
        gasLimit: GAS_LIMITS.CLAIM_PACKET
      })

      await tx.wait()
      set({ isLoading: false })

      return true
    } catch (error) {
      console.error('Claim red packet failed:', error)
      set({
        error: `领取红包失败: ${error instanceof Error ? error.message : '未知错误'}`,
        isLoading: false
      })
      return false
    }
  },

  refundRedPacket: async (packetId: number) => {
    const { contract } = get()
    const { signer } = useWalletStore.getState()

    if (!contract || !signer) {
      set({ error: '请先连接钱包并验证合约' })
      return false
    }

    set({ isLoading: true, error: null })

    try {
      const contractWithSigner = contract.connect(signer)
      const tx = await contractWithSigner.refundRedPacket(packetId, {
        gasLimit: GAS_LIMITS.REFUND_PACKET
      })

      await tx.wait()
      set({ isLoading: false })

      return true
    } catch (error) {
      console.error('Refund red packet failed:', error)
      set({
        error: `退款失败: ${error instanceof Error ? error.message : '未知错误'}`,
        isLoading: false
      })
      return false
    }
  },

  getPacketInfo: async (packetId: number): Promise<RedPacketInfo | null> => {
    const { contract } = get()
    if (!contract) return null

    try {
      const info = await contract.getPacketInfo(packetId)
      return {
        sender: info[0],
        totalAmount: info[1],
        remainingAmount: info[2],
        totalCount: info[3].toNumber(),
        remainingCount: info[4].toNumber(),
        isActive: info[5]
      }
    } catch (error) {
      console.error('Get packet info failed:', error)
      return null
    }
  },

  hasClaimed: async (packetId: number, userAddress: string): Promise<boolean> => {
    const { contract } = get()
    if (!contract) return false

    try {
      return await contract.hasClaimed(packetId, userAddress)
    } catch (error) {
      console.error('Check claimed status failed:', error)
      return false
    }
  },

  getCurrentPacketId: async (): Promise<number> => {
    const { contract } = get()
    if (!contract) return 0

    try {
      const currentId = await contract.getCurrentPacketId()
      const id = currentId.toNumber()
      set({ currentPacketId: id })
      return id
    } catch (error) {
      console.error('Get current packet ID failed:', error)
      return 0
    }
  },

  queryEvents: async (): Promise<EventLog[]> => {
    const { contract } = get()
    if (!contract) return []

    set({ isLoading: true })

    try {
      const events: EventLog[] = []

      // 查询 PacketCreated 事件
      const createdFilter = contract.filters.PacketCreated()
      const createdEvents = await contract.queryFilter(createdFilter, -1000)
      
      createdEvents.forEach(event => {
        if (event.args) {
          events.push({
            type: 'PacketCreated',
            packetId: event.args.packetId.toNumber(),
            address: event.args.sender,
            amount: ethers.utils.formatEther(event.args.totalAmount),
            count: event.args.totalCount.toNumber(),
            blockNumber: event.blockNumber,
            transactionHash: event.transactionHash
          })
        }
      })

      // 查询 PacketClaimed 事件
      const claimedFilter = contract.filters.PacketClaimed()
      const claimedEvents = await contract.queryFilter(claimedFilter, -1000)
      
      claimedEvents.forEach(event => {
        if (event.args) {
          events.push({
            type: 'PacketClaimed',
            packetId: event.args.packetId.toNumber(),
            address: event.args.claimer,
            amount: ethers.utils.formatEther(event.args.amount),
            blockNumber: event.blockNumber,
            transactionHash: event.transactionHash
          })
        }
      })

      // 查询 PacketRefunded 事件
      const refundedFilter = contract.filters.PacketRefunded()
      const refundedEvents = await contract.queryFilter(refundedFilter, -1000)
      
      refundedEvents.forEach(event => {
        if (event.args) {
          events.push({
            type: 'PacketRefunded',
            packetId: event.args.packetId.toNumber(),
            address: event.args.sender,
            amount: ethers.utils.formatEther(event.args.refundAmount),
            blockNumber: event.blockNumber,
            transactionHash: event.transactionHash
          })
        }
      })

      set({ isLoading: false })
      return events.sort((a, b) => b.blockNumber - a.blockNumber)
    } catch (error) {
      console.error('Query events failed:', error)
      set({ 
        error: `查询事件失败: ${error instanceof Error ? error.message : '未知错误'}`,
        isLoading: false
      })
      return []
    }
  },

  testReadFunctions: async (): Promise<boolean> => {
    const { contract } = get()
    const { userAddress } = useWalletStore.getState()

    if (!contract) {
      set({ error: '请先验证合约' })
      return false
    }

    set({ isLoading: true, error: null })

    try {
      // 测试 getCurrentPacketId
      const currentId = await contract.getCurrentPacketId()
      set({ currentPacketId: currentId.toNumber() })

      // 如果有红包，测试 getPacketInfo
      if (currentId.gt(0)) {
        await contract.getPacketInfo(0)
        
        // 如果有用户地址，测试 hasClaimed
        if (userAddress) {
          await contract.hasClaimed(0, userAddress)
        }
      }

      set({ isLoading: false })
      return true
    } catch (error) {
      console.error('Test read functions failed:', error)
      set({
        error: `读取功能测试失败: ${error instanceof Error ? error.message : '未知错误'}`,
        isLoading: false
      })
      return false
    }
  },

  setLoading: (loading: boolean) => {
    set({ isLoading: loading })
  },

  setError: (error: string | null) => {
    set({ error })
  },

  reset: () => {
    set({
      address: '',
      contract: null,
      isVerified: false,
      currentPacketId: 0,
      isLoading: false,
      error: null
    })
  }
}))
