import React from 'react'
import { Card, Button, LogArea } from '@/components/common'
import { useContract } from '@/hooks'
import { useLogStore } from '@/store'

export const EventQuery: React.FC = () => {
  const { 
    isVerified, 
    isLoading, 
    handleQueryEvents 
  } = useContract()
  
  const { eventLogs } = useLogStore()

  const handleQuery = () => {
    if (!isVerified) {
      alert('请先验证合约')
      return
    }
    handleQueryEvents()
  }

  return (
    <Card title="事件日志查询" icon="📊">
      <div className="space-y-4">
        <Button 
          onClick={handleQuery}
          disabled={!isVerified || isLoading}
          loading={isLoading}
        >
          查询事件
        </Button>
        
        <LogArea 
          logs={eventLogs}
          placeholder="事件查询日志将在这里显示..."
        />
      </div>
    </Card>
  )
}
