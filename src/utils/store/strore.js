import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useLocalStore = create(
  persist((set) => ({
    theme: "light",
    setTheme: () =>
      set((state) => ({ theme: state.theme == "light" ? "dark" : "light" })),
  }),{
    name : 'basic'
  })
);
