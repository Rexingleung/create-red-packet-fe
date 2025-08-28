import { create } from 'zustand'
import { LogEntry } from '@/types'
import { createLogEntry } from '@/utils'

interface LogState {
  contractLogs: LogEntry[]
  functionLogs: LogEntry[]
  eventLogs: LogEntry[]
}

interface LogActions {
  addContractLog: (message: string, type?: LogEntry['type']) => void
  addFunctionLog: (message: string, type?: LogEntry['type']) => void
  addEventLog: (message: string, type?: LogEntry['type']) => void
  clearContractLogs: () => void
  clearFunctionLogs: () => void
  clearEventLogs: () => void
  clearAllLogs: () => void
}

type LogStore = LogState & LogActions

export const useLogStore = create<LogStore>((set) => ({
  // State
  contractLogs: [],
  functionLogs: [],
  eventLogs: [],

  // Actions
  addContractLog: (message: string, type: LogEntry['type'] = 'info') => {
    set((state) => ({
      contractLogs: [...state.contractLogs, createLogEntry(message, type)]
    }))
  },

  addFunctionLog: (message: string, type: LogEntry['type'] = 'info') => {
    set((state) => ({
      functionLogs: [...state.functionLogs, createLogEntry(message, type)]
    }))
  },

  addEventLog: (message: string, type: LogEntry['type'] = 'info') => {
    set((state) => ({
      eventLogs: [...state.eventLogs, createLogEntry(message, type)]
    }))
  },

  clearContractLogs: () => {
    set({ contractLogs: [] })
  },

  clearFunctionLogs: () => {
    set({ functionLogs: [] })
  },

  clearEventLogs: () => {
    set({ eventLogs: [] })
  },

  clearAllLogs: () => {
    set({
      contractLogs: [],
      functionLogs: [],
      eventLogs: []
    })
  }
}))
