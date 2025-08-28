import React, { useState, useEffect } from 'react'
import { Card, Button } from '@/components/common'
import { useContract, useWallet } from '@/hooks'
import { formatAddress, formatEther } from '@/utils'
import { RedPacketInfo } from '@/types'

interface UserRedPacket {
  id: number
  info: RedPacketInfo
}

export const RedPacketManager: React.FC = () => {
  const { 
    isConnected, 
    isVerified, 
    currentPacketId, 
    isLoading,
    getPacketInfo,
    handleRefundRedPacket 
  } = useContract()
  
  const { userAddress } = useWallet()
  const [userPackets, setUserPackets] = useState<UserRedPacket[]>([])
  const [loadingPackets, setLoadingPackets] = useState(false)

  const loadUserPackets = async () => {
    if (!userAddress || !isVerified || currentPacketId === 0) {
      setUserPackets([])
      return
    }

    setLoadingPackets(true)
    const packets: UserRedPacket[] = []

    try {
      for (let i = 0; i < currentPacketId; i++) {
        const info = await getPacketInfo(i)
        if (info && info.sender.toLowerCase() === userAddress.toLowerCase()) {
          packets.push({ id: i, info })
        }
      }
      setUserPackets(packets)
    } catch (error) {
      console.error('Failed to load user packets:', error)
    } finally {
      setLoadingPackets(false)
    }
  }

  useEffect(() => {
    loadUserPackets()
  }, [userAddress, isVerified, currentPacketId])

  const handleRefund = async (packetId: number) => {
    await handleRefundRedPacket(packetId)
    // 刷新列表
    setTimeout(() => {
      loadUserPackets()
    }, 2000)
  }

  const canRefund = (info: RedPacketInfo) => {
    return !info.remainingAmount.isZero()
  }

  if (!isConnected) {
    return (
      <Card title="我的红包" icon="🎁">
        <div className="text-center py-8 text-gray-500">
          <p>请先连接钱包</p>
        </div>
      </Card>
    )
  }

  if (!isVerified) {
    return (
      <Card title="我的红包" icon="🎁">
        <div className="text-center py-8 text-gray-500">
          <p>请先验证合约</p>
        </div>
      </Card>
    )
  }

  return (
    <Card title="我的红包" icon="🎁">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-600">
            钱包地址: {formatAddress(userAddress || '')}
          </p>
          <Button
            size="sm"
            onClick={loadUserPackets}
            loading={loadingPackets}
            disabled={isLoading}
          >
            刷新
          </Button>
        </div>

        {loadingPackets ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary-500 border-t-transparent mx-auto mb-2"></div>
            <p className="text-gray-500">加载中...</p>
          </div>
        ) : userPackets.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>📭 暂无创建的红包</p>
            <p className="text-sm mt-2">创建红包后会在这里显示</p>
          </div>
        ) : (
          <div className="space-y-3">
            {userPackets.map((packet) => (
              <div
                key={packet.id}
                className="border border-gray-200 rounded-lg p-4 bg-gray-50"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-semibold text-gray-800">
                        红包 #{packet.id}
                      </h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        packet.info.isActive 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-gray-100 text-gray-500'
                      }`}>
                        {packet.info.isActive ? '活跃' : '已结束'}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                      <div>
                        <span className="font-medium">总金额:</span>{' '}
                        {formatEther(packet.info.totalAmount)} ETH
                      </div>
                      <div>
                        <span className="font-medium">剩余金额:</span>{' '}
                        <span className={packet.info.remainingAmount.isZero() ? 'text-gray-400' : 'text-green-600'}>
                          {formatEther(packet.info.remainingAmount)} ETH
                        </span>
                      </div>
                      <div>
                        <span className="font-medium">总数量:</span>{' '}
                        {packet.info.totalCount} 个
                      </div>
                      <div>
                        <span className="font-medium">剩余数量:</span>{' '}
                        <span className={packet.info.remainingCount === 0 ? 'text-gray-400' : 'text-orange-600'}>
                          {packet.info.remainingCount} 个
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="ml-4">
                    {canRefund(packet.info) ? (
                      <Button
                        variant="warning"
                        size="sm"
                        onClick={() => handleRefund(packet.id)}
                        disabled={isLoading}
                        loading={isLoading}
                      >
                        退款
                      </Button>
                    ) : (
                      <Button
                        variant="secondary"
                        size="sm"
                        disabled
                      >
                        已完成
                      </Button>
                    )}
                  </div>
                </div>
                
                {canRefund(packet.info) && (
                  <div className="mt-3 p-2 bg-yellow-50 border border-yellow-200 rounded text-xs text-yellow-700">
                    💡 点击退款按钮可以取回剩余的 {formatEther(packet.info.remainingAmount)} ETH
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {userPackets.length > 0 && (
          <div className="text-center text-xs text-gray-500 pt-4 border-t">
            <p>共创建了 {userPackets.length} 个红包</p>
            <p>
              可退款红包: {userPackets.filter(p => canRefund(p.info)).length} 个 |{' '}
              已完成红包: {userPackets.filter(p => !canRefund(p.info)).length} 个
            </p>
          </div>
        )}
      </div>
    </Card>
  )
}
