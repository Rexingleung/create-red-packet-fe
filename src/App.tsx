import React from 'react'
import { 
  NetworkStatus,
  ContractVerification, 
  FunctionTesting,
  RedPacketManager,
  EventQuery 
} from '@/components'

const App: React.FC = () => {
  return (
    <div className="p-5 min-h-screen bg-gradient-to-br from-purple-400 via-blue-500 to-blue-600">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl">
            🧧 红包合约验证工具
          </h1>
          <p className="text-lg text-blue-100">
            Sepolia 测试网智能合约验证与测试
          </p>
        </div>

        {/* Network Status */}
        <NetworkStatus />

        {/* Main Content */}
        <div className="space-y-8">
          {/* Contract Verification */}
          <ContractVerification />
          
          {/* Function Testing */}
          <FunctionTesting />

          {/* Red Packet Manager */}
          <RedPacketManager />
          
          {/* Event Query */}
          <EventQuery />
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-blue-100">
          <p className="text-sm">
            基于 React + TypeScript + TailwindCSS + Zustand 构建
          </p>
          <p className="mt-2 text-xs opacity-80">
            支持退款功能，防止红包资金锁定 | 智能检测自转账防护
          </p>
        </div>
      </div>
    </div>
  )
}

export default App
