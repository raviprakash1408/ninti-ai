import {create} from 'zustand';

interface StoreState {
  isStarted: boolean;
  setIsStarted: (value: boolean) => void;
}

// Define the Zustand store
const useGetStartedStore = create<StoreState>(set => ({
  isStarted: false,
  setIsStarted: value => set({isStarted: value}),
}));

export default useGetStartedStore;
