import {create} from 'zustand';

interface MenuState {
  showMenu: number;
  setShowMenu: (value: number) => void;
}

const useSubMenuedStore = create<MenuState>(set => ({
  showMenu: 0,
  setShowMenu: value => set({showMenu: value}),
}));

export default useSubMenuedStore;
