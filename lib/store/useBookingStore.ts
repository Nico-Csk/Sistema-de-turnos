import { create } from 'zustand'

export type BookingStep = 1 | 2 | 3 | 4

export interface BookingState {
  step: BookingStep
  serviceId: string | null
  stylistId: string | null // 'any' for Sin preferencia
  date: Date | null
  time: string | null
  clientDetails: {
    name: string
    phone: string
    email?: string
    notes?: string
  } | null
  
  // Actions
  setStep: (step: BookingStep) => void
  setServiceId: (id: string) => void
  setStylistId: (id: string) => void
  setDateTime: (date: Date, time: string) => void
  setClientDetails: (details: BookingState['clientDetails']) => void
  reset: () => void
}

const initialState = {
  step: 1 as BookingStep,
  serviceId: null,
  stylistId: null,
  date: null,
  time: null,
  clientDetails: null,
}

export const useBookingStore = create<BookingState>((set) => ({
  ...initialState,
  
  setStep: (step) => set({ step }),
  setServiceId: (serviceId) => set({ serviceId, step: 2 }),
  setStylistId: (stylistId) => set({ stylistId, step: 3 }),
  setDateTime: (date, time) => set({ date, time, step: 4 }),
  setClientDetails: (clientDetails) => set({ clientDetails }),
  reset: () => set(initialState),
}))
