import { create } from 'zustand';

type NavState = {
  activeScreen: string;
  phaseSummary: string;
  setActiveScreen: (screen: string) => void;
  updatePhaseSummary: (summary: string) => void;
};

export const useNavigationStore = create<NavState>((set) => ({
  activeScreen: 'dashboard',
  phaseSummary: 'Phase: Baseline healthy cash flow',
  setActiveScreen: (activeScreen) => set({ activeScreen }),
  updatePhaseSummary: (phaseSummary) => set({ phaseSummary })
}));
