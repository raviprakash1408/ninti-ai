import {create} from 'zustand';

interface MenuState {
  startTranscription: boolean;
  setStartTranscription: (value: boolean) => void;

  pauseTranscription: boolean;
  setPauseTranscription: (value: boolean) => void;

  stopTranscription: boolean;
  setStopTranscription: (value: boolean) => void;

  transcript: string;
  setTranscript: (value: string) => void;
}

const useTranscriptionStore = create<MenuState>(set => ({
  startTranscription: false,
  setStartTranscription: value => set({startTranscription: value}),
  pauseTranscription: false,
  setPauseTranscription: value => set({pauseTranscription: value}),
  stopTranscription: false,
  setStopTranscription: value => set({stopTranscription: value}),
  transcript: '',
  setTranscript: value =>
    set(state => ({
      transcript: state.transcript + value,
    })),
}));

export default useTranscriptionStore;
