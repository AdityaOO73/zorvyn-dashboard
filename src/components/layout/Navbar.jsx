import { useDispatch, useSelector } from "react-redux";
import {
  setRole,
  toggleSidebar,
  toggleTheme,
} from "../../redux/slices/uiSlice";
import { FiBell, FiSun, FiMoon, FiMenu } from "react-icons/fi";
import logo from "../../assets/logo.jpeg";
import profile from "../../assets/profile.png";
import { getColors } from "../../constants/colors";
import TEXTS from "../../local/english.json";

export default function Navbar() {
  const dispatch = useDispatch();
  const { role, isDark } = useSelector((s) => s.ui);
  const COLORS = getColors(isDark);
  const hour = new Date().getHours();
  let greeting = "Good Evening";
  if (hour < 12) greeting = "Good Morning";
  else if (hour < 17) greeting = "Good Afternoon";

  return (
    <div className="fixed top-0 left-0 lg:left-64 right-0 z-20 px-2 sm:px-4 lg:px-6 py-2">
      <div className="w-full mx-auto">
        <div
          className="flex items-center justify-between rounded-full px-3 sm:px-4 lg:px-6 py-2"
          style={{
            background: isDark
              ? "linear-gradient(90deg, #020617, #0b1220, #1e293b)"
              : "linear-gradient(90deg, #ffffff, #f4f8ff, #c7dbff)",
            border: `1px solid ${COLORS.border}`,
            boxShadow: isDark
              ? "0 6px 20px rgba(0,0,0,0.5)"
              : "0 6px 20px rgba(37, 99, 235, 0.08)",
            backdropFilter: "blur(8px)",
          }}
        >
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => dispatch(toggleSidebar())}
              className="lg:hidden text-lg sm:text-xl"
              style={{ color: COLORS.text }}
            >
              <FiMenu />
            </button>

            <div className="flex items-center gap-2 font-semibold">
              <img
                src={logo}
                alt="logo"
                className="w-6 h-6 sm:w-7 sm:h-7 rounded-md"
              />
              <span
                className="hidden sm:block text-sm sm:text-base"
                style={{ color: COLORS.text }}
              >
                {TEXTS.brandName}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <FiBell
              className="text-sm sm:text-base"
              style={{ color: COLORS.muted }}
            />

            <button
              onClick={() => dispatch(toggleTheme())}
              className="p-1.5 sm:p-2 rounded-lg border"
              style={{
                borderColor: COLORS.border,
                color: COLORS.text,
              }}
            >
              {isDark ? <FiSun size={16} /> : <FiMoon size={16} />}
            </button>

            <button
              onClick={() =>
                dispatch(setRole(role === "admin" ? "viewer" : "admin"))
              }
              className="px-2 sm:px-3 py-1 rounded-lg text-[10px] sm:text-xs font-medium border"
              style={{
                borderColor: COLORS.border,
                background:
                  role === "admin"
                    ? "linear-gradient(90deg, #2563eb, #3b82f6)"
                    : COLORS.surface,
                color: role === "admin" ? "#fff" : COLORS.text,
              }}
            >
              {role}
            </button>

            <div className="flex items-center gap-2 sm:gap-3 ml-1 sm:ml-2">
              <img
                src={profile}
                alt="profile"
                className="w-7 h-7 sm:w-9 sm:h-9 rounded-full border"
                style={{ borderColor: COLORS.border }}
              />

              <div className="hidden sm:flex flex-col leading-tight">
                <span className="text-[10px]" style={{ color: COLORS.muted }}>
                  {greeting}
                </span>

                <span
                  className="text-xs sm:text-sm font-semibold"
                  style={{ color: COLORS.text }}
                >
                  ADITYA
                </span>

                <span className="text-[12px]" style={{ color: COLORS.primary }}>
                  {role}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
