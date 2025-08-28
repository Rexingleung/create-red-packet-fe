import React, { useEffect, useRef } from 'react'
import { LogEntry } from '@/types'
import { getStatusIcon } from '@/utils'

interface LogAreaProps {
  logs: LogEntry[]
  className?: string
  placeholder?: string
}

export const LogArea: React.FC<LogAreaProps> = ({ 
  logs, 
  className = '',
  placeholder = '日志将在这里显示...'
}) => {
  const logRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight
    }
  }, [logs])

  return (
    <div 
      ref={logRef}
      className={`
        mt-4 p-4 bg-gray-50 border border-gray-200 rounded-lg 
        min-h-[150px] max-h-96 overflow-y-auto
        font-mono text-sm whitespace-pre-wrap
        ${className}
      `}
    >
      {logs.length === 0 ? (
        <div className="text-gray-500 italic">{placeholder}</div>
      ) : (
        logs.map((log, index) => (
          <div key={index} className="mb-2">
            <span className={`
              inline-block px-2 py-1 rounded text-xs font-semibold mb-1
              ${log.type === 'success' ? 'bg-success-50 text-success-700 border border-success-200' : ''}
              ${log.type === 'error' ? 'bg-error-50 text-error-700 border border-error-200' : ''}
              ${log.type === 'warning' ? 'bg-warning-50 text-warning-700 border border-warning-200' : ''}
              ${log.type === 'info' ? 'bg-primary-50 text-primary-700 border border-primary-200' : ''}
            `}>
              {getStatusIcon(log.type)} {log.timestamp}
            </span>
            <div className="text-gray-800">{log.message}</div>
          </div>
        ))
      )}
    </div>
  )
}
