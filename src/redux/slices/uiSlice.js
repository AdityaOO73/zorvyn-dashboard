import { createSlice } from "@reduxjs/toolkit";

const getInitialTheme = () => {
  const saved = localStorage.getItem("theme");
  if (saved) return saved === "dark";

  return window.matchMedia("(prefers-color-scheme: dark)").matches;
};

const initialState = {
  role: "viewer",
  filter: "all",
  search: "",
  sort: "date",
  sidebarOpen: false,
  isDark: getInitialTheme(),
};

const slice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setRole: (s, a) => {
      s.role = a.payload;
    },
    setFilter: (s, a) => {
      s.filter = a.payload;
    },
    setSearch: (s, a) => {
      s.search = a.payload;
    },
    setSort: (s, a) => {
      s.sort = a.payload;
    },

    toggleSidebar: (s) => {
      s.sidebarOpen = !s.sidebarOpen;
    },

    toggleTheme: (s) => {
      s.isDark = !s.isDark;

      const theme = s.isDark ? "dark" : "light";
      localStorage.setItem("theme", theme);

      if (theme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    },
  },
});

export const {
  setRole,
  setFilter,
  setSearch,
  setSort,
  toggleSidebar,
  toggleTheme,
} = slice.actions;

export default slice.reducer;
