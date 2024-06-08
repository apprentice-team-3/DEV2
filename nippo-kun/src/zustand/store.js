import { create } from "zustand";

const useStore = create((set) => ({
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

      return {
        pdcaList: [
          ...state.pdcaList,
          {
            doneName,
            isOpen: true,
            plan: "",
            do: "",
            check: "",
            action: "",
            isTruncated: true,
          },
        ],
      };
    }),
  change: (newItem) =>
    set((state) => {
      const { doneName } = newItem;
      state.pdcaList = state.pdcaList.map((item) => ({
        ...item,
        isOpen: item.doneName === doneName,
      }));

      console.log(state.pdcaList);
      return state;
    }),
  updateBears: (newBears) => set({ bears: newBears }),
}));

export default useStore;
