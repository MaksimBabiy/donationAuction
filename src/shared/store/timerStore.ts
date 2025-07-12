import { create } from 'zustand'
import { devtools,persist,createJSONStorage } from 'zustand/middleware'

type TimerStatus = 'idle' | 'running' | 'paused'

type TimerStore = {
  seconds: number | 0,
  setTimer: (seconds: number) => void,
  status: TimerStatus,
  setStatus: (status: TimerStatus) => void,
}

export const useTimerStore = create<TimerStore>()(devtools(persist((set) => ({
    seconds: 0,
    setTimer: (seconds: number) => set({ seconds }),
    status: 'idle',
    setStatus: (status: TimerStatus) => set({ status })
}), {
    name: 'timer-storage', 
    storage: createJSONStorage(() => localStorage), 
})))