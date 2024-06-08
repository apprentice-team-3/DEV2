import { create } from "zustand";

const useStore = create((set, get) => ({
  pdcaList: [],
  add: (newItem) =>
    set((state) => {
      const { doneName } = newItem;
      if (state.pdcaList.some((item) => item.doneName === doneName))
        return state;

      state.pdcaList = state.pdcaList.map((item) => ({
        ...item,
        isOpen: false,
      }));

      state.pdcaList = [
        ...state.pdcaList,
        {
          ...newItem,
          isOpen: true,
          plan: "",
          do: "",
          check: "",
          action: "",
          isTruncated: true,
          planBlock: [{}],
          doBlock: [{}],
          checkBlock: [{}],
          actionBlock: [{}],
        },
      ];

      return state;
    }),
  change: (newItem) =>
    set((state) => {
      const { doneName } = newItem;
      state.pdcaList = state.pdcaList.map((item) => ({
        ...item,
        isOpen: item.doneName === doneName,
      }));

      return state;
    }),
  write: (newItem) =>
    set((state) => {
      state.pdcaList = state.pdcaList.map((item) => {
        if (item.isOpen) {
          return { ...item, ...newItem, isOpen: true };
        }
        return { ...item, isOpen: false };
      });
      return state;
    }),
  updateBears: (newBears) => set({ bears: newBears }),
  show: () => get((state) => state.pdcaList),
}));

export default useStore;
