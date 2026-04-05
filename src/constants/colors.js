export const lightColors = {
  primary: "#2563eb",            
  bg: "#f4f8ff",                 
  card: "#ffffff",
  surface: "#eef4ff",           
  surface2: "#e0ecff",          

  text: "#0f172a",
  muted: "#64748b",
  border: "#dbeafe",             

  danger: "#ef4444",
  success: "#22c55e",
  warning: "#f59e0b",
  purple: "#8b5cf6",
};

export const darkColors = {
  primary: "#3b82f6",
  bg: "#0b1220",                
  card: "#111827",
  surface: "#0f172a",
  surface2: "#1e293b",

  text: "#f8fafc",
  muted: "#94a3b8",
  border: "#1f2a44",             

  danger: "#ef4444",
  success: "#22c55e",
  warning: "#f59e0b",
  purple: "#8b5cf6",
};

export const getColors = (isDark) => {
  return isDark ? darkColors : lightColors;
};