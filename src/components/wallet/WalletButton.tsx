import React from 'react'
import { Button } from '@/components/common'
import { useWallet } from '@/hooks'
import { formatAddress } from '@/utils'

export const WalletButton: React.FC = () => {
  const { 
    isConnected, 
    isConnecting, 
    userAddress, 
    connect, 
    disconnect 
  } = useWallet()

  if (isConnected && userAddress) {
    return (
      <div className="flex items-center gap-3">
        <div className="px-3 py-2 bg-success-50 text-success-700 rounded-lg border border-success-200">
          <span className="text-sm font-medium">
            已连接: {formatAddress(userAddress)}
          </span>
        </div>
        <Button variant="secondary" size="sm" onClick={disconnect}>
          断开连接
        </Button>
      </div>
    )
  }

  return (
    <Button 
      onClick={connect}
      loading={isConnecting}
      disabled={isConnecting}
    >
      {isConnecting ? '连接中...' : '连接钱包'}
    </Button>
  )
}
