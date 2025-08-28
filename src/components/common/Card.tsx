import React from 'react'

interface CardProps {
  title?: string
  icon?: string
  children: React.ReactNode
  className?: string
}

export const Card: React.FC<CardProps> = ({ 
  title, 
  icon, 
  children, 
  className = '' 
}) => {
  return (
    <div className={`bg-white rounded-xl shadow-lg p-6 border border-gray-100 ${className}`}>
      {title && (
        <div className="flex items-center gap-3 mb-4 pb-3 border-b border-gray-100">
          {icon && <span className="text-xl">{icon}</span>}
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        </div>
      )}
      {children}
    </div>
  )
}
