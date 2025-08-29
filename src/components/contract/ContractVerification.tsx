import React, { useState } from 'react'
import { Card, Input, Button, LogArea } from '@/components/common'
import { useContract } from '@/hooks'
import { useLogStore } from '@/store'
import { validateAddress } from '@/utils'

export const ContractVerification: React.FC = () => {
  const { 
    address, 
    setAddress, 
    isLoading, 
    error, 
    handleVerifyContract 
  } = useContract()
  
  const { contractLogs } = useLogStore()
  const [inputError, setInputError] = useState<string>('')

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setAddress(value)
    
    if (value && !validateAddress(value)) {
      setInputError('请输入有效的以太坊地址')
    } else {
      setInputError('')
    }
  }

  const handleVerify = () => {
    if (!address) {
      setInputError('请输入合约地址')
      return
    }
    
    if (!validateAddress(address)) {
      setInputError('请输入有效的以太坊地址')
      return
    }
    
    setInputError('')
    handleVerifyContract()
  }

  return (
    <Card title="合约基本信息" icon="📋">
      <div className="space-y-4">
        <Input
          label="合约地址"
          placeholder="0x..."
          value={address}
          onChange={handleAddressChange}
          error={inputError || (error ?? undefined)}
        />
        
        <Button 
          onClick={handleVerify}
          loading={isLoading}
          disabled={!!inputError || !address}
        >
          验证合约
        </Button>
        
        <LogArea 
          logs={contractLogs}
          placeholder="合约验证日志将在这里显示..."
        />
      </div>
    </Card>
  )
}
