import React, { useState } from 'react'
import { Card, Input, Button, LogArea } from '@/components/common'
import { WalletButton } from '@/components/wallet'
import { useContract, useWallet } from '@/hooks'
import { useLogStore } from '@/store'
import { DEFAULT_VALUES } from '@/constants'

export const FunctionTesting: React.FC = () => {
  const { 
    isVerified,
    currentPacketId,
    isLoading,
    handleTestReadFunctions,
    handleCreateRedPacket,
    handleClaimRedPacket
  } = useContract()
  
  const { isConnected } = useWallet()
  const { functionLogs } = useLogStore()
  
  const [packetCount, setPacketCount] = useState(DEFAULT_VALUES.PACKET_COUNT.toString())
  const [packetAmount, setPacketAmount] = useState(DEFAULT_VALUES.PACKET_AMOUNT)
  const [packetId, setPacketId] = useState((currentPacketId > 0 ? currentPacketId - 1 : 0).toString())

  const handleCreateClick = () => {
    const count = parseInt(packetCount)
    const amount = packetAmount
    
    if (isNaN(count) || count < 1 || count > 10) {
      alert('红包数量必须在1-10之间')
      return
    }
    
    const amountNum = parseFloat(amount)
    if (isNaN(amountNum) || amountNum < 0.001) {
      alert('红包金额必须大于0.001 ETH')
      return
    }
    
    handleCreateRedPacket(count, amount)
  }

  const handleClaimClick = () => {
    const id = parseInt(packetId)
    
    if (isNaN(id) || id < 0) {
      alert('请输入有效的红包ID')
      return
    }
    
    handleClaimRedPacket(id)
  }

  return (
    <Card title="合约功能测试" icon="🔧">
      <div className="space-y-6">
        {/* 功能按钮区域 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button
            variant="success"
            onClick={handleTestReadFunctions}
            disabled={!isVerified || isLoading}
          >
            测试读取功能
          </Button>
          
          <WalletButton />
          
          <Button
            onClick={handleCreateClick}
            disabled={!isConnected || !isVerified || isLoading}
            loading={isLoading}
          >
            创建红包
          </Button>
          
          <Button
            onClick={handleClaimClick}
            disabled={!isConnected || !isVerified || isLoading}
            loading={isLoading}
          >
            抢红包
          </Button>
        </div>

        {/* 参数输入区域 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            label="红包数量"
            type="number"
            min="1"
            max="10"
            value={packetCount}
            onChange={(e) => setPacketCount(e.target.value)}
            helperText="1-10个红包"
          />
          
          <Input
            label="红包总金额 (ETH)"
            type="number"
            step="0.001"
            min="0.001"
            value={packetAmount}
            onChange={(e) => setPacketAmount(e.target.value)}
            helperText="最少0.001 ETH"
          />
          
          <Input
            label="红包ID (用于抢红包)"
            type="number"
            min="0"
            value={packetId}
            onChange={(e) => setPacketId(e.target.value)}
            helperText={`当前最新ID: ${currentPacketId > 0 ? currentPacketId - 1 : 0}`}
          />
        </div>

        {/* 日志显示区域 */}
        <LogArea 
          logs={functionLogs}
          placeholder="功能测试日志将在这里显示..."
        />
      </div>
    </Card>
  )
}
