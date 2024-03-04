import { create } from 'zustand'
import { ModalType } from '@/types/modalType'


export const useLoginModal = create<ModalType>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false}), 
}))