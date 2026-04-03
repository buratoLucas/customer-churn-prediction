import { create } from 'zustand';

type AtlasState = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

export const useAtlasStore = create<AtlasState>((set) => ({
  open: false,
  setOpen: (open) => set({ open })
}));
