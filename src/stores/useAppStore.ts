import { create } from 'zustand';

interface AppState {
  isCanvasReady: boolean;
  setIsCanvasReady: (ready: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
  isCanvasReady: false,
  setIsCanvasReady: (ready) => set({ isCanvasReady: ready }),
}));

