import React from 'react'
import { useWallet } from '@/hooks'

export const NetworkStatus: React.FC = () => {
  const { networkStatus } = useWallet()

  return (
    <div className="text-center mb-6 p-4 bg-primary-50 rounded-lg border border-primary-200">
      <div className="text-primary-800 font-medium">
        {networkStatus}
      </div>
    </div>
  )
}
