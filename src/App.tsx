import React from 'react'
import { 
  NetworkStatus,
  ContractVerification, 
  FunctionTesting, 
  EventQuery 
} from '@/components'

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-blue-500 to-blue-600 p-5">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
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
          
          {/* Event Query */}
          <EventQuery />
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-blue-100">
          <p className="text-sm">
            基于 React + TypeScript + TailwindCSS + Zustand 构建
          </p>
        </div>
      </div>
    </div>
  )
}

export default App
