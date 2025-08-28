import { useContractStore, useLogStore } from '@/store'
import { formatEther } from '@/utils'

export const useContract = () => {
  const {
    address,
    contract,
    isVerified,
    currentPacketId,
    isLoading,
    error,
    setAddress,
    verifyContract,
    createRedPacket,
    claimRedPacket,
    refundRedPacket,
    getPacketInfo,
    hasClaimed,
    getCurrentPacketId,
    queryEvents,
    testReadFunctions,
    setError,
    reset
  } = useContractStore()

  const { addContractLog, addFunctionLog, addEventLog } = useLogStore()

  const handleVerifyContract = async () => {
    addContractLog('开始验证合约...', 'info')
    
    const success = await verifyContract()
    
    if (success) {
      addContractLog('✅ 合约代码验证通过', 'success')
      addContractLog(`当前红包ID: ${currentPacketId}`, 'success')
      
      if (currentPacketId > 0) {
        const packetInfo = await getPacketInfo(0)
        if (packetInfo) {
          addContractLog(`红包信息读取成功:`, 'success')
          addContractLog(`发送者: ${packetInfo.sender}`, 'info')
          addContractLog(`总金额: ${formatEther(packetInfo.totalAmount)} ETH`, 'info')
          addContractLog(`剩余金额: ${formatEther(packetInfo.remainingAmount)} ETH`, 'info')
          addContractLog(`总数量: ${packetInfo.totalCount}`, 'info')
          addContractLog(`剩余数量: ${packetInfo.remainingCount}`, 'info')
          addContractLog(`是否激活: ${packetInfo.isActive}`, 'info')
        }
      }
      
      addContractLog('🎉 合约验证完成！', 'success')
    } else {
      addContractLog(`验证失败: ${error}`, 'error')
    }
  }

  const handleTestReadFunctions = async () => {
    addFunctionLog('测试只读功能...', 'info')
    
    const success = await testReadFunctions()
    
    if (success) {
      addFunctionLog(`✅ getCurrentPacketId(): ${currentPacketId}`, 'success')
      
      if (currentPacketId > 0) {
        addFunctionLog('✅ getPacketInfo(0): 成功读取', 'success')
      }
    } else {
      addFunctionLog(`读取功能测试失败: ${error}`, 'error')
    }
  }

  const handleCreateRedPacket = async (count: number, amount: string) => {
    addFunctionLog(`创建红包: ${count}个, 总额${amount}ETH`, 'info')
    
    const success = await createRedPacket(count, amount)
    
    if (success) {
      addFunctionLog('✅ 红包创建成功!', 'success')
      const newId = await getCurrentPacketId()
      addFunctionLog(`新的红包ID: ${newId - 1}`, 'info')
    } else {
      addFunctionLog(`创建红包失败: ${error}`, 'error')
    }
  }

  const handleClaimRedPacket = async (packetId: number) => {
    addFunctionLog(`尝试抢红包 ID: ${packetId}`, 'info')
    
    const success = await claimRedPacket(packetId)
    
    if (success) {
      addFunctionLog('✅ 红包领取成功!', 'success')
    } else {
      addFunctionLog(`领取红包失败: ${error}`, 'error')
    }
  }

  const handleRefundRedPacket = async (packetId: number) => {
    addFunctionLog(`尝试退款红包 ID: ${packetId}`, 'info')
    
    const success = await refundRedPacket(packetId)
    
    if (success) {
      addFunctionLog('✅ 红包退款成功!', 'success')
    } else {
      addFunctionLog(`退款失败: ${error}`, 'error')
    }
  }

  const handleQueryEvents = async () => {
    addEventLog('查询事件日志...', 'info')
    
    const events = await queryEvents()
    
    if (events.length > 0) {
      addEventLog(`PacketCreated 事件: ${events.filter(e => e.type === 'PacketCreated').length} 个`, 'success')
      addEventLog(`PacketClaimed 事件: ${events.filter(e => e.type === 'PacketClaimed').length} 个`, 'success')
      addEventLog(`PacketRefunded 事件: ${events.filter(e => e.type === 'PacketRefunded').length} 个`, 'success')
      
      events.forEach((event, index) => {
        if (event.type === 'PacketCreated') {
          addEventLog(`${index + 1}. 红包ID:${event.packetId}, 发送者:${event.address.slice(0, 8)}..., 金额:${event.amount}ETH, 数量:${event.count}`, 'info')
        } else if (event.type === 'PacketClaimed') {
          addEventLog(`${index + 1}. 红包ID:${event.packetId}, 领取者:${event.address.slice(0, 8)}..., 金额:${event.amount}ETH`, 'info')
        } else if (event.type === 'PacketRefunded') {
          addEventLog(`${index + 1}. 红包ID:${event.packetId}, 退款者:${event.address.slice(0, 8)}..., 金额:${event.amount}ETH`, 'info')
        }
      })
    } else {
      addEventLog('未找到相关事件', 'warning')
    }
  }

  return {
    address,
    contract,
    isVerified,
    currentPacketId,
    isLoading,
    error,
    setAddress,
    setError,
    reset,
    handleVerifyContract,
    handleTestReadFunctions,
    handleCreateRedPacket,
    handleClaimRedPacket,
    handleRefundRedPacket,
    handleQueryEvents,
    getPacketInfo,
    hasClaimed
  }
}
