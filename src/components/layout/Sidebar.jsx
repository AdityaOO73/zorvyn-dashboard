import { NavLink } from "react-router-dom";
import logo from "../../assets/logo.jpeg";
import { useSelector, useDispatch } from "react-redux";
import { toggleSidebar } from "../../redux/slices/uiSlice";
import {
  FiHome,
  FiCreditCard,
  FiBarChart2,
  FiSettings,
  FiLogOut,
  FiX,
} from "react-icons/fi";
import { MdPayments, MdOutlineReceiptLong } from "react-icons/md";
import { getColors } from "../../constants/colors";
import TEXTS from "../../local/english.json";

export default function Sidebar() {
  const { sidebarOpen, isDark } = useSelector((s) => s.ui);
  const dispatch = useDispatch();

  const COLORS = getColors(isDark);

  const linkClass = ({ isActive }) => ({
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "10px 14px",
    borderRadius: "12px",
    transition: "0.25s ease",
    fontWeight: isActive ? "600" : "500",
    background: isActive
      ? "linear-gradient(90deg, rgba(37,99,235,0.12), rgba(37,99,235,0.05))"
      : "transparent",
    color: isActive ? COLORS.primary : COLORS.muted,
    fontSize: "14px",
  });

  const iconStyle = (isActive) => ({
    fontSize: "18px",
    color: isActive ? COLORS.primary : COLORS.muted,
    flexShrink: 0,
  });

  return (
    <>
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden"
          style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
          onClick={() => dispatch(toggleSidebar())}
        />
      )}

      <div
        className={`fixed top-0 left-0 h-screen w-64 flex flex-col justify-between z-50 transform transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        lg:translate-x-0`}
        style={{
          background: isDark
            ? "linear-gradient(180deg, #020617 0%, #0b1220 50%, #1e293b 100%)"
            : "linear-gradient(180deg, #ffffff 0%, #f4f8ff 50%, #c7dbff 100%)",
          borderRight: `1px solid ${COLORS.border}`,
          boxShadow: isDark
            ? "0 8px 30px rgba(0,0,0,0.6)"
            : "0 8px 30px rgba(37, 99, 235, 0.08)",
        }}
      >
        <div className="flex flex-col h-full overflow-y-auto px-3 py-4">
          <div>
            <div className="flex items-center justify-between mb-6 px-2">
              <h1
                className="text-lg sm:text-xl font-bold flex items-center gap-2"
                style={{ color: COLORS.text }}
              >
                <img
                  src={logo}
                  alt="logo"
                  className="w-8 h-8 sm:w-9 sm:h-9 object-contain rounded-3xl"
                />
                <span className="truncate">{TEXTS.brandName}</span>
              </h1>

              <button
                className="lg:hidden"
                onClick={() => dispatch(toggleSidebar())}
                style={{ color: COLORS.text }}
              >
                <FiX size={22} />
              </button>
            </div>

            <div className="flex flex-col gap-1">
              <NavLink to="/">
                {({ isActive }) => (
                  <div style={linkClass({ isActive })}>
                    <FiHome style={iconStyle(isActive)} />
                    <span className="truncate">{TEXTS.dashboard}</span>
                  </div>
                )}
              </NavLink>

              <NavLink to="/transactions">
                {({ isActive }) => (
                  <div style={linkClass({ isActive })}>
                    <MdPayments style={iconStyle(isActive)} />
                    <span className="truncate">{TEXTS.transactions}</span>
                  </div>
                )}
              </NavLink>

              <NavLink to="/insights">
                {({ isActive }) => (
                  <div style={linkClass({ isActive })}>
                    <FiBarChart2 style={iconStyle(isActive)} />
                    <span className="truncate">{TEXTS.insights}</span>
                    <span
                      className="ml-auto text-[10px] px-2 py-0.5 rounded-full whitespace-nowrap"
                      style={{
                        backgroundColor: COLORS.border,
                        color: COLORS.text,
                      }}
                    >
                      {TEXTS.pro}
                    </span>
                  </div>
                )}
              </NavLink>

              <NavLink to="/payments">
                {({ isActive }) => (
                  <div style={linkClass({ isActive })}>
                    <FiCreditCard style={iconStyle(isActive)} />
                    <span className="truncate">{TEXTS.payment}</span>
                  </div>
                )}
              </NavLink>

              <NavLink to="/cards">
                {({ isActive }) => (
                  <div style={linkClass({ isActive })}>
                    <MdOutlineReceiptLong style={iconStyle(isActive)} />
                    <span className="truncate">{TEXTS.card}</span>
                  </div>
                )}
              </NavLink>

              <NavLink to="/settings">
                {({ isActive }) => (
                  <div style={linkClass({ isActive })}>
                    <FiSettings style={iconStyle(isActive)} />
                    <span className="truncate">{TEXTS.settings}</span>
                  </div>
                )}
              </NavLink>
            </div>
          </div>

          <div className="mt-auto pt-4">
            <button
              className="flex items-center gap-3 px-4 py-2.5 rounded-xl w-full text-sm transition"
              style={{ color: COLORS.muted }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = COLORS.danger;
                e.currentTarget.style.color = "#fff";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = COLORS.muted;
              }}
            >
              <FiLogOut />
              {TEXTS.logout}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
